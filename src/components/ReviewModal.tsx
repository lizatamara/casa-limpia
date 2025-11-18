import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  workerId: string;
  clientId: string;
  clientName: string;
}

export const ReviewModal = ({ isOpen, onClose, bookingId, workerId, clientId, clientName }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona una calificación',
        variant: 'destructive',
      });
      return;
    }

    const newReview = {
      id: `review-${Date.now()}`,
      workerId,
      clientId,
      clientName,
      bookingId,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    appState.reviews.push(newReview);
    
    // Marcar la reserva como revisada
    const booking = appState.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.hasReview = true;
    }

    // Actualizar calificación del trabajador
    const worker = appState.workers.find(w => w.id === workerId);
    if (worker) {
      const workerReviews = appState.reviews.filter(r => r.workerId === workerId);
      const avgRating = workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length;
      worker.rating = Math.round(avgRating * 10) / 10;
      worker.reviewCount = workerReviews.length;
    }

    toast({
      title: 'Reseña enviada',
      description: 'Gracias por tu calificación',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Califica el servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Comentario (opcional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos sobre tu experiencia..."
              rows={4}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              Enviar Reseña
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
