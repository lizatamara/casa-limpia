import { User, WorkerProfile, ServiceRate, ServiceType, Review, Booking, Payment, RecurringBooking, Message, TermsAndConditions, FAQItem } from '@/types';

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
    comuna: 'Providencia',
    isSuspended: false,
    acceptedTerms: true,
    acceptedTermsDate: '2024-01-01'
  },
  'client-2': {
    id: 'client-2',
    email: 'cliente2@example.com',
    role: 'client',
    name: 'Carlos López',
    phone: '+56 9 2222 3333',
    address: 'Av. Las Condes 456',
    comuna: 'Las Condes',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-3': {
    id: 'client-3',
    email: 'cliente3@example.com',
    role: 'client',
    name: 'Ana Rodríguez',
    phone: '+56 9 4444 5555',
    address: 'Av. Vitacura 789',
    comuna: 'Vitacura',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-4': {
    id: 'client-4',
    email: 'cliente4@example.com',
    role: 'client',
    name: 'Pedro Martínez',
    phone: '+56 9 6666 7777',
    address: 'Av. La Florida 321',
    comuna: 'La Florida',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-5': {
    id: 'client-5',
    email: 'cliente5@example.com',
    role: 'client',
    name: 'Laura Fernández',
    phone: '+56 9 8888 9999',
    address: 'Av. Ñuñoa 654',
    comuna: 'Ñuñoa',
    isSuspended: false,
    acceptedTerms: true
  },
  // Nuevos clientes para las reservas
  'client-6': {
    id: 'client-6',
    email: 'jorge.martinez@email.com',
    role: 'client',
    name: 'Jorge Martínez',
    phone: '+56 9 3210 9876',
    address: 'Pedro de Valdivia 123',
    comuna: 'Providencia',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-7': {
    id: 'client-7',
    email: 'claudia.rojas@email.com',
    role: 'client',
    name: 'Claudia Rojas',
    phone: '+56 9 2109 8765',
    address: 'Av. Apoquindo 4500',
    comuna: 'Las Condes',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-8': {
    id: 'client-8',
    email: 'fernando.castro@email.com',
    role: 'client',
    name: 'Fernando Castro',
    phone: '+56 9 1098 7654',
    address: 'Los Leones 234',
    comuna: 'Providencia',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-9': {
    id: 'client-9',
    email: 'patricia.navarro@email.com',
    role: 'client',
    name: 'Patricia Navarro',
    phone: '+56 9 0987 6543',
    address: 'Av. Kennedy 9001',
    comuna: 'Las Condes',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-10': {
    id: 'client-10',
    email: 'roberto.diaz@email.com',
    role: 'client',
    name: 'Roberto Díaz',
    phone: '+56 9 5432 1098',
    address: 'Av. Vitacura 4456',
    comuna: 'Vitacura',
    isSuspended: false,
    acceptedTerms: true
  },
  'client-11': {
    id: 'client-11',
    email: 'elena.morales@email.com',
    role: 'client',
    name: 'Elena Morales',
    phone: '+56 9 4321 0987',
    address: 'Los Conquistadores 2100',
    comuna: 'Pudahuel',
    isSuspended: false,
    acceptedTerms: true
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
    taxEmail: 'facturacion@cleanpro.cl',
    isSuspended: false,
    acceptedTerms: true
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
    taxEmail: 'facturacion@cleanmaster.cl',
    isSuspended: false,
    acceptedTerms: true
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
    taxEmail: 'facturacion@sparkleclean.cl',
    isSuspended: false,
    acceptedTerms: true
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
    taxEmail: 'facturacion@freshhome.cl',
    isSuspended: false,
    acceptedTerms: true
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
    taxEmail: 'facturacion@pureclean.cl',
    isSuspended: false,
    acceptedTerms: true
  },
  'worker-6': {
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
    isSuspended: false,
    acceptedTerms: true
  },
  'admin-1': {
    id: 'admin-1',
    email: 'admin@casalimpia.cl',
    role: 'admin',
    name: 'Administrador CasaLimpia',
    phone: '+56 9 9999 9999',
    address: 'Oficina Central',
    comuna: 'Santiago',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: true,
    approvalDate: '2024-01-15',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: true,
    approvalDate: '2024-01-20',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: true,
    approvalDate: '2024-01-10',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: true,
    approvalDate: '2024-02-01',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: true,
    approvalDate: '2024-01-25',
    isSuspended: false,
    acceptedTerms: true
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
    isApproved: false,
    isSuspended: false,
    acceptedTerms: true
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

// Reservas mock expandidas con nuevos estados (NUESTRAS RESERVAS)
export const mockBookings: Booking[] = [
  // Reservas ACEPTADAS/CONFIRMADAS (que el trabajador puede cancelar)
  {
    id: 'booking-001',
    workerId: 'worker-1',
    clientId: 'client-1',
    serviceType: 'deep_cleaning',
    date: '2025-12-22',
    timeSlot: {
      startTime: '10:00',
      endTime: '13:00'
    },
    price: 45000,
    status: 'accepted',
    clientNotes: 'Por favor traer productos para pisos de madera',
    address: 'Av. Manuel Montt 1234',
    comuna: 'Providencia',
    createdAt: '2025-11-10T08:00:00Z',
    updatedAt: '2025-11-10T09:30:00Z'
  },
  {
    id: 'booking-002',
    workerId: 'worker-1',
    clientId: 'client-2',
    serviceType: 'normal',
    date: '2025-12-24',
    timeSlot: {
      startTime: '14:00',
      endTime: '17:00'
    },
    price: 35000,
    status: 'accepted',
    address: 'Los Plátanos 567',
    comuna: 'Las Condes',
    createdAt: '2025-11-12T10:00:00Z',
    updatedAt: '2025-11-12T11:15:00Z'
  },
  {
    id: 'booking-003',
    workerId: 'worker-1',
    clientId: 'client-3',
    serviceType: 'deep_cleaning',
    date: '2025-12-26',
    timeSlot: {
      startTime: '09:00',
      endTime: '15:00'
    },
    price: 75000,
    status: 'accepted',
    clientNotes: 'Departamento recién entregado, necesita limpieza profunda',
    address: 'El Golf 2500',
    comuna: 'Las Condes',
    createdAt: '2025-11-14T14:00:00Z',
    updatedAt: '2025-11-14T15:20:00Z'
  },

  // Reservas PENDIENTES (que el trabajador puede aceptar/rechazar)
  {
    id: 'booking-004',
    workerId: 'worker-1',
    clientId: 'client-10',
    serviceType: 'normal',
    date: '2025-12-28',
    timeSlot: {
      startTime: '11:00',
      endTime: '14:00'
    },
    price: 35000,
    status: 'pending',
    address: 'Av. Vitacura 4456',
    comuna: 'Vitacura',
    createdAt: '2025-11-15T16:00:00Z'
  },

  // Reservas EN PROGRESO
  {
    id: 'booking-005',
    workerId: 'worker-1',
    clientId: 'client-11',
    serviceType: 'deep_cleaning',
    date: '2025-12-01',
    timeSlot: {
      startTime: '08:00',
      endTime: '12:00'
    },
    price: 45000,
    status: 'in_progress',
    address: 'Los Conquistadores 2100',
    comuna: 'Pudahuel',
    createdAt: '2025-11-08T09:00:00Z',
    updatedAt: '2025-11-30T18:00:00Z'
  },

  // Reservas COMPLETADAS (historial)
  {
    id: 'booking-006',
    workerId: 'worker-1',
    clientId: 'client-6',
    serviceType: 'normal',
    date: '2025-11-05',
    timeSlot: {
      startTime: '15:00',
      endTime: '18:00'
    },
    price: 35000,
    status: 'completed',
    address: 'Pedro de Valdivia 123',
    comuna: 'Providencia',
    createdAt: '2025-10-25T12:00:00Z',
    updatedAt: '2025-11-05T18:30:00Z'
  },
  {
    id: 'booking-007',
    workerId: 'worker-1',
    clientId: 'client-7',
    serviceType: 'deep_cleaning',
    date: '2025-11-12',
    timeSlot: {
      startTime: '09:00',
      endTime: '13:00'
    },
    price: 45000,
    status: 'completed',
    clientNotes: 'Mascota en casa, pero está acostumbrado a limpiezas',
    address: 'Av. Apoquindo 4500',
    comuna: 'Las Condes',
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-12T13:15:00Z'
  },

  // Reservas CANCELADAS (ejemplos de cancelaciones)
  {
    id: 'booking-008',
    workerId: 'worker-1',
    clientId: 'client-8',
    serviceType: 'normal',
    date: '2025-11-18',
    timeSlot: {
      startTime: '16:00',
      endTime: '19:00'
    },
    price: 35000,
    status: 'cancelled',
    address: 'Los Leones 234',
    comuna: 'Providencia',
    createdAt: '2025-11-03T11:00:00Z',
    updatedAt: '2025-11-10T14:00:00Z',
    cancelledBy: 'worker',
    cancellationReason: 'Problemas de salud'
  },
  {
    id: 'booking-009',
    workerId: 'worker-1',
    clientId: 'client-9',
    serviceType: 'deep_cleaning',
    date: '2025-11-25',
    timeSlot: {
      startTime: '08:00',
      endTime: '14:00'
    },
    price: 75000,
    status: 'cancelled',
    address: 'Av. Kennedy 9001',
    comuna: 'Las Condes',
    createdAt: '2025-11-05T15:00:00Z',
    updatedAt: '2025-11-20T10:00:00Z',
    cancelledBy: 'client',
    cancellationReason: 'Cambio de fecha de mudanza'
  }
];

// Pagos mock expandidos
export const mockPayments: Payment[] = [
  // Pagos para las nuevas reservas
  {
    id: 'payment-001',
    bookingId: 'booking-001',
    amount: 45000,
    date: '2025-11-10',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'payment-002',
    bookingId: 'booking-002',
    amount: 35000,
    date: '2025-11-12',
    status: 'completed',
    method: 'debit_card'
  },
  {
    id: 'payment-003',
    bookingId: 'booking-003',
    amount: 75000,
    date: '2025-11-14',
    status: 'completed',
    method: 'transfer'
  },
  {
    id: 'payment-004',
    bookingId: 'booking-004',
    amount: 35000,
    date: '2025-11-15',
    status: 'pending',
    method: 'credit_card'
  },
  {
    id: 'payment-005',
    bookingId: 'booking-005',
    amount: 45000,
    date: '2025-11-08',
    status: 'completed',
    method: 'debit_card'
  }
];

// Reseñas mock expandidas
export const mockReviews: Review[] = [
  // Reseñas para las nuevas reservas
  {
    id: 'review-001',
    workerId: 'worker-1',
    clientId: 'client-6',
    clientName: 'Jorge Martínez',
    bookingId: 'booking-006',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y detallista. Recomendado 100%!',
    date: '2025-11-05'
  },
  {
    id: 'review-002',
    workerId: 'worker-1',
    clientId: 'client-7',
    clientName: 'Claudia Rojas',
    bookingId: 'booking-007',
    rating: 4,
    comment: 'Muy buen trabajo, aunque llegó un poco tarde. La limpieza fue impecable.',
    date: '2025-11-12'
  }
];

// Nuevos datos para funcionalidades adicionales
export const mockRecurringBookings: RecurringBooking[] = [];

export const mockMessages: Message[] = [
  // Chat para booking-001 (Aceptada - puede chatear)
  {
    id: 'msg-1',
    bookingId: 'booking-001',
    senderId: 'client-1',
    senderName: 'María González',
    senderRole: 'client',
    message: 'Hola, quería confirmar si necesitas que compre algún producto de limpieza específico para los pisos de madera.',
    timestamp: '2025-11-18T10:30:00Z',
    read: true
  },
  {
    id: 'msg-2',
    bookingId: 'booking-001',
    senderId: 'worker-1',
    senderName: 'Ana Silva',
    senderRole: 'worker',
    message: 'Hola María! No te preocupes, yo llevo todos los productos necesarios. Tengo un limpiador especial para pisos de madera.',
    timestamp: '2025-11-18T10:35:00Z',
    read: true
  },
  {
    id: 'msg-3',
    bookingId: 'booking-001',
    senderId: 'client-1',
    senderName: 'María González',
    senderRole: 'client',
    message: 'Perfecto, gracias! ¿Necesitas que te espere en la portería o tienes llave?',
    timestamp: '2025-11-18T10:40:00Z',
    read: false
  },

  // Chat para booking-003 (Aceptada)
  {
    id: 'msg-4',
    bookingId: 'booking-003',
    senderId: 'client-3',
    senderName: 'Ana Rodríguez',
    senderRole: 'client',
    message: 'Hola! El departamento es de 3 dormitorios y está recién entregado, así que hay bastante polvo de construcción.',
    timestamp: '2025-11-18T09:15:00Z',
    read: true
  },
  {
    id: 'msg-5',
    bookingId: 'booking-003',
    senderId: 'worker-1',
    senderName: 'Ana Silva',
    senderRole: 'worker',
    message: 'Entendido, Ana. Para limpieza post-obra recomiendo llevar mascarilla y voy a necesitar acceso a agua. ¿Está conectada el agua ya?',
    timestamp: '2025-11-18T09:20:00Z',
    read: true
  },

  // Chat para booking-005 (En progreso)
  {
    id: 'msg-6',
    bookingId: 'booking-005',
    senderId: 'client-11',
    senderName: 'Elena Morales',
    senderRole: 'client',
    message: 'Buenos días! Solo recordarte que hoy tenemos la limpieza profunda. Estaré en casa hasta las 9:30, luego salgo pero puedes seguir trabajando.',
    timestamp: '2025-12-01T07:45:00Z',
    read: true
  },
  {
    id: 'msg-7',
    bookingId: 'booking-005',
    senderId: 'worker-1',
    senderName: 'Ana Silva',
    senderRole: 'worker',
    message: 'Buenos días Elena! Perfecto, llegaré puntual a las 8:00. ¿Puedes dejarme la llave con el portero si sales antes?',
    timestamp: '2025-12-01T07:50:00Z',
    read: true
  },
  {
    id: 'msg-8',
    bookingId: 'booking-005',
    senderId: 'client-11',
    senderName: 'Elena Morales',
    senderRole: 'client',
    message: 'Sí, claro! Ya avisé en portería que pasarás. Las llaves estarán en recepción.',
    timestamp: '2025-12-01T07:55:00Z',
    read: false
  },

  // Chat para booking-007 (Completada - ya calificada)
  {
    id: 'msg-9',
    bookingId: 'booking-007',
    senderId: 'client-7',
    senderName: 'Claudia Rojas',
    senderRole: 'client',
    message: 'Hola! Solo recordarte que mi gato es muy tranquilo pero si ves que te molesta, puedes encerrarlo en el dormitorio.',
    timestamp: '2025-11-12T08:30:00Z',
    read: true
  },
  {
    id: 'msg-10',
    bookingId: 'booking-007',
    senderId: 'worker-1',
    senderName: 'Ana Silva',
    senderRole: 'worker',
    message: 'Hola Claudia! No te preocupes, estoy acostumbrada a trabajar con mascotas. Mientras no se asuste con la aspiradora, todo bien 😊',
    timestamp: '2025-11-12T08:35:00Z',
    read: true
  },
  {
    id: 'msg-11',
    bookingId: 'booking-007',
    senderId: 'client-7',
    senderName: 'Claudia Rojas',
    senderRole: 'client',
    message: 'Genial! Él es muy curioso pero no molesta. Nos vemos a las 9:00 entonces.',
    timestamp: '2025-11-12T08:40:00Z',
    read: true
  },

  // Chat para booking-004 (Pendiente)
  {
    id: 'msg-12',
    bookingId: 'booking-004',
    senderId: 'client-10',
    senderName: 'Roberto Díaz',
    senderRole: 'client',
    message: 'Buenas! Tengo una reunión importante ese día, ¿podrías asegurarme que terminarás exactamente a las 14:00?',
    timestamp: '2025-11-18T11:00:00Z',
    read: false
  }
];

export const mockTerms: TermsAndConditions = {
  id: 'terms-1',
  content: `# Términos y Condiciones de CasaLimpia

## 1. Aceptación de los Términos
Al utilizar CasaLimpia, aceptas estos términos y condiciones en su totalidad.

## 2. Servicios
CasaLimpia es una plataforma que conecta clientes con trabajadores de limpieza profesionales.

## 3. Responsabilidades del Cliente
- Proporcionar información precisa
- Respetar los horarios acordados
- Mantener un ambiente seguro para el trabajador

## 4. Responsabilidades del Trabajador
- Brindar servicios de calidad
- Cumplir con los horarios acordados
- Respetar la privacidad del cliente

## 5. Pagos y Cancelaciones
- Los pagos se procesan a través de la plataforma
- Las cancelaciones deben realizarse con 24 horas de anticipación

## 6. Privacidad
Respetamos tu privacidad y protegemos tus datos personales según la ley chilena.`,
  version: '1.0',
  updatedAt: new Date().toISOString(),
  updatedBy: 'admin-1',
};

export const clientFAQs: FAQItem[] = [
  {
    id: 'faq-c-1',
    question: '¿Cómo reservo un servicio de limpieza?',
    answer: 'Puedes buscar trabajadores disponibles en tu comuna, seleccionar el que prefieras y hacer clic en "Reservar". Luego completa los detalles del servicio y procede al pago.',
    category: 'Reservas',
    userType: 'client',
  },
  {
    id: 'faq-c-2',
    question: '¿Puedo cancelar una reserva?',
    answer: 'Sí, puedes cancelar una reserva desde tu panel de "Mis Reservas". Te recomendamos hacerlo con al menos 24 horas de anticipación.',
    category: 'Reservas',
    userType: 'client',
  },
  {
    id: 'faq-c-3',
    question: '¿Cómo funcionan las reservas recurrentes?',
    answer: 'Al hacer una reserva, puedes seleccionar la opción "Limpieza Semanal". El sistema generará automáticamente una reserva cada semana en el mismo día y horario.',
    category: 'Reservas',
    userType: 'client',
  },
  {
    id: 'faq-c-4',
    question: '¿Cómo puedo calificar a un trabajador?',
    answer: 'Una vez que el servicio esté completado, verás la opción "Calificar" en tu reserva. Puedes dejar una calificación de 1 a 5 estrellas y un comentario opcional.',
    category: 'Calificaciones',
    userType: 'client',
  },
  {
    id: 'faq-c-5',
    question: '¿Cómo me comunico con el trabajador?',
    answer: 'Una vez que tu reserva sea aceptada, podrás acceder al chat desde los detalles de la reserva para coordinar cualquier detalle específico.',
    category: 'Comunicación',
    userType: 'client',
  },
  {
    id: 'faq-c-6',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito, débito y transferencias bancarias. El pago se procesa de forma segura a través de nuestra plataforma.',
    category: 'Pagos',
    userType: 'client',
  },
];

export const workerFAQs: FAQItem[] = [
  {
    id: 'faq-w-1',
    question: '¿Cómo establezco mis tarifas?',
    answer: 'En la sección "Mis Tarifas" de tu panel, puedes configurar el precio y duración para cada tipo de servicio que ofreces.',
    category: 'Tarifas',
    userType: 'worker',
  },
  {
    id: 'faq-w-2',
    question: '¿Cómo gestiono mi disponibilidad?',
    answer: 'Ve a "Mi Disponibilidad" y marca en el calendario los días en que estás disponible. También puedes pausar tu disponibilidad temporalmente.',
    category: 'Disponibilidad',
    userType: 'worker',
  },
  {
    id: 'faq-w-3',
    question: '¿Qué hago si no puedo cumplir con una reserva aceptada?',
    answer: 'Comunícate inmediatamente con el cliente a través del chat y luego cancela la reserva desde tu panel. Intenta evitar cancelaciones para mantener tu reputación.',
    category: 'Reservas',
    userType: 'worker',
  },
  {
    id: 'faq-w-4',
    question: '¿Cuándo recibo mis pagos?',
    answer: 'Los pagos se procesan después de que el servicio sea marcado como completado. Puedes ver el historial de pagos en "Mis Pagos".',
    category: 'Pagos',
    userType: 'worker',
  },
  {
    id: 'faq-w-5',
    question: '¿Cómo mejoro mi calificación?',
    answer: 'Brinda un excelente servicio, sé puntual, mantén comunicación con tus clientes y respeta los detalles acordados. Las buenas reseñas mejorarán tu visibilidad.',
    category: 'Calificaciones',
    userType: 'worker',
  },
  {
    id: 'faq-w-6',
    question: '¿Puedo rechazar una reserva?',
    answer: 'Sí, puedes rechazar reservas desde tu panel de "Mis Reservas". Sin embargo, hacerlo frecuentemente puede afectar tu reputación en la plataforma.',
    category: 'Reservas',
    userType: 'worker',
  },
];




// Estado global simulado
export const appState: {
  users: Record<string, User>;
  workers: WorkerProfile[];
  rates: Record<string, ServiceRate[]>;
  bookings: Booking[];
  reviews: Review[];
  payments: Payment[];
  recurringBookings: RecurringBooking[];
  messages: Message[];
  terms: TermsAndConditions;
  clientFAQs: FAQItem[];
  workerFAQs: FAQItem[];
} = {
  users: { ...mockUsers },
  workers: [...mockWorkers],
  rates: { ...mockRates },
  bookings: [...mockBookings],
  reviews: [...mockReviews],
  payments: [...mockPayments],
  recurringBookings: [...mockRecurringBookings],
  messages: [...mockMessages],
  terms: mockTerms,
  clientFAQs,
  workerFAQs,
};