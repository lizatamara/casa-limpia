import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { appState, serviceTypes } from "@/utils/mockData";
import { Booking, Payment } from "@/types";
import { generateInvoicePDF } from "@/utils/pdfGenerator";

const PaymentSimulation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const bookingData = location.state;
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'transfer'>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>No hay datos de reserva</p>
            <Link to="/client/search">
              <Button className="mt-4">Buscar Trabajadores</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      workerId: bookingData.workerId,
      clientId: user?.id || '',
      serviceType: bookingData.serviceType,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      price: bookingData.price,
      status: 'pending',
      clientNotes: bookingData.notes,
      address: bookingData.address,
      comuna: bookingData.comuna,
      createdAt: new Date().toISOString()
    };

    appState.bookings.push(newBooking);

    // Create payment
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      bookingId: newBooking.id,
      amount: bookingData.price,
      date: new Date().toISOString(),
      status: 'completed',
      method: paymentMethod
    };

    appState.payments.push(newPayment);

    // Get worker data for PDF
    const worker = appState.users[bookingData.workerId];

    // Generate and download PDF
    if (user && worker) {
      generateInvoicePDF(newBooking, user, worker);
    }

    setIsProcessing(false);

    toast({
      title: "¡Pago exitoso!",
      description: "Tu reserva ha sido confirmada y el trabajador ha sido notificado",
    });

    setTimeout(() => {
      navigate('/client/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={`/client/booking/${bookingData.workerId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Pago del Servicio</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de la Reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trabajador:</span>
                <span className="font-medium">{bookingData.workerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servicio:</span>
                <span className="font-medium">{serviceTypes[bookingData.serviceType]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha:</span>
                <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horario:</span>
                <span className="font-medium">
                  {bookingData.timeSlot.startTime} - {bookingData.timeSlot.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dirección:</span>
                <span className="font-medium">{bookingData.address}, {bookingData.comuna}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-semibold text-lg">Total a Pagar:</span>
                <span className="font-bold text-2xl text-primary">
                  ${bookingData.price.toLocaleString('es-CL')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Información de Pago
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Esta es una simulación - usa cualquier dato
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Método de Pago</Label>
                  <Select value={paymentMethod} onValueChange={(val: any) => setPaymentMethod(val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="debit_card">Tarjeta de Débito</SelectItem>
                      <SelectItem value="transfer">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Vencimiento</Label>
                        <Input
                          id="cardExpiry"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardCVV">CVV</Label>
                        <Input
                          id="cardCVV"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Al confirmar el pago:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                    <li>Se procesará tu pago de forma simulada</li>
                    <li>Se notificará al trabajador de tu reserva</li>
                    <li>Podrás descargar tu boleta en formato HTML</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando Pago..." : `Pagar $${bookingData.price.toLocaleString('es-CL')}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulation;
