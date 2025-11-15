import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { appState, serviceTypes } from "@/utils/mockData";

const ClientBookings = () => {
  const { user } = useAuth();
  
  const myBookings = appState.bookings.filter(b => b.clientId === user?.id);
  const pending = myBookings.filter(b => b.status === 'pending');
  const accepted = myBookings.filter(b => b.status === 'accepted');
  const completed = myBookings.filter(b => b.status === 'completed');
  const rejected = myBookings.filter(b => b.status === 'rejected');

  const BookingCard = ({ booking }: { booking: typeof myBookings[0] }) => {
    const worker = appState.workers.find(w => w.id === booking.workerId);

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{serviceTypes[booking.serviceType]}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Trabajador: {worker?.name}
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

          {worker && (
            <Link to={`/client/worker/${worker.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                Ver Perfil del Trabajador
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
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

export default ClientBookings;
