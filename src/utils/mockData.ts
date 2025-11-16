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

// Usuarios mock expandidos
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
  'client-2': {
    id: 'client-2',
    email: 'cliente2@example.com',
    role: 'client',
    name: 'Carlos López',
    phone: '+56 9 2222 3333',
    address: 'Av. Las Condes 456',
    comuna: 'Las Condes'
  },
  'client-3': {
    id: 'client-3',
    email: 'cliente3@example.com',
    role: 'client',
    name: 'Ana Rodríguez',
    phone: '+56 9 4444 5555',
    address: 'Av. Vitacura 789',
    comuna: 'Vitacura'
  },
  'client-4': {
    id: 'client-4',
    email: 'cliente4@example.com',
    role: 'client',
    name: 'Pedro Martínez',
    phone: '+56 9 6666 7777',
    address: 'Av. La Florida 321',
    comuna: 'La Florida'
  },
  'client-5': {
    id: 'client-5',
    email: 'cliente5@example.com',
    role: 'client',
    name: 'Laura Fernández',
    phone: '+56 9 8888 9999',
    address: 'Av. Ñuñoa 654',
    comuna: 'Ñuñoa'
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
  'worker-2': {
    id: 'worker-2',
    email: 'trabajador2@example.com',
    role: 'worker',
    name: 'Roberto Sánchez',
    phone: '+56 9 1010 2020',
    address: 'Av. Apoquindo 1234',
    comuna: 'Las Condes',
    businessName: 'Roberto Sánchez Limpiezas E.I.R.L.',
    commercialName: 'CleanMaster',
    taxAddress: 'Av. Apoquindo 1234',
    taxComuna: 'Las Condes',
    taxEmail: 'facturacion@cleanmaster.cl'
  },
  'worker-3': {
    id: 'worker-3',
    email: 'trabajador3@example.com',
    role: 'worker',
    name: 'Mónica Torres',
    phone: '+56 9 3030 4040',
    address: 'Av. Vitacura 5678',
    comuna: 'Vitacura',
    businessName: 'Mónica Torres Servicios SpA',
    commercialName: 'SparkleClean',
    taxAddress: 'Av. Vitacura 5678',
    taxComuna: 'Vitacura',
    taxEmail: 'facturacion@sparkleclean.cl'
  },
  'worker-4': {
    id: 'worker-4',
    email: 'trabajador4@example.com',
    role: 'worker',
    name: 'Diego Herrera',
    phone: '+56 9 5050 6060',
    address: 'Av. La Florida 987',
    comuna: 'La Florida',
    businessName: 'Diego Herrera Limpiezas',
    commercialName: 'FreshHome',
    taxAddress: 'Av. La Florida 987',
    taxComuna: 'La Florida',
    taxEmail: 'facturacion@freshhome.cl'
  },
  'worker-5': {
    id: 'worker-5',
    email: 'trabajador5@example.com',
    role: 'worker',
    name: 'Carolina Vargas',
    phone: '+56 9 7070 8080',
    address: 'Av. Macul 2345',
    comuna: 'Macul',
    businessName: 'Carolina Vargas Servicios E.I.R.L.',
    commercialName: 'PureClean',
    taxAddress: 'Av. Macul 2345',
    taxComuna: 'Macul',
    taxEmail: 'facturacion@pureclean.cl'
  },
  'admin-1': {
    id: 'admin-1',
    email: 'admin@casalimpia.cl',
    role: 'admin',
    name: 'Administrador CasaLimpia',
    phone: '+56 9 9999 9999',
    address: 'Oficina Central',
    comuna: 'Santiago'
  }
};

