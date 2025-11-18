import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Play, 
  CheckCircle2,
  MoreHorizontal,
  Ban
} from "lucide-react";
import { toast } from "sonner";
import { appState, serviceTypes } from "@/utils/mockData";
import { Booking } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WorkerBookings = () => {
  const { user } = useAuth();
  
  const [bookings, setBookings] = useState(
    appState.bookings.filter(b => b.workerId === user?.id)
  );
  const [cancelDialog, setCancelDialog] = useState<{ 
    isOpen: boolean; 
    bookingId: string; 
    reason: string 
  }>({ 
    isOpen: false, 
    bookingId: '', 
    reason: '' 
  });

  const updateBookingStatus = (bookingId: string, status: Booking['status'], cancelledBy?: 'client' | 'worker', cancellationReason?: string) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { 
        ...b, 
        status,
        updatedAt: new Date().toISOString(),
        ...(cancelledBy && { cancelledBy, cancellationReason })
      } : b
    );
    setBookings(updatedBookings);
    
    // Actualizar también en el appState global
    appState.bookings = appState.bookings.map(b =>
      b.id === bookingId ? { 
        ...b, 
        status,
        updatedAt: new Date().toISOString(),
        ...(cancelledBy && { cancelledBy, cancellationReason })
      } : b
    );

    return true;
  };

  const handleAccept = async (bookingId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de API
      updateBookingStatus(bookingId, 'accepted');
      toast.success('Reserva aceptada correctamente');
    } catch (error) {
      toast.error('Error al aceptar la reserva');
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateBookingStatus(bookingId, 'rejected');
      toast.success('Reserva rechazada correctamente');
    } catch (error) {
      toast.error('Error al rechazar la reserva');
    }
  };

  const handleStart = async (bookingId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateBookingStatus(bookingId, 'in_progress');
      toast.success('Servicio marcado como en progreso');
    } catch (error) {
      toast.error('Error al iniciar el servicio');
    }
  };

  const handleComplete = async (bookingId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateBookingStatus(bookingId, 'completed');
      toast.success('Servicio marcado como completado');
    } catch (error) {
      toast.error('Error al completar el servicio');
    }
  };

  const handleCancel = async (bookingId: string, reason?: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateBookingStatus(bookingId, 'cancelled', 'worker', reason);
      setCancelDialog({ isOpen: false, bookingId: '', reason: '' });
      toast.success('Reserva cancelada correctamente');
    } catch (error) {
      toast.error('Error al cancelar la reserva');
    }
  };

  const openCancelDialog = (bookingId: string) => {
    setCancelDialog({ 
      isOpen: true, 
      bookingId, 
      reason: '' 
    });
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const client = appState.users[booking.clientId];
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (action: () => Promise<void>) => {
      setIsLoading(true);
      await action();
      setIsLoading(false);
    };

    const getStatusBadge = (status: Booking['status']) => {
      const variants = {
        pending: 'outline',
        accepted: 'default',
        in_progress: 'secondary',
        completed: 'secondary',
        cancelled: 'destructive',
        rejected: 'destructive'
      } as const;

      const labels = {
        pending: 'Pendiente',
        accepted: 'Aceptada',
        in_progress: 'En Progreso',
        completed: 'Completada',
        cancelled: 'Cancelada',
        rejected: 'Rechazada'
      };

      return (
        <Badge variant={variants[status]}>
          {labels[status]}
        </Badge>
      );
    };

    const renderActions = () => {
      if (isLoading) {
        return (
          <Button disabled size="sm">
            Procesando...
          </Button>
        );
      }

      switch (booking.status) {
        case 'pending':
          return (
            <div className="flex gap-2">
              <Button
                onClick={() => handleAction(() => handleAccept(booking.id))}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Check className="h-4 w-4 mr-1" />
                Aceptar
              </Button>
              <Button
                onClick={() => handleAction(() => handleReject(booking.id))}
                variant="destructive"
                className="flex-1"
                size="sm"
              >
                <X className="h-4 w-4 mr-1" />
                Rechazar
              </Button>
            </div>
          );

        case 'accepted':
          return (
            <div className="flex gap-2">
              <Button
                onClick={() => handleAction(() => handleStart(booking.id))}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Play className="h-4 w-4 mr-1" />
                Iniciar
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => openCancelDialog(booking.id)}>
                    <Ban className="h-4 w-4 mr-2" />
                    Cancelar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );

        case 'in_progress':
          return (
            <Button
              onClick={() => handleAction(() => handleComplete(booking.id))}
              className="w-full bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Marcar como Completada
            </Button>
          );

        case 'completed':
        case 'cancelled':
        case 'rejected':
          return (
            <div className="text-sm text-muted-foreground">
              {booking.cancelledBy === 'worker' && booking.cancellationReason && (
                <p className="text-xs italic">Motivo: {booking.cancellationReason}</p>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{client?.name || 'Cliente'}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {serviceTypes[booking.serviceType]} • {new Date(booking.date).toLocaleDateString('es-CL')}
              </p>
            </div>
            {getStatusBadge(booking.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Horario:</span>
              <p className="font-medium">{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Precio:</span>
              <p className="font-medium">${booking.price.toLocaleString('es-CL')}</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Dirección:</span>
              <p className="font-medium">{booking.address}, {booking.comuna}</p>
            </div>
          </div>

          {booking.clientNotes && (
            <div className="bg-muted p-3 rounded">
              <span className="text-muted-foreground text-sm">Notas del cliente:</span>
              <p className="text-sm mt-1">{booking.clientNotes}</p>
            </div>
          )}

          <div className="pt-2">
            {renderActions()}
          </div>
        </CardContent>
      </Card>
    );
  };

  const pending = bookings.filter(b => b.status === 'pending');
  const accepted = bookings.filter(b => b.status === 'accepted');
  const inProgress = bookings.filter(b => b.status === 'in_progress');
  const completed = bookings.filter(b => b.status === 'completed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="pending">Pendientes ({pending.length})</TabsTrigger>
            <TabsTrigger value="accepted">Aceptadas ({accepted.length})</TabsTrigger>
            <TabsTrigger value="in_progress">En Progreso ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({completed.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({cancelled.length})</TabsTrigger>
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

          <TabsContent value="in_progress" className="space-y-4">
            {inProgress.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes servicios en progreso
                </CardContent>
              </Card>
            ) : (
              inProgress.map(booking => <BookingCard key={booking.id} booking={booking} />)
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

          <TabsContent value="cancelled" className="space-y-4">
            {cancelled.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas canceladas
                </CardContent>
              </Card>
            ) : (
              cancelled.map(booking => <BookingCard key={booking.id} booking={booking} />)
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

      {/* Diálogo de cancelación */}
      {cancelDialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Cancelar Reserva</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer.
            </p>
            <div className="space-y-3">
              <label className="text-sm font-medium">Motivo de cancelación (opcional):</label>
              <textarea
                value={cancelDialog.reason}
                onChange={(e) => setCancelDialog(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Ej: Problemas de salud, conflicto de horarios..."
                className="w-full p-2 border rounded-md text-sm resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setCancelDialog({ isOpen: false, bookingId: '', reason: '' })}
              >
                Volver
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleCancel(cancelDialog.bookingId, cancelDialog.reason)}
              >
                Confirmar Cancelación
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerBookings;