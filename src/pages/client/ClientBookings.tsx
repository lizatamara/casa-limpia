import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";
import { appState, serviceTypes } from "@/utils/mockData";
import { Booking, Review } from "@/types";

// Componente del Modal de Calificación
const RatingModal = ({ 
  isOpen, 
  onClose, 
  onRate,
  workerName 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onRate: (rating: number, comment: string) => void;
  workerName: string;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Por favor selecciona una calificación");
      return;
    }
    onRate(rating, comment);
    setRating(0);
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Calificar a {workerName}</h3>
        
        {/* Estrellas */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-2xl focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comentario */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Comentario (opcional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="¿Cómo fue tu experiencia con el servicio?"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setRating(0);
              setComment("");
              onClose();
            }}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Enviar Calificación
          </Button>
        </div>
      </div>
    </div>
  );
};

const ClientBookings = () => {
  const { user } = useAuth();
  
  const [bookings, setBookings] = useState(
    appState.bookings.filter(b => b.clientId === user?.id)
  );
  const [ratingModal, setRatingModal] = useState<{
    isOpen: boolean;
    bookingId: string;
    workerName: string;
  }>({
    isOpen: false,
    bookingId: "",
    workerName: ""
  });

  const handleCancel = async (bookingId: string) => {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      appState.bookings[bookingIndex] = {
        ...appState.bookings[bookingIndex],
        status: 'cancelled' as const,
        cancelledBy: 'client' as const,
        updatedAt: new Date().toISOString()
      };
      
      setBookings(prev => 
        prev.map(b => 
          b.id === bookingId 
            ? { 
                ...b, 
                status: 'cancelled',
                cancelledBy: 'client',
                updatedAt: new Date().toISOString()
              } 
            : b
        )
      );
      
      toast.success('Reserva cancelada correctamente');
    }
  };

  // Abrir modal de calificación
  const openRatingModal = (bookingId: string, workerName: string) => {
    setRatingModal({
      isOpen: true,
      bookingId,
      workerName
    });
  };

  // Enviar calificación
  const handleRate = (bookingId: string, rating: number, comment: string) => {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      // Crear una nueva reseña
      const newReview: Review = {
        id: `review-${Date.now()}`,
        workerId: appState.bookings[bookingIndex].workerId,
        clientId: user?.id || '',
        clientName: user?.name || 'Cliente',
        bookingId: bookingId,
        rating: rating,
        comment: comment || "¡Excelente servicio!",
        date: new Date().toISOString().split('T')[0]
      };

      // Agregar la reseña a appState
      appState.reviews.push(newReview);

      // Marcar la reserva como calificada
      appState.bookings[bookingIndex] = {
        ...appState.bookings[bookingIndex],
        hasReview: true
      };

      // Actualizar estado local
      setBookings(prev => 
        prev.map(b => 
          b.id === bookingId 
            ? { ...b, hasReview: true } 
            : b
        )
      );

      // Actualizar rating del trabajador
      const worker = appState.workers.find(w => w.id === appState.bookings[bookingIndex].workerId);
      if (worker) {
        const workerReviews = appState.reviews.filter(r => r.workerId === worker.id);
        worker.rating = workerReviews.reduce((acc, review) => acc + review.rating, 0) / workerReviews.length;
        worker.reviewCount = workerReviews.length;
      }

      toast.success(`¡Calificación de ${rating} estrellas enviada! Gracias por tu feedback.`);
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const worker = appState.workers.find(w => w.id === booking.workerId);

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

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{worker?.name}</CardTitle>
              <CardDescription className="mt-2">
                {serviceTypes[booking.serviceType]} • {new Date(booking.date).toLocaleDateString('es-CL')}
              </CardDescription>
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
              <span className="text-muted-foreground text-sm">Tus notas:</span>
              <p className="text-sm mt-1">{booking.clientNotes}</p>
            </div>
          )}

          {/* ✅ BOTONES DE CHAT Y CALIFICACIÓN */}
          <div className="flex gap-2 pt-3">
            {/* Botón de Chat - disponible para reservas aceptadas, en progreso y completadas */}
            {(booking.status === 'accepted' || booking.status === 'in_progress' || booking.status === 'completed') && (
              <Link to={`/chat/${booking.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Button>
              </Link>
            )}
            
            {/* Botón de Calificar - disponible solo para reservas completadas y que no tengan reseña */}
            {booking.status === 'completed' && !booking.hasReview && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => openRatingModal(booking.id, worker?.name || 'Trabajador')}
              >
                <Star className="h-4 w-4" />
                Calificar
              </Button>
            )}
            
            {/* Mostrar mensaje si ya fue calificado */}
            {booking.status === 'completed' && booking.hasReview && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <Star className="h-4 w-4 fill-green-600" />
                Calificado
              </span>
            )}

            {/* Botón de Cancelar - solo para reservas pendientes y aceptadas */}
            {(booking.status === 'pending' || booking.status === 'accepted') && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleCancel(booking.id)}
              >
                Cancelar
              </Button>
            )}

            {/* Información de cancelación */}
            {booking.status === 'cancelled' && booking.cancelledBy === 'client' && (
              <span className="text-sm text-muted-foreground">
                Cancelada por ti
              </span>
            )}
            {booking.status === 'cancelled' && booking.cancelledBy === 'worker' && (
              <span className="text-sm text-muted-foreground">
                Cancelada por el trabajador
              </span>
            )}
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
      {/* Modal de Calificación */}
      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal(prev => ({ ...prev, isOpen: false }))}
        onRate={(rating, comment) => handleRate(ratingModal.bookingId, rating, comment)}
        workerName={ratingModal.workerName}
      />

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
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Todas ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pendientes ({pending.length})</TabsTrigger>
            <TabsTrigger value="accepted">Aceptadas ({accepted.length})</TabsTrigger>
            <TabsTrigger value="in_progress">En Progreso ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({completed.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({cancelled.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No tienes reservas
                </CardContent>
              </Card>
            ) : (
              bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

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
        </Tabs>
      </div>
    </div>
  );
};

export default ClientBookings;