// Trabajadores mock expandidos
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
    bio: 'Especialista en limpieza profunda con 5 años de experiencia. Me enfoco en detalles y uso productos eco-amigables.',
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
    bio: 'Experto en limpieza de oficinas y hogares. Especializado en espacios grandes y limpieza post-obra.',
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
    bio: 'Limpieza residencial y comercial de alta calidad. Más de 7 años brindando servicios premium en Santiago.',
    experience: '7 años',
    rating: 5.0,
    reviewCount: 89,
    isAvailable: true,
    isPaused: false,
    isApproved: true
  },
  {
    id: 'worker-4',
    email: 'trabajador4@example.com',
    role: 'worker',
    name: 'Diego Herrera',
    phone: '+56 9 5050 6060',
    address: 'Av. La Florida 987',
    comuna: 'La Florida',
    businessName: 'Diego Herrera Limpiezas',
    commercialName: 'FreshHome',
    taxAddress: 'Av. La Florida 987',
    taxComuna: 'La Florida',
    taxEmail: 'facturacion@freshhome.cl',
    bio: 'Especialista en limpieza residencial con enfoque en familias. Horarios flexibles y precios accesibles.',
    experience: '2 años',
    rating: 4.6,
    reviewCount: 23,
    isAvailable: true,
    isPaused: false,
    isApproved: true
  },
  {
    id: 'worker-5',
    email: 'trabajador5@example.com',
    role: 'worker',
    name: 'Carolina Vargas',
    phone: '+56 9 7070 8080',
    address: 'Av. Macul 2345',
    comuna: 'Macul',
    businessName: 'Carolina Vargas Servicios E.I.R.L.',
    commercialName: 'PureClean',
    taxAddress: 'Av. Macul 2345',
    taxComuna: 'Macul',
    taxEmail: 'facturacion@pureclean.cl',
    bio: 'Enfoque en limpieza ecológica y productos naturales. Perfecta para hogares con mascotas y niños.',
    experience: '4 años',
    rating: 4.7,
    reviewCount: 34,
    isAvailable: false,
    isPaused: true,
    isApproved: true
  },
  {
    id: 'worker-6',
    email: 'trabajador6@example.com',
    role: 'worker',
    name: 'Miguel Ángel Ríos',
    phone: '+56 9 9090 1010',
    address: 'Av. Independencia 123',
    comuna: 'Independencia',
    businessName: 'Servicios Integrales Ríos',
    commercialName: 'CleanTotal',
    taxAddress: 'Av. Independencia 123',
    taxComuna: 'Independencia',
    taxEmail: 'contacto@cleantotal.cl',
    bio: 'Servicios completos de limpieza para hogares y pequeñas empresas. Atención personalizada y garantizada.',
    experience: '6 años',
    rating: 4.5,
    reviewCount: 56,
    isAvailable: true,
    isPaused: false,
    isApproved: false
  }
];

// Tarifas mock simplificadas
export const mockRates: Record<string, ServiceRate[]> = {
  'worker-1': [
    { serviceType: 'normal', price: 15000, duration: 3, description: 'Limpieza general del hogar' },
    { serviceType: 'deep_cleaning', price: 25000, duration: 5, description: 'Limpieza profunda completa' },
    { serviceType: 'bathroom_kitchen', price: 12000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 18000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 20000, duration: 3, description: 'Servicio urgente (24h)' }
  ],
  'worker-2': [
    { serviceType: 'normal', price: 14000, duration: 3, description: 'Limpieza general' },
    { serviceType: 'deep_cleaning', price: 23000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 11000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 17000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 19000, duration: 3, description: 'Servicio urgente' }
  ],
  'worker-3': [
    { serviceType: 'normal', price: 16000, duration: 3, description: 'Limpieza general' },
    { serviceType: 'deep_cleaning', price: 28000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 13000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 20000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 22000, duration: 3, description: 'Servicio urgente' }
  ],
  'worker-4': [
    { serviceType: 'normal', price: 12000, duration: 3, description: 'Limpieza general' },
    { serviceType: 'deep_cleaning', price: 20000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 9000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 15000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 18000, duration: 3, description: 'Servicio urgente' }
  ],
  'worker-5': [
    { serviceType: 'normal', price: 14500, duration: 3, description: 'Limpieza general' },
    { serviceType: 'deep_cleaning', price: 24000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 11500, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 17500, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 19500, duration: 3, description: 'Servicio urgente' }
  ],
  'worker-6': [
    { serviceType: 'normal', price: 13000, duration: 3, description: 'Limpieza general' },
    { serviceType: 'deep_cleaning', price: 22000, duration: 5, description: 'Limpieza profunda' },
    { serviceType: 'bathroom_kitchen', price: 10000, duration: 2, description: 'Baño y cocina' },
    { serviceType: 'windows_carpets', price: 16000, duration: 3, description: 'Vidrios y alfombras' },
    { serviceType: 'urgent', price: 18500, duration: 3, description: 'Servicio urgente' }
  ]
};

