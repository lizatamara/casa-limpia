import { WorkerProfile, ServiceRate, Availability, Booking, Review, Payment, User } from '@/types';

// Comunas de Santiago
export const comunas = [
  'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa',
  'La Reina', 'Macul', 'Peñalolén', 'La Florida', 'Puente Alto', 'San Miguel',
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
  // Nuevos clientes para las reservas
  'client-6': {
    id: 'client-6',
    email: 'jorge.martinez@email.com',
    role: 'client',
    name: 'Jorge Martínez',
    phone: '+56 9 3210 9876',
    address: 'Pedro de Valdivia 123',
    comuna: 'Providencia'
  },
  'client-7': {
    id: 'client-7',
    email: 'claudia.rojas@email.com',
    role: 'client',
    name: 'Claudia Rojas',
    phone: '+56 9 2109 8765',
    address: 'Av. Apoquindo 4500',
    comuna: 'Las Condes'
  },
  'client-8': {
    id: 'client-8',
    email: 'fernando.castro@email.com',
    role: 'client',
    name: 'Fernando Castro',
    phone: '+56 9 1098 7654',
    address: 'Los Leones 234',
    comuna: 'Providencia'
  },
  'client-9': {
    id: 'client-9',
    email: 'patricia.navarro@email.com',
    role: 'client',
    name: 'Patricia Navarro',
    phone: '+56 9 0987 6543',
    address: 'Av. Kennedy 9001',
    comuna: 'Las Condes'
  },
  'client-10': {
    id: 'client-10',
    email: 'roberto.diaz@email.com',
    role: 'client',
    name: 'Roberto Díaz',
    phone: '+56 9 5432 1098',
    address: 'Av. Vitacura 4456',
    comuna: 'Vitacura'
  },
  'client-11': {
    id: 'client-11',
    email: 'elena.morales@email.com',
    role: 'client',
    name: 'Elena Morales',
    phone: '+56 9 4321 0987',
    address: 'Los Conquistadores 2100',
    comuna: 'Pudahuel'
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
    taxEmail: 'contacto@cleantotal.cl'
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
    isApproved: true,
    approvalDate: '2024-01-15'
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
    approvalDate: '2024-01-20'
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
    approvalDate: '2024-01-10'
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
    approvalDate: '2024-02-01'
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
    approvalDate: '2024-01-25'
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

// Reservas mock expandidas con nuevos estados
export const mockBookings: Booking[] = [
  // Reservas ACEPTADAS/CONFIRMADAS (que el trabajador puede cancelar)
  {
    id: 'booking-001',
    workerId: 'worker-1', // Diego Herrera
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
    workerId: 'worker-1', // Diego Herrera
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
    workerId: 'worker-1', // Diego Herrera
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
  },

  // Reservas existentes (mantener compatibilidad)
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
  },

  // Pagos existentes
  {
    id: 'payment-1',
    bookingId: 'booking-1',
    amount: 15000,
    date: '2024-01-10',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'payment-9',
    bookingId: 'booking-9',
    amount: 20000,
    date: '2024-05-20',
    status: 'pending',
    method: 'credit_card'
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
  },

  // Reseñas existentes
  {
    id: 'review-1',
    workerId: 'worker-1',
    clientId: 'client-1',
    clientName: 'María González',
    bookingId: 'booking-1',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y puntual. Dejó mi casa impecable!',
    date: '2024-01-10'
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