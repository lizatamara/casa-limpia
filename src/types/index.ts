export type UserRole = 'client' | 'worker' | 'admin';

export type ServiceType = 
  | 'normal'
  | 'deep_cleaning'
  | 'bathroom_kitchen'
  | 'windows_carpets'
  | 'urgent';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled' | 'in_progress';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone: string;
  address: string;
  comuna: string;
  // Datos tributarios (solo trabajadores)
  businessName?: string;
  commercialName?: string;
  taxAddress?: string;
  taxComuna?: string;
  taxEmail?: string;
}

export interface WorkerProfile extends User {
  role: 'worker';
  bio: string;
  experience: string;
  rating: number;
  reviewCount: number;
  profileImage?: string;
  isAvailable: boolean;
  isPaused: boolean;
  isApproved: boolean;
  approvalDate?: string;
}

export interface ServiceRate {
  serviceType: ServiceType;
  price: number;
  duration: number; // en horas
  description: string;
}

export interface Availability {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable?: boolean;
}

export interface Booking {
  id: string;
  workerId: string;
  clientId: string;
  serviceType: ServiceType;
  date: string;
  timeSlot: TimeSlot;
  price: number;
  status: BookingStatus;
  clientNotes?: string;
  address: string;
  comuna: string;
  createdAt: string;
  updatedAt?: string;
  cancelledBy?: 'client' | 'worker';
  cancellationReason?: string;
}

export interface Review {
  id: string;
  workerId: string;
  clientId: string;
  clientName: string;
  bookingId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'refunded';
  method: 'credit_card' | 'debit_card' | 'transfer';
}