// Reservas mock expandidas
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    workerId: 'worker-1',
    clientId: 'client-1',
    serviceType: 'normal',
    date: '2024-01-10',
    timeSlot: { startTime: '09:00', endTime: '12:00', isAvailable: false },
    price: 15000,
    status: 'completed',
    clientNotes: 'Por favor traer productos de limpieza ecológicos',
    address: 'Av. Providencia 1234',
    comuna: 'Providencia',
    createdAt: '2024-01-05'
  },
  {
    id: 'booking-2',
    workerId: 'worker-2',
    clientId: 'client-2',
    serviceType: 'deep_cleaning',
    date: '2024-01-15',
    timeSlot: { startTime: '10:00', endTime: '15:00', isAvailable: false },
    price: 23000,
    status: 'completed',
    address: 'Av. Las Condes 456',
    comuna: 'Las Condes',
    createdAt: '2024-01-12'
  },
  {
    id: 'booking-3',
    workerId: 'worker-3',
    clientId: 'client-3',
    serviceType: 'urgent',
    date: '2024-02-05',
    timeSlot: { startTime: '14:00', endTime: '17:00', isAvailable: false },
    price: 22000,
    status: 'completed',
    clientNotes: 'Necesito limpieza urgente por visita inesperada',
    address: 'Av. Vitacura 789',
    comuna: 'Vitacura',
    createdAt: '2024-02-04'
  },
  {
    id: 'booking-4',
    workerId: 'worker-1',
    clientId: 'client-4',
    serviceType: 'bathroom_kitchen',
    date: '2024-02-20',
    timeSlot: { startTime: '11:00', endTime: '13:00', isAvailable: false },
    price: 12000,
    status: 'completed',
    address: 'Av. La Florida 321',
    comuna: 'La Florida',
    createdAt: '2024-02-18'
  },
  {
    id: 'booking-5',
    workerId: 'worker-4',
    clientId: 'client-5',
    serviceType: 'normal',
    date: '2024-03-08',
    timeSlot: { startTime: '08:00', endTime: '11:00', isAvailable: false },
    price: 12000,
    status: 'completed',
    address: 'Av. Ñuñoa 654',
    comuna: 'Ñuñoa',
    createdAt: '2024-03-05'
  },
  {
    id: 'booking-6',
    workerId: 'worker-2',
    clientId: 'client-1',
    serviceType: 'windows_carpets',
    date: '2024-03-15',
    timeSlot: { startTime: '13:00', endTime: '16:00', isAvailable: false },
    price: 17000,
    status: 'completed',
    address: 'Av. Providencia 1234',
    comuna: 'Providencia',
    createdAt: '2024-03-12'
  },
  {
    id: 'booking-7',
    workerId: 'worker-3',
    clientId: 'client-2',
    serviceType: 'deep_cleaning',
    date: '2024-04-02',
    timeSlot: { startTime: '09:00', endTime: '14:00', isAvailable: false },
    price: 28000,
    status: 'completed',
    address: 'Av. Las Condes 456',
    comuna: 'Las Condes',
    createdAt: '2024-03-30'
  },
  {
    id: 'booking-8',
    workerId: 'worker-5',
    clientId: 'client-3',
    serviceType: 'normal',
    date: '2024-04-10',
    timeSlot: { startTime: '10:00', endTime: '13:00', isAvailable: false },
    price: 14500,
    status: 'completed',
    address: 'Av. Vitacura 789',
    comuna: 'Vitacura',
    createdAt: '2024-04-08'
  },
  {
    id: 'booking-9',
    workerId: 'worker-1',
    clientId: 'client-4',
    serviceType: 'urgent',
    date: '2024-05-20',
    timeSlot: { startTime: '15:00', endTime: '18:00', isAvailable: false },
    price: 20000,
    status: 'accepted',
    address: 'Av. La Florida 321',
    comuna: 'La Florida',
    createdAt: '2024-05-18'
  },
  {
    id: 'booking-10',
    workerId: 'worker-2',
    clientId: 'client-5',
    serviceType: 'normal',
    date: '2024-05-25',
    timeSlot: { startTime: '11:00', endTime: '14:00', isAvailable: false },
    price: 14000,
    status: 'pending',
    address: 'Av. Ñuñoa 654',
    comuna: 'Ñuñoa',
    createdAt: '2024-05-22'
  },
  {
    id: 'booking-11',
    workerId: 'worker-4',
    clientId: 'client-1',
    serviceType: 'bathroom_kitchen',
    date: '2024-05-28',
    timeSlot: { startTime: '16:00', endTime: '18:00', isAvailable: false },
    price: 9000,
    status: 'pending',
    address: 'Av. Providencia 1234',
    comuna: 'Providencia',
    createdAt: '2024-05-25'
  },
  {
    id: 'booking-12',
    workerId: 'worker-3',
    clientId: 'client-2',
    serviceType: 'deep_cleaning',
    date: '2024-05-30',
    timeSlot: { startTime: '08:00', endTime: '13:00', isAvailable: false },
    price: 28000,
    status: 'accepted',
    address: 'Av. Las Condes 456',
    comuna: 'Las Condes',
    createdAt: '2024-05-27'
  },
  {
    id: 'booking-13',
    workerId: 'worker-5',
    clientId: 'client-3',
    serviceType: 'windows_carpets',
    date: '2024-04-15',
    timeSlot: { startTime: '14:00', endTime: '17:00', isAvailable: false },
    price: 17500,
    status: 'cancelled',
    address: 'Av. Vitacura 789',
    comuna: 'Vitacura',
    createdAt: '2024-04-10'
  },
  {
    id: 'booking-14',
    workerId: 'worker-6',
    clientId: 'client-4',
    serviceType: 'normal',
    date: '2024-05-05',
    timeSlot: { startTime: '09:00', endTime: '12:00', isAvailable: false },
    price: 13000,
    status: 'rejected',
    address: 'Av. La Florida 321',
    comuna: 'La Florida',
    createdAt: '2024-05-01'
  }
];

// Pagos mock expandidos
export const mockPayments: Payment[] = [
  {
    id: 'payment-1',
    bookingId: 'booking-1',
    amount: 15000,
    date: '2024-01-10',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'payment-2',
    bookingId: 'booking-2',
    amount: 23000,
    date: '2024-01-15',
    status: 'completed',
    method: 'debit_card'
  },
  {
    id: 'payment-3',
    bookingId: 'booking-3',
    amount: 22000,
    date: '2024-02-05',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'payment-4',
    bookingId: 'booking-4',
    amount: 12000,
    date: '2024-02-20',
    status: 'completed',
    method: 'transfer'
  },
  {
    id: 'payment-5',
    bookingId: 'booking-5',
    amount: 12000,
    date: '2024-03-08',
    status: 'completed',
    method: 'debit_card'
  },
  {
    id: 'payment-6',
    bookingId: 'booking-6',
    amount: 17000,
    date: '2024-03-15',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'payment-7',
    bookingId: 'booking-7',
    amount: 28000,
    date: '2024-04-02',
    status: 'completed',
    method: 'transfer'
  },
  {
    id: 'payment-8',
    bookingId: 'booking-8',
    amount: 14500,
    date: '2024-04-10',
    status: 'completed',
    method: 'debit_card'
  },
  {
    id: 'payment-9',
    bookingId: 'booking-9',
    amount: 20000,
    date: '2024-05-20',
    status: 'pending',
    method: 'credit_card'
  },
  {
    id: 'payment-10',
    bookingId: 'booking-12',
    amount: 28000,
    date: '2024-05-30',
    status: 'pending',
    method: 'transfer'
  },
  {
    id: 'payment-11',
    bookingId: 'booking-13',
    amount: 17500,
    date: '2024-04-15',
    status: 'refunded',
    method: 'credit_card'
  }
];

