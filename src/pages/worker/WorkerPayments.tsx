import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Calendar, Download, CreditCard } from "lucide-react";
import { appState, serviceTypes } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const WorkerPayments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const myBookings = appState.bookings.filter(b => b.workerId === user?.id);
  const myPayments = appState.payments.filter(p => 
    myBookings.some(b => b.id === p.bookingId)
  );

  const totalEarnings = myPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingEarnings = myPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  // ← NUEVO: Calcular saldo disponible para retiro
  const availableBalance = myPayments
    .filter(p => p.status === 'completed' && !p.withdrawn)
    .reduce((sum, p) => sum + p.amount, 0);

  // ← NUEVA FUNCIÓN: Manejar solicitud de retiro
  const handleWithdrawal = async () => {
    setIsLoading(true);
    
    try {
      // Simular proceso de retiro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una implementación real, aquí se conectaría con la API de pagos
      console.log('Solicitud de retiro procesada');
      
      // Mostrar mensaje de éxito
      toast({
        title: "✅ Solicitud de retiro enviada",
        description: "El dinero llegará a tu cuenta en 1-3 días hábiles",
        duration: 2000, // 4 segundos para que se lea bien
      });
      
    } catch (error) {
      console.error('Error en el retiro:', error);
      alert('Error al procesar la solicitud de retiro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/worker/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Mis Pagos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Summary Cards - ACTUALIZADO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> {/* ← CAMBIADO a 3 columnas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancias Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                ${totalEarnings.toLocaleString('es-CL')}
              </p>
              <p className="text-xs text-muted-foreground">
                Ingresos históricos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">
                ${pendingEarnings.toLocaleString('es-CL')}
              </p>
              <p className="text-xs text-muted-foreground">
                En proceso
              </p>
            </CardContent>
          </Card>

          {/* ← NUEVA CARD: Saldo Disponible */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Disponible</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                ${availableBalance.toLocaleString('es-CL')}
              </p>
              <p className="text-xs text-muted-foreground">
                Listo para retirar
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ← NUEVA SECCIÓN: Botón de Retiro */}
        {availableBalance > 0 && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">¿Quieres retirar tus ganancias?</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfiere tu saldo disponible a tu cuenta bancaria
                  </p>
                </div>
                <Button 
                  onClick={handleWithdrawal}
                  disabled={isLoading || availableBalance === 0}
                  className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                  size="lg"
                >
                  {isLoading ? (
                    <>Procesando...</>
                  ) : (
                    <>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Solicitar Retiro
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payments List - MEJORADO */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myPayments.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  Aún no tienes pagos
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tus pagos aparecerán aquí una vez que completes servicios
                </p>
              </div>
            ) : (
              myPayments.map(payment => {
                const booking = myBookings.find(b => b.id === payment.bookingId);
                const client = booking ? appState.users[booking.clientId] : null;

                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {booking ? serviceTypes[booking.serviceType] : 'Servicio'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {client?.name} • {new Date(payment.date).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={payment.status === 'completed' ? 'default' : 'outline'}>
                        {payment.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </Badge>
                      <p className="text-lg font-bold text-primary">
                        ${payment.amount.toLocaleString('es-CL')}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerPayments;