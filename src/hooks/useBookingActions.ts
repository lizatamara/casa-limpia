// hooks/useBookingActions.ts
import { useState } from 'react';
import { toast } from 'sonner';
import { Booking, BookingStatus } from '@/types';
import { appState } from '@/utils/mockData';

export const useBookingActions = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const updateBookingStatus = (bookingId: string, status: BookingStatus, cancelledBy?: 'client' | 'worker', cancellationReason?: string) => {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      appState.bookings[bookingIndex].status = status;
      appState.bookings[bookingIndex].updatedAt = new Date().toISOString();
      
      if (cancelledBy) {
        appState.bookings[bookingIndex].cancelledBy = cancelledBy;
        appState.bookings[bookingIndex].cancellationReason = cancellationReason;
      }
      
      return true;
    }
    return false;
  };

  const acceptBooking = async (bookingId: string) => {
    setIsLoading(bookingId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de API
      
      const success = updateBookingStatus(bookingId, 'accepted');
      
      if (success) {
        toast.success('Reserva aceptada correctamente');
        return true;
      } else {
        toast.error('No se pudo encontrar la reserva');
        return false;
      }
    } catch (error) {
      toast.error('Error al aceptar la reserva');
      return false;
    } finally {
      setIsLoading(null);
    }
  };

  const rejectBooking = async (bookingId: string) => {
    setIsLoading(bookingId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = updateBookingStatus(bookingId, 'rejected');
      
      if (success) {
        toast.success('Reserva rechazada correctamente');
        return true;
      } else {
        toast.error('No se pudo encontrar la reserva');
        return false;
      }
    } catch (error) {
      toast.error('Error al rechazar la reserva');
      return false;
    } finally {
      setIsLoading(null);
    }
  };

  const cancelBooking = async (bookingId: string, reason?: string) => {
    setIsLoading(bookingId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = updateBookingStatus(bookingId, 'cancelled', 'worker', reason);
      
      if (success) {
        toast.success('Reserva cancelada correctamente');
        return true;
      } else {
        toast.error('No se pudo encontrar la reserva');
        return false;
      }
    } catch (error) {
      toast.error('Error al cancelar la reserva');
      return false;
    } finally {
      setIsLoading(null);
    }
  };

  const startBooking = async (bookingId: string) => {
    setIsLoading(bookingId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = updateBookingStatus(bookingId, 'in_progress');
      
      if (success) {
        toast.success('Servicio marcado como en progreso');
        return true;
      } else {
        toast.error('No se pudo encontrar la reserva');
        return false;
      }
    } catch (error) {
      toast.error('Error al iniciar el servicio');
      return false;
    } finally {
      setIsLoading(null);
    }
  };

  const completeBooking = async (bookingId: string) => {
    setIsLoading(bookingId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = updateBookingStatus(bookingId, 'completed');
      
      if (success) {
        toast.success('Servicio marcado como completado');
        return true;
      } else {
        toast.error('No se pudo encontrar la reserva');
        return false;
      }
    } catch (error) {
      toast.error('Error al completar el servicio');
      return false;
    } finally {
      setIsLoading(null);
    }
  };

  return {
    isLoading,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    startBooking,
    completeBooking
  };
};