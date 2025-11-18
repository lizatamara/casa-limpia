// components/BookingActions.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  PlayCircle, 
  CheckCircle2, 
  Ban,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Booking } from '@/types';
import { useBookingActions } from '@/hooks/useBookingActions';

interface BookingActionsProps {
  booking: Booking;
  onStatusChange?: () => void;
}

export const BookingActions: React.FC<BookingActionsProps> = ({ 
  booking, 
  onStatusChange 
}) => {
  const {
    isLoading,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    startBooking,
    completeBooking
  } = useBookingActions();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const handleAccept = async () => {
    const success = await acceptBooking(booking.id);
    if (success && onStatusChange) onStatusChange();
  };

  const handleReject = async () => {
    const success = await rejectBooking(booking.id);
    if (success && onStatusChange) onStatusChange();
  };

  const handleCancel = async () => {
    const success = await cancelBooking(booking.id, cancelReason);
    if (success) {
      setShowCancelDialog(false);
      setCancelReason('');
      if (onStatusChange) onStatusChange();
    }
  };

  const handleStart = async () => {
    const success = await startBooking(booking.id);
    if (success && onStatusChange) onStatusChange();
  };

  const handleComplete = async () => {
    const success = await completeBooking(booking.id);
    if (success && onStatusChange) onStatusChange();
  };

  // Renderizar acciones según el estado
  const renderActions = () => {
    const isProcessing = isLoading === booking.id;

    switch (booking.status) {
      case 'pending':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAccept}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Aceptar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleReject}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Rechazar
            </Button>
          </div>
        );

      case 'accepted':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleStart}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlayCircle className="h-4 w-4 mr-1" />
              Iniciar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isProcessing}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowCancelDialog(true)}>
                  <Ban className="h-4 w-4 mr-2" />
                  Cancelar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );

      case 'in_progress':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleComplete}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Completar
            </Button>
          </div>
        );

      case 'completed':
      case 'cancelled':
      case 'rejected':
        return (
          <span className="text-sm text-muted-foreground capitalize">
            {booking.status === 'completed' && 'Completado'}
            {booking.status === 'cancelled' && 'Cancelado'}
            {booking.status === 'rejected' && 'Rechazado'}
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-end">
        {renderActions()}
      </div>

      {/* Diálogo de cancelación */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Cancelar Reserva</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ¿Estás seguro de que quieres cancelar esta reserva? Esta acción no se puede deshacer.
            </p>
            <div className="space-y-3">
              <label className="text-sm font-medium">Motivo de cancelación (opcional):</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Ej: Problemas de salud, conflicto de horarios..."
                className="w-full p-2 border rounded-md text-sm resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelDialog(false);
                  setCancelReason('');
                }}
              >
                Volver
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isLoading === booking.id}
              >
                {isLoading === booking.id ? 'Cancelando...' : 'Confirmar Cancelación'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};