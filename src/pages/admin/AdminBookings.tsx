import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, MapPin, Clock, User, Ban } from 'lucide-react';
import { appState, serviceTypes } from '@/utils/mockData';
import { toast } from 'sonner';
import { Booking } from '@/types';

export default function AdminBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(appState.bookings);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleCancelBooking = (bookingId: string) => {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      appState.bookings[bookingIndex].status = 'cancelled';
      setBookings([...appState.bookings]);
      toast.success('Reserva cancelada por administración');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: 'outline',
      accepted: 'default',
      completed: 'secondary',
      rejected: 'destructive',
      cancelled: 'destructive'
    };
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      accepted: 'Aceptada',
      completed: 'Completada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada'
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const activeBookings = bookings.filter(b => b.status === 'accepted' || b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled' || b.status === 'rejected');

  if (!user || user.role !== 'admin') return null;

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const worker = appState.workers.find(w => w.id === booking.workerId);
    const client = appState.users[booking.clientId];

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{serviceTypes[booking.serviceType]}</CardTitle>
              <CardDescription className="mt-1">
                Reserva #{booking.id.slice(-8)}
              </CardDescription>
            </div>
            {getStatusBadge(booking.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Trabajador</p>
              <p className="font-medium">{worker?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Cliente</p>
              <p className="font-medium">{client?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(booking.date).toLocaleDateString('es-CL')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{booking.address}, {booking.comuna}</span>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Precio del Servicio:</span>
              <span className="text-lg font-bold">${booking.price.toLocaleString('es-CL')}</span>
            </div>

            {(booking.status === 'accepted' || booking.status === 'pending') && (
              <Button
                onClick={() => handleCancelBooking(booking.id)}
                variant="destructive"
                className="w-full"
              >
                <Ban className="mr-2 h-4 w-4" />
                Cancelar Reserva
              </Button>
            )}
          </div>

          {booking.clientNotes && (
            <div className="pt-3 border-t text-sm">
              <p className="text-muted-foreground mb-1">Notas del cliente:</p>
              <p className="text-foreground">{booking.clientNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={() => navigate('/admin/dashboard')} variant="ghost" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
          <h1 className="text-2xl font-bold text-primary">Gestionar Reservas</h1>
          <p className="text-sm text-muted-foreground">Supervisa y administra todas las reservas</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Activas ({activeBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({completedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No hay reservas activas</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBookings.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No hay reservas completadas</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No hay reservas canceladas</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cancelledBookings.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
