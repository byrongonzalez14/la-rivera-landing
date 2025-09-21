export interface AppConfig {
  tarifaBasePorNoche: number;
  adicionalPorPersonaPorNoche: number;
  aforoBase: number;
  aforoMaximo: number;
  minNoches: number;
  contacto: {
    whatsapp: string;
    telefono: string;
    email: string;
    direccion: string;
  };
  pagos: {
    nequi: string;
    llaveBreB: string;
    bancolombia: string;
  };
}

export const APP_CONFIG: AppConfig = {
  tarifaBasePorNoche: 1200000,
  adicionalPorPersonaPorNoche: 60000,
  aforoBase: 18,
  aforoMaximo: 20,
  minNoches: 1,
  contacto: {
    whatsapp: '+573206935023',
    telefono: '+57 320 693 5023',
    email: 'reservas@larivera.com',
    direccion: 'Rozo, Valle del Cauca, Colombia'
  },
  pagos: {
    nequi: '3206935023',
    llaveBreB: '3206935023',
    bancolombia: 'Ahorros 514-491650-64'
  }
};

export const ESPACIOS = [
  {
    slug: 'gimnasio',
    nombre: 'Gimnasio',
    descripcionCorta: 'Equipado para cardio y fuerza, entrena sin salir de casa.',
    descripcionLarga: 'Nuestro gimnasio completamente equipado te permite mantener tu rutina de ejercicios durante tu estadía. Cuenta con máquinas de cardio, pesas libres y equipos de fuerza para todos los niveles de entrenamiento.',
    imagen: 'images/espacios/gimnasio/gimnasio-hero.jpg',
    galeria: [
      '/images/espacios/gimnasio-1.jpg',
      '/images/espacios/gimnasio-2.jpg',
      '/images/espacios/gimnasio-3.jpg'
    ],
    amenidades: [
      'Máquinas de cardio (cinta, elíptica, bicicleta)',
      'Pesas libres y mancuernas',
      'Equipos de fuerza multifuncionales',
      'Espejos de pared completa',
      'Ventilación natural',
      'Área de estiramiento'
    ],
    reglas: [
      'Uso exclusivo para mayores de 15 años o menores acompañados',
      'Usar toalla personal y limpiar máquinas tras uso',
      'Calzado deportivo obligatorio',
      'No mover equipos pesados sin ayuda',
      'Reportar inmediatamente cualquier falla o incidente'
    ]
  },
  {
    slug: 'piscina',
    nombre: 'Piscina',
    descripcionCorta: 'Piscina rodeada de palmas, relájate con el sonido del agua.',
    descripcionLarga: 'Nuestra hermosa piscina está rodeada de exuberantes palmas que crean un ambiente tropical único. El área cuenta con zonas de descanso y una vista espectacular para disfrutar de momentos de relajación.',
    imagen: 'images/espacios/piscina/piscina-hero.jpg',
    galeria: [
      '/images/espacios/piscina-1.jpg',
      '/images/espacios/piscina-2.jpg',
      '/images/espacios/piscina-3.jpg'
    ],
    amenidades: [
      'Piscina de tamaño familiar',
      'Área de descanso con sombrillas',
      'Duchas exteriores',
      'Iluminación nocturna',
      'Vista panorámica',
      'Zona de barbacoa cercana'
    ],
    reglas: [
      'Horario sugerido: 8:00 a.m. a 10:00 p.m.',
      'Ducharse antes de entrar',
      'Uso obligatorio de traje de baño',
      'Niños siempre acompañados por un adulto',
      'Prohibido correr en el borde',
      'No vidrio en zona de piscina',
      'No ingresar en estado de embriaguez'
    ]
  },
  {
    slug: 'bosque-paz',
    nombre: 'Bosque Paz',
    descripcionCorta: 'Zona de contemplación y conexión con la naturaleza.',
    descripcionLarga: 'El Bosque Paz es nuestro santuario natural, diseñado para la meditación, contemplación y conexión profunda con la naturaleza. Senderos serpenteantes te llevan a través de vegetación nativa donde puedes encontrar tranquilidad y renovar energías.',
    imagen: '/images/espacios/bosque-hero.jpg',
    galeria: [
      '/images/espacios/bosque-1.jpg',
      '/images/espacios/bosque-2.jpg',
      '/images/espacios/bosque-3.jpg'
    ],
    amenidades: [
      'Senderos señalizados',
      'Áreas de meditación',
      'Bancos de descanso',
      'Flora y fauna nativa',
      'Zona de fogata habilitada',
      'Silencio natural'
    ],
    reglas: [
      'Mantener silencio relativo - zona de contemplación',
      'No hacer fogatas salvo en zona habilitada',
      'No dejar residuos de ningún tipo',
      'Respetar senderos señalizados',
      'No dañar flora ni fauna',
      'No ingresar con fuego no autorizado'
    ]
  },
  {
    slug: 'kiosco',
    nombre: 'Kiosco',
    descripcionCorta: 'Espacio cubierto ideal para reuniones y comidas.',
    descripcionLarga: 'El kiosco es el corazón social de La Rivera, un espacio cubierto perfecto para reuniones familiares, comidas grupales y celebraciones. Su diseño abierto permite disfrutar del clima mientras se mantiene protegido.',
    imagen: 'images/espacios/kiosco/kiosco-hero.jpg',
    galeria: [
      '/images/espacios/kiosco-1.jpg',
      '/images/espacios/kiosco-2.jpg',
      '/images/espacios/kiosco-3.jpg'
    ],
    amenidades: [
      'Área cubierta amplia',
      'Mesas y sillas para grupos',
      'Iluminación eléctrica',
      'Ventilación natural',
      'Acceso fácil desde todas las áreas',
      'Vista panorámica'
    ],
    reglas: [
      'No colgar objetos de peso de la estructura',
      'Apagar luces y equipos al retirarse',
      'Mantener orden y limpieza',
      'No exceder capacidad recomendada',
      'Cuidar mobiliario y estructura'
    ]
  },
  {
    slug: 'terraza',
    nombre: 'Terraza',
    descripcionCorta: 'Vista elevada perfecta para contemplar el paisaje.',
    descripcionLarga: 'La terraza ofrece una vista elevada espectacular del paisaje circundante. Es el lugar perfecto para disfrutar de amaneceres, atardeceres, y momentos especiales con una perspectiva única de la propiedad y sus alrededores.',
    imagen: 'images/espacios/terraza/terraza-hero.JPG',
    galeria: [
      '/images/espacios/terraza-1.jpg',
      '/images/espacios/terraza-2.jpg',
      '/images/espacios/terraza-3.jpg'
    ],
    amenidades: [
      'Vista panorámica 360°',
      'Mobiliario de exterior',
      'Barandas de seguridad',
      'Iluminación ambiental',
      'Acceso por escaleras',
      'Espacio para fotografías'
    ],
    reglas: [
      'No recostarse en barandas',
      'Evitar sobrecupo en el área',
      'No arrastrar mobiliario pesado',
      'Supervisar niños en todo momento',
      'Cuidado con objetos que puedan caer'
    ]
  },
  {
    slug: 'habitaciones',
    nombre: 'Habitaciones',
    descripcionCorta: 'Espacios cómodos y acogedores para el descanso.',
    descripcionLarga: 'Nuestras habitaciones están diseñadas para brindar el máximo confort durante tu estadía. Cada una cuenta con amenidades esenciales y un ambiente acogedor que garantiza un descanso reparador.',
    imagen: 'images/espacios/habitaciones/habitaciones-hero.JPEG',
    galeria: [
      '/images/espacios/habitaciones-1.jpg',
      '/images/espacios/habitaciones-2.jpg',
      '/images/espacios/habitaciones-3.jpg'
    ],
    amenidades: [
      'Camas cómodas con ropa de calidad',
      'Armarios y espacios de almacenamiento',
      'Ventilación natural',
      'Iluminación adecuada',
      'Privacidad garantizada',
      'Limpieza incluida'
    ],
    reglas: [
      'No comer en la cama',
      'Evitar manchas permanentes',
      'Respeto a ropa de cama y toallas',
      'Silencio a partir de 11:00 p.m.',
      'Reportar daños inmediatamente',
      'Pérdidas o daños tienen cobro adicional'
    ]
  }
];