// Reseñas mock expandidas
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    workerId: 'worker-1',
    clientId: 'client-1',
    clientName: 'María González',
    bookingId: 'booking-1',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y puntual. Dejó mi casa impecable!',
    date: '2024-01-10'
  },
  {
    id: 'review-2',
    workerId: 'worker-1',
    clientId: 'client-4',
    clientName: 'Pedro Martínez',
    bookingId: 'booking-4',
    rating: 4,
    comment: 'Muy buen trabajo, quedó todo impecable. Solo llegó 10 minutos tarde.',
    date: '2024-02-20'
  },
  {
    id: 'review-3',
    workerId: 'worker-2',
    clientId: 'client-2',
    clientName: 'Carlos López',
    bookingId: 'booking-2',
    rating: 5,
    comment: 'Increíble trabajo de limpieza profunda. Superó mis expectativas completamente!',
    date: '2024-01-15'
  },
  {
    id: 'review-4',
    workerId: 'worker-2',
    clientId: 'client-1',
    clientName: 'María González',
    bookingId: 'booking-6',
    rating: 4,
    comment: 'Muy buen servicio de vidrios y alfombras. Los dejó como nuevos!',
    date: '2024-03-15'
  },
  {
    id: 'review-5',
    workerId: 'worker-3',
    clientId: 'client-3',
    clientName: 'Ana Rodríguez',
    bookingId: 'booking-3',
    rating: 5,
    comment: 'Servicio urgente excelente! Llegó en menos de 2 horas y solucionó todo.',
    date: '2024-02-05'
  },
  {
    id: 'review-6',
    workerId: 'worker-3',
    clientId: 'client-2',
    clientName: 'Carlos López',
    bookingId: 'booking-7',
    rating: 5,
    comment: 'La mejor limpieza profunda que he tenido. Patricia es increíblemente detallista!',
    date: '2024-04-02'
  },
  {
    id: 'review-7',
    workerId: 'worker-4',
    clientId: 'client-5',
    clientName: 'Laura Fernández',
    bookingId: 'booking-5',
    rating: 4,
    comment: 'Buen servicio por el precio. Diego es muy amable y trabajador.',
    date: '2024-03-08'
  },
  {
    id: 'review-8',
    workerId: 'worker-5',
    clientId: 'client-3',
    clientName: 'Ana Rodríguez',
    bookingId: 'booking-8',
    rating: 5,
    comment: 'Me encanta que usa productos ecológicos. Perfecto para mi familia con alergias.',
    date: '2024-04-10'
  },
  {
    id: 'review-9',
    workerId: 'worker-1',
    clientId: 'client-5',
    clientName: 'Laura Fernández',
    bookingId: 'booking-14',
    rating: 3,
    comment: 'Servicio regular. Esperaba más atención a los detalles por el precio.',
    date: '2024-03-22'
  },
  {
    id: 'review-10',
    workerId: 'worker-2',
    clientId: 'client-4',
    clientName: 'Pedro Martínez',
    bookingId: 'booking-15',
    rating: 5,
    comment: 'Carlos es un profesional excepcional. Lo recomiendo 100%!',
    date: '2024-04-18'
  }
];

// Estado global simulado expandido
export const appState = {
  users: { ...mockUsers },
  workers: [...mockWorkers],
  rates: { ...mockRates },
  bookings: [...mockBookings],
  reviews: [...mockReviews],
  payments: [...mockPayments]
};