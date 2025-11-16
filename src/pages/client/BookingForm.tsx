import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockWorkers, mockRates, serviceTypes, comunas } from "@/utils/mockData";
import { ServiceType } from "@/types";
import { DatePicker } from "@/components/ui/date-picker";

const BookingForm = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const worker = mockWorkers.find(w => w.id === workerId);
  const rates = mockRates[workerId || ''] || [];

  const [serviceType, setServiceType] = useState<ServiceType>(
    location.state?.serviceType || 'normal'
  );
  const [date, setDate] = useState(location.state?.date || '');
  const [startTime, setStartTime] = useState('09:00');
  const [address, setAddress] = useState(user?.address || '');
  const [comuna, setComuna] = useState(user?.comuna || '');
  const [notes, setNotes] = useState('');

  const selectedRate = rates.find(r => r.serviceType === serviceType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRate || !date) return;

    // Calculate end time
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + selectedRate.duration;
    const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Navigate to payment with booking data
    navigate('/client/payment', {
      state: {
        workerId,
        workerName: worker?.name,
        serviceType,
        date,
        timeSlot: { startTime, endTime, isAvailable: true },
        price: selectedRate.price,
        address,
        comuna,
        notes
      }
    });
  };

  if (!worker) {
    return <div>Trabajador no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={`/client/worker/${workerId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Nueva Reserva</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Reserva</CardTitle>
            <p className="text-sm text-muted-foreground">
              Trabajador: <span className="font-medium">{worker.name}</span>
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service">Tipo de Servicio *</Label>
                <Select value={serviceType} onValueChange={(val) => setServiceType(val as ServiceType)} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rates.map(rate => (
                      <SelectItem key={rate.serviceType} value={rate.serviceType}>
                        {serviceTypes[rate.serviceType]} - ${rate.price.toLocaleString('es-CL')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRate && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{selectedRate.description}</p>
                  <p className="text-sm font-medium mt-1">
                    Duración: {selectedRate.duration} hora{selectedRate.duration !== 1 && 's'}
                  </p>
                  <p className="text-lg font-bold text-primary mt-2">
                    ${selectedRate.price.toLocaleString('es-CL')}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date === "all" ? "" : date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                     className="[color-scheme:light] touch-manipulation cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora de Inicio *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección del Servicio *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Providencia 1234"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comuna">Comuna *</Label>
                <Select value={comuna} onValueChange={setComuna} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu comuna" />
                  </SelectTrigger>
                  <SelectContent>
                    {comunas.map((comuna) => (
                      <SelectItem key={comuna} value={comuna}>
                        {comuna}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Información importante sobre el servicio (ej: mascota en casa, código de acceso, etc.)"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!selectedRate || !date}>
                Continuar al Pago
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