export const SITIOS_INTERES = [
  {
    nombre: 'Parque Acuático Las Cascadas',
    tipo: 'Parque',
    distancia: '15 min en carro',
    descripcion: 'Parque acuático familiar con toboganes y piscinas naturales',
    imagen: '/images/sitios/cascadas.jpg',
    enlace: 'https://maps.google.com/?q=Parque+Acuático+Las+Cascadas+Rozo'
  },
  {
    nombre: 'Restaurante El Mirador',
    tipo: 'Restaurante',
    distancia: '10 min en carro',
    descripcion: 'Comida típica vallecaucana con vista panorámica',
    imagen: '/images/sitios/mirador.jpg',
    enlace: 'https://maps.google.com/?q=Restaurante+El+Mirador+Rozo'
  },
  {
    nombre: 'Mercado Campesino',
    tipo: 'Domicilio',
    distancia: '8 min en carro',
    descripcion: 'Productos frescos locales y comida tradicional',
    imagen: '/images/sitios/mercado.jpg',
    enlace: 'https://maps.google.com/?q=Mercado+Campesino+Rozo'
  },
  {
    nombre: 'Sendero Ecológico La Ceiba',
    tipo: 'Tour',
    distancia: '20 min en carro',
    descripcion: 'Caminata ecológica con guía local y avistamiento de aves',
    imagen: '/images/sitios/ceiba.jpg',
    enlace: 'https://maps.google.com/?q=Sendero+Ecológico+La+Ceiba'
  },
  {
    nombre: 'Café de la Montaña',
    tipo: 'Restaurante',
    distancia: '12 min en carro',
    descripcion: 'Café de especialidad y postres artesanales',
    imagen: '/images/sitios/cafe.jpg',
    enlace: 'https://maps.google.com/?q=Café+de+la+Montaña+Rozo'
  },
  {
    nombre: 'Reserva Natural El Refugio',
    tipo: 'Parque',
    distancia: '25 min en carro',
    descripcion: 'Reserva natural para observación de fauna y flora',
    imagen: '/images/sitios/refugio.jpg',
    enlace: 'https://maps.google.com/?q=Reserva+Natural+El+Refugio'
  }
];
