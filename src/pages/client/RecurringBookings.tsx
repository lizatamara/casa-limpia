import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Trash2, Pause, Play } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const RecurringBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState(
    appState.recurringBookings.filter(b => b.clientId === user?.id)
  );

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const handleToggleActive = (bookingId: string) => {
    const booking = appState.recurringBookings.find(b => b.id === bookingId);
    if (booking) {
      booking.isActive = !booking.isActive;
      setBookings([...appState.recurringBookings.filter(b => b.clientId === user?.id)]);
      toast({
        title: booking.isActive ? 'Reserva reactivada' : 'Reserva pausada',
        description: booking.isActive 
          ? 'La limpieza semanal se reanudará' 
          : 'La limpieza semanal está en pausa',
      });
    }
  };

  const handleDelete = (bookingId: string) => {
    const index = appState.recurringBookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      appState.recurringBookings.splice(index, 1);
      setBookings([...appState.recurringBookings.filter(b => b.clientId === user?.id)]);
      toast({
        title: 'Reserva eliminada',
        description: 'La limpieza semanal ha sido cancelada',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/client/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Limpiezas Recurrentes</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No tienes limpiezas recurrentes programadas
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => {
              const worker = appState.users[booking.workerId];
              return (
                <Card key={booking.id} className={!booking.isActive ? 'opacity-60' : ''}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{worker?.name}</span>
                      {booking.isActive ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Activa
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          Pausada
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p><strong>Servicio:</strong> {booking.serviceType}</p>
                      <p><strong>Día:</strong> {dayNames[booking.dayOfWeek]}</p>
                      <p>
                        <strong>Horario:</strong> {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                      </p>
                      <p><strong>Precio:</strong> ${booking.price.toLocaleString('es-CL')}</p>
                      <p><strong>Dirección:</strong> {booking.address}, {booking.comuna}</p>
                      <p>
                        <strong>Desde:</strong> {new Date(booking.startDate).toLocaleDateString('es-CL')}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(booking.id)}
                        className="flex-1"
                      >
                        {booking.isActive ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Reactivar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(booking.id)}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringBookings;
