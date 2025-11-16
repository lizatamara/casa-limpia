import { WorkerProfile, ServiceRate, Availability, Booking, Review, Payment, User } from '@/types';

// Comunas de Santiago
export const comunas = [
  'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa',
  'La Reina', 'Macul', 'Peñalolén', 'La Florida', 'San Miguel',
  'Maipú', 'Pudahuel', 'Cerrillos', 'Estación Central', 'Independencia'
];

// Tipos de servicio
export const serviceTypes = {
  normal: 'Limpieza Normal',
  deep_cleaning: 'Limpieza Profunda',
  bathroom_kitchen: 'Baño y Cocina',
  windows_carpets: 'Vidrios y Alfombras',
  urgent: 'Limpieza Urgente'
};

// Usuarios mock
export const mockUsers: Record<string, User> = {
  'client-1': {
    id: 'client-1',
    email: 'cliente@example.com',
    role: 'client',
    name: 'María González',
    phone: '+56 9 1234 5678',
    address: 'Av. Providencia 1234',
    comuna: 'Providencia'
  },
  'worker-1': {
    id: 'worker-1',
    email: 'trabajador@example.com',
    role: 'worker',
    name: 'Juan Pérez',
    phone: '+56 9 8765 4321',
    address: 'Los Leones 567',
    comuna: 'Providencia',
    businessName: 'Servicios de Limpieza Juan Pérez E.I.R.L.',
    commercialName: 'CleanPro',
    taxAddress: 'Los Leones 567, Oficina 12',
    taxComuna: 'Providencia',
    taxEmail: 'facturacion@cleanpro.cl'
  },
  'admin-1': {
  id: 'admin-1',
  email: 'admin@casalimpia.com',
  role: 'admin',
  name: 'Administrador CasaLimpia',
  phone: '+56 9 9999 9999',
  address: 'Oficina Central',
  comuna: 'Santiago'
  }
};

// Trabajadores mock
export const mockWorkers: WorkerProfile[] = [
  {
    id: 'worker-1',
    email: 'trabajador1@example.com',
    role: 'worker',
    name: 'Ana Silva',
    phone: '+56 9 1111 2222',
    address: 'Los Leones 567',
    comuna: 'Providencia',
    businessName: 'Ana Silva Servicios SpA',
    commercialName: 'LimpiezaExpress',
    taxAddress: 'Los Leones 567',
    taxComuna: 'Providencia',
    taxEmail: 'factura@anasilva.cl',
    bio: 'Especialista en limpieza profunda con 5 años de experiencia',
    experience: '5 años',
    rating: 4.8,
    reviewCount: 45,
    isAvailable: true,
    isPaused: false,
    isApproved: true 
  },
  {
    id: 'worker-2',
    email: 'trabajador2@example.com',
    role: 'worker',
    name: 'Carlos Muñoz',
    phone: '+56 9 3333 4444',
    address: 'Apoquindo 3000',
    comuna: 'Las Condes',
    businessName: 'Carlos Muñoz E.I.R.L.',
    commercialName: 'CleanHome',
    taxAddress: 'Apoquindo 3000',
    taxComuna: 'Las Condes',
    taxEmail: 'admin@cleanhome.cl',
    bio: 'Experto en limpieza de oficinas y hogares',
    experience: '3 años',
    rating: 4.9,
    reviewCount: 67,
    isAvailable: true,
    isPaused: false,
    isApproved: true 
  },
  {
    id: 'worker-3',
    email: 'trabajador3@example.com',
    role: 'worker',
    name: 'Patricia Lagos',
    phone: '+56 9 5555 6666',
    address: 'Vitacura 8000',
    comuna: 'Vitacura',
    businessName: 'Servicios Patricia Lagos',
    commercialName: 'LimpioYa',
    taxAddress: 'Vitacura 8000',
    taxComuna: 'Vitacura',
    taxEmail: 'contacto@limpoya.cl',
    bio: 'Limpieza residencial y comercial de alta calidad',
    experience: '7 años',
    rating: 5.0,
    reviewCount: 89,
    isAvailable: true,
    isPaused: false,
    isApproved: true 
  }
];

// Tarifas mock
export const mockRates: Record<string, ServiceRate[]> = {
  'worker-1': [
    { serviceType: 'normal', price: 15000, duration: 3, description: 'Limpieza general del hogar' },
    { serviceType: 'deep_cleaning', price: 25000, duration: 5, description: 'Limpieza profunda completa' },
    { serviceType: 'bathroom_kitchen', price: 12000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 18000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 20000, duration: 3, description: 'Servicio urgente (24h)' }
  ],
  'worker-2': [
    { serviceType: 'normal', price: 14000, duration: 3, description: 'Limpieza estándar' },
    { serviceType: 'deep_cleaning', price: 23000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 11000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 17000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 19000, duration: 3, description: 'Servicio express' }
  ],
  'worker-3': [
    { serviceType: 'normal', price: 16000, duration: 3, description: 'Limpieza premium' },
    { serviceType: 'deep_cleaning', price: 28000, duration: 5, description: 'Limpieza profunda premium' },
    { serviceType: 'bathroom_kitchen', price: 13000, duration: 2, description: 'Baño y cocina detallada' },
    { serviceType: 'windows_carpets', price: 20000, duration: 3, description: 'Vidrios y alfombras premium' },
    { serviceType: 'urgent', price: 22000, duration: 3, description: 'Urgente 24/7' }
  ]
};

// Reseñas mock
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    workerId: 'worker-1',
    clientId: 'client-1',
    clientName: 'María González',
    bookingId: 'booking-1',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y puntual',
    date: '2024-01-15'
  },
  {
    id: 'review-2',
    workerId: 'worker-1',
    clientId: 'client-2',
    clientName: 'Pedro Rojas',
    bookingId: 'booking-2',
    rating: 4,
    comment: 'Muy buen trabajo, quedó todo impecable',
    date: '2024-01-20'
  }
];

// Estado global simulado (en una app real esto estaría en context/redux)
export const appState = {
  users: { ...mockUsers },
  workers: [...mockWorkers],
  rates: { ...mockRates },
  bookings: [] as Booking[],
  reviews: [...mockReviews],
  payments: [] as Payment[]
};
