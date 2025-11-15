import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { appState, mockUsers, serviceTypes } from "@/utils/mockData";
import { Booking } from "@/types";

const WorkerBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState(
    appState.bookings.filter(b => b.workerId === user?.id)
  );

  const handleAccept = (bookingId: string) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'accepted' as const } : b
    );
    setBookings(updatedBookings);
    appState.bookings = appState.bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'accepted' as const } : b
    );

    toast({
      title: "Reserva aceptada",
      description: "El cliente ha sido notificado",
    });
  };

  const handleReject = (bookingId: string) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'rejected' as const } : b
    );
    setBookings(updatedBookings);
    appState.bookings = appState.bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'rejected' as const } : b
    );

    toast({
      title: "Reserva rechazada",
      description: "El cliente ha sido notificado",
    });
  };

  const handleComplete = (bookingId: string) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'completed' as const } : b
    );
    setBookings(updatedBookings);
    appState.bookings = appState.bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'completed' as const } : b
    );

    toast({
      title: "Servicio completado",
      description: "La reserva ha sido marcada como completada",
    });
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const client = appState.users[booking.clientId];

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{serviceTypes[booking.serviceType]}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Cliente: {client?.name}
              </p>
            </div>
            <Badge variant={
              booking.status === 'pending' ? 'outline' :
              booking.status === 'accepted' ? 'default' :
              booking.status === 'completed' ? 'secondary' :
              'destructive'
            }>
              {booking.status === 'pending' && 'Pendiente'}
              {booking.status === 'accepted' && 'Aceptada'}
              {booking.status === 'rejected' && 'Rechazada'}
              {booking.status === 'completed' && 'Completada'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Fecha:</span>
              <p className="font-medium">{new Date(booking.date).toLocaleDateString('es-CL')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Horario:</span>
              <p className="font-medium">{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Dirección:</span>
              <p className="font-medium">{booking.address}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Comuna:</span>
              <p className="font-medium">{booking.comuna}</p>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground text-sm">Precio:</span>
            <p className="font-bold text-lg text-primary">${booking.price.toLocaleString('es-CL')}</p>
          </div>

          {booking.clientNotes && (
            <div className="bg-muted p-3 rounded">
              <span className="text-muted-foreground text-sm">Notas del cliente:</span>
              <p className="text-sm mt-1">{booking.clientNotes}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {booking.status === 'pending' && (
              <>
                <Button
                  onClick={() => handleAccept(booking.id)}
                  className="flex-1"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Aceptar
                </Button>
                <Button
                  onClick={() => handleReject(booking.id)}
                  variant="destructive"
                  className="flex-1"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rechazar
                </Button>
              </>
            )}
            {booking.status === 'accepted' && (
              <Button
                onClick={() => handleComplete(booking.id)}
                className="w-full"
                size="sm"
              >
                Marcar como Completada
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const pending = bookings.filter(b => b.status === 'pending');
  const accepted = bookings.filter(b => b.status === 'accepted');
  const completed = bookings.filter(b => b.status === 'completed');
  const rejected = bookings.filter(b => b.status === 'rejected');

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
          <h1 className="text-xl font-bold text-primary">Mis Reservas</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pendientes ({pending.length})</TabsTrigger>
            <TabsTrigger value="accepted">Aceptadas ({accepted.length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({completed.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rechazadas ({rejected.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pending.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas pendientes
                </CardContent>
              </Card>
            ) : (
              pending.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {accepted.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas aceptadas
                </CardContent>
              </Card>
            ) : (
              accepted.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completed.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas completadas
                </CardContent>
              </Card>
            ) : (
              completed.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejected.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas rechazadas
                </CardContent>
              </Card>
            ) : (
              rejected.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerBookings;
