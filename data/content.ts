import type {
  Contador,
  Curso,
  MiembroEquipo,
  NavLink,
  Servicio,
  ServicioGrupo,
  ServicioHomeItem,
  Testimonio,
  Trabajo,
} from "@/types"

/* ─── CONTACTO ─────────────────────────────────────────────────────────────── */

export const WHATSAPP_NUMBER = "5491127108165"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const INSTAGRAM_HANDLE = "@hold.agencia"
export const INSTAGRAM_URL = "https://instagram.com/hold.agencia"
export const EMAIL = "holdagenciadigital@gmail.com"
export const TEL_DISPLAY = "+54 9 11 2710 8165"
export const TEL_HREF = "tel:+5491127108165"

/* ─── OFICINA ──────────────────────────────────────────────────────────────
   Sede física en CABA — visible en footer y /contacto. */
export const OFICINA = {
  calle: "Olazabal 4889",
  barrio: "Villa Urquiza",
  ciudad: "Buenos Aires",
  pais: "Argentina",
  /** Google Maps query string para el link. */
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Olazabal+4889+Villa+Urquiza+Buenos+Aires",
} as const

/* Helper: arma URL de WhatsApp con mensaje pre-armado. */
export function waUrl(mensaje: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(mensaje)}`
}

/* Helper específico para click en curso de Academy. */
export function waUrlCurso(curso: Curso): string {
  return waUrl(`Hola, me interesa el curso "${curso.nombre}" de HOLD Academy.`)
}

/* ─── NAVEGACIÓN (rutas planas, igual al navbar del DS) ───────────────────── */

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Academy", href: "/academy" },
  { label: "Redes Sociales", href: "/redes-sociales" },
  { label: "Performance", href: "/performance" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Clientes", href: "/clientes" },
] as const

/* ─── SERVICIOS ────────────────────────────────────────────────────────────── */

export const servicios: readonly Servicio[] = [
  {
    slug: "academy",
    numero: "01",
    nombre: "Hold Academy",
    eyebrow: "Educación",
    tagline: "Todo lo que aprendimos haciendo, ahora lo enseñamos.",
    descripcion:
      "Cursos, entrenamientos y mentorías para creadores de contenido, emprendedores y profesionales que quieren dejar de improvisar.",
    items: [
      "Claude para creadores de contenido",
      "Meta para creadores de contenido",
      "Creatividad aplicada",
      "Contenido con colaboradores",
      "Entrenamientos para emprendedores",
      "Mentorías 1:1 360",
    ],
    acento: "#E96951",
    href: "/academy",
    precioDesde: "250",
    precioPeriodo: "curso",
    incluye: [
      "Clases en vivo + grabaciones",
      "Comunidad privada de Hold",
      "Sesión 1:1 final con tu mentor",
    ],
  },
  {
    slug: "redes-sociales",
    numero: "02",
    nombre: "Redes Sociales",
    eyebrow: "Marcas y negocios",
    tagline: "Sin improvisación.",
    descripcion:
      "Nos hacemos cargo de tu presencia digital con estrategia, contenido, diseño, producción y community management. Con un equipo dedicado a tu marca.",
    items: [
      "Estrategia y calendario mensual",
      "Diseño gráfico y producción audiovisual",
      "Community management",
      "Branding e identidad de marca",
      "Dirección creativa",
    ],
    acento: "#F08A3E",
    href: "/redes-sociales",
    precioDesde: "800",
    precioPeriodo: "mes",
    incluye: [
      "Estrategia y calendario mensual",
      "Diseño y producción audiovisual",
      "Community management diario",
    ],
  },
  {
    slug: "performance",
    numero: "03",
    nombre: "Performance",
    eyebrow: "Resultados medibles",
    tagline: "Resultados medibles.",
    descripcion:
      "Campañas pensadas desde la estrategia creativa, con analítica real y foco en resultados. Convertimos tu inversión en ventas.",
    items: [
      "Meta Ads, Google Ads, TikTok Ads",
      "Creatividades para pauta",
      "Implementación de CRM",
      "Automatizaciones de captación y seguimiento",
      "Reportes y optimización mensual",
    ],
    acento: "#F9423A",
    href: "/performance",
    precioDesde: "700",
    precioPeriodo: "mes",
    incluye: [
      "Meta + Google + TikTok Ads",
      "Creatividades + CRM",
      "Optimización constante con data",
    ],
  },
] as const

/* ─── CURSOS ACADEMY (del DS) ─────────────────────────────────────────────── */

export const cursos: readonly Curso[] = [
  {
    id: "ACA · 01",
    slug: "claude",
    nombre: "Claude para creadores de contenido",
    formato: "4 sesiones · Online",
    estado: "Inscripción abierta",
    precio: "USD 250",
    descripcion:
      "Cómo usar Claude como copiloto para crear contenido más rápido y con mejor criterio — sin perder tu voz.",
    duracion: "4 sesiones de 90 minutos",
    modalidad: "100% online en vivo",
    proximaFecha: "Próximo grupo: abril 2026",
    destinatario:
      "Creadores, estrategas y profesionales del contenido que quieren acelerar su proceso sin perder voz propia.",
    modulos: [
      "Fundamentos: cómo conversar con Claude para sacar mejores resultados",
      "Workflows: integrar IA al proceso creativo sin volverse dependiente",
      "Calidad y voz: revisar la salida del modelo y darle tu identidad",
      "Práctica guiada: producir piezas reales con feedback en vivo",
    ],
    incluye: [
      "4 clases en vivo + grabaciones de cada sesión",
      "Plantillas y prompts curados por el equipo",
      "Comunidad privada de alumnos en Discord",
      "Sesión 1:1 final con tu mentor para revisar tu caso",
    ],
  },
  {
    id: "ACA · 02",
    slug: "meta",
    nombre: "Meta para creadores de contenido",
    formato: "6 sesiones · Online",
    estado: "Inscripción abierta",
    precio: "USD 320",
    descripcion:
      "Del boost al campaña: usar Meta Ads sin desperdiciar presupuesto y midiendo lo que importa.",
    duracion: "6 sesiones de 90 minutos",
    modalidad: "100% online en vivo",
    proximaFecha: "Próximo grupo: mayo 2026",
    destinatario:
      "Creadores, emprendedores y community managers que ya vienen invirtiendo en pauta pero sienten que el resultado no acompaña.",
    modulos: [
      "Cuentas, píxel y eventos: el setup que casi nadie hace bien",
      "Audiencias y segmentación: dejar de pelearle al algoritmo",
      "Creatividades para pauta: por qué tu mejor post no es siempre tu mejor ad",
      "Lectura de métricas: qué mirar, cuándo y qué hacer con eso",
      "Optimización: cuándo escalar, cuándo bajar, cuándo cortar",
      "Casos en vivo: aplicar lo visto a tu cuenta real",
    ],
    incluye: [
      "6 clases en vivo + grabaciones de cada sesión",
      "Templates de campañas listos para usar",
      "Acceso al canal privado con preguntas durante todo el curso",
      "Auditoría 1:1 de tu cuenta al finalizar",
    ],
  },
  {
    id: "ACA · 03",
    slug: "creatividad-aplicada",
    nombre: "Creatividad aplicada",
    formato: "8 sesiones · Híbrido",
    estado: "Próximamente",
    precio: "USD 580",
    descripcion: "Pensar como creativo: del insight a la ejecución concreta.",
    duracion: "8 sesiones de 2 horas",
    modalidad: "Híbrido (4 online + 4 presenciales)",
    proximaFecha: "Próximo grupo: junio 2026",
    destinatario:
      "Profesionales de marketing, diseño, contenido y dirección que quieren empezar a pensar la creatividad como una disciplina, no como una corazonada.",
    modulos: [
      "Insight: cómo encontrar la verdad que la marca todavía no dijo",
      "Bocetar: del concepto al primer prototipo de la idea",
      "Visualizar: traducir la idea a piezas concretas",
      "Defender: presentar el trabajo con criterio",
      "Producir: del aprobado a la pieza final",
      "Medir: cómo saber si la idea funcionó",
      "Iterar: qué hacer cuando no funcionó",
      "Cierre: portfolio personal con lo trabajado",
    ],
    incluye: [
      "8 encuentros (4 online + 4 presenciales en Buenos Aires)",
      "Material de lectura curado entre sesiones",
      "Mentoría grupal cada 15 días",
      "Pieza final con feedback del equipo HOLD",
    ],
  },
  {
    id: "ACA · 04",
    slug: "colaboradores",
    nombre: "Contenido con colaboradores",
    formato: "Workshop · 1 día",
    estado: "Próximamente",
    precio: "USD 180",
    descripcion:
      "Cómo dirigir colaboradores y producir contenido sin volverte el cuello de botella.",
    duracion: "1 jornada de 6 horas",
    modalidad: "Presencial intensivo",
    proximaFecha: "Próximo grupo: julio 2026",
    destinatario:
      "Marcas y emprendedores que ya trabajan con freelancers, fotógrafos o creadores y necesitan ordenar el flujo para escalar producción.",
    modulos: [
      "Brief: cómo pedir bien para no rehacer todo",
      "Workflow: del Slack al Drive — armar el sistema",
      "Feedback: criticar el trabajo, no a la persona",
      "Producción a escala: pasar de 1 pieza por semana a 20",
    ],
    incluye: [
      "Workshop intensivo de 1 día con almuerzo",
      "Plantilla de brief + workflow para descargar",
      "Acceso al canal privado del workshop",
      "Sesión de seguimiento online al mes",
    ],
  },
  {
    id: "ACA · 05",
    slug: "emprendedores",
    nombre: "Entrenamientos para emprendedores",
    formato: "Programa · 3 meses",
    estado: "Inscripción abierta",
    precio: "USD 1.200",
    descripcion:
      "Programa intensivo para que tu negocio empiece a comunicar como una marca.",
    duracion: "12 semanas · 1 encuentro semanal",
    modalidad: "Online en vivo + mentorías 1:1",
    proximaFecha: "Próximo grupo: abril 2026",
    destinatario:
      "Founders y emprendedoras que están haciendo crecer un negocio y necesitan que su comunicación deje de improvisarse.",
    modulos: [
      "Identidad: definir voz, tono y promesa de la marca",
      "Pilares de contenido: dejar de publicar cualquier cosa",
      "Calendario y producción: ordenar el qué, cuándo y cómo",
      "Pauta: introducción a Meta Ads sin desperdicio",
      "Métricas: leer lo que importa para tu negocio",
      "Ventas: cómo el contenido empuja al embudo",
    ],
    incluye: [
      "12 encuentros grupales de 90 minutos",
      "3 mentorías 1:1 de 60 minutos a lo largo del programa",
      "Comunidad privada con otros emprendedores del grupo",
      "Plan de comunicación de tu marca al cierre del programa",
    ],
  },
  {
    id: "ACA · 06",
    slug: "mentorias",
    nombre: "Mentorías 1:1 360",
    formato: "Encuentros mensuales",
    estado: "Cupo limitado",
    precio: "USD 350 / mes",
    descripcion:
      "Encuentros mensuales 1:1 para acompañarte mes a mes con criterio externo.",
    duracion: "Encuentros mensuales de 90 minutos",
    modalidad: "Online en vivo · sin contrato mínimo",
    proximaFecha: "Cupos disponibles para abril 2026",
    destinatario:
      "Profesionales y founders que ya tienen su marca pero quieren un sparring partner externo para sostener el rumbo.",
    modulos: [
      "Sesión inicial: diagnóstico de dónde estás y dónde querés ir",
      "Mes 1+: revisión de avances + temas que surjan",
      "Recursos compartidos entre sesiones según lo trabajado",
      "Reporte trimestral: dónde mejoraste y qué viene",
    ],
    incluye: [
      "1 encuentro mensual de 90 minutos",
      "Disponibilidad async por mensaje entre sesiones",
      "Acceso a las herramientas y plantillas que use el equipo HOLD",
      "Sin permanencia mínima — podés salir cuando quieras",
    ],
  },
] as const

/* ─── TESTIMONIOS ──────────────────────────────────────────────────────────
   Lista real de clientes (nombre + marca opcional + rubro). Los textos
   son placeholder por ahora — se irán reemplazando con citas reales a
   medida que las chicas las vayan recolectando. */

export const testimonios: readonly Testimonio[] = [
  {
    texto: "Tenían claro lo que necesitábamos antes de que pudiéramos explicarlo. Eso ahorra tiempo y discusiones.",
    nombre: "Maxi López",
    rubro: "Talent",
    servicio: "redes-sociales",
  },
  {
    texto: "Confiamos en ellas para sostener nuestra marca y no se equivocaron. Acompañan, no improvisan.",
    nombre: "Grupo Legal",
    marca: "GRUPO LEGAL",
    rubro: "Estudio Jurídico",
    servicio: "redes-sociales",
  },
  {
    texto: "Mi voz en redes empezó a tener orden gracias al trabajo del equipo. Hoy comunico con criterio.",
    nombre: "Dra. Eugenia Falcón",
    rubro: "Marca Personal · Abogada laboral",
    servicio: "redes-sociales",
  },
  {
    texto: "Lo que más valoro es la lectura del negocio. No vienen con fórmulas armadas, leen tu caso primero.",
    nombre: "Dr. Alejandro Cyrulnik",
    rubro: "Marca Personal · Abogado corporativo",
    servicio: "redes-sociales",
  },
  {
    texto: "Resultados reales en pocos meses. Pasamos de improvisar contenido a tener una estrategia clara.",
    nombre: "Dr. Gustavo Falcón",
    marca: "GRUPO LEGAL",
    rubro: "Marca Personal · Abogado laboral",
    servicio: "performance",
  },
  {
    texto: "Comunican con criterio y con foco en el negocio. No publican por publicar, todo tiene un porqué.",
    nombre: "Dr. Ignacio Bascuas",
    rubro: "Marca Personal · Abogado civil",
    servicio: "redes-sociales",
  },
  {
    texto: "Lo difícil era encontrar mi voz como profesional independiente y al mismo tiempo arquitecta. Lo lograron.",
    nombre: "Melanie Howlin",
    rubro: "Marca Personal · Broker inmobiliaria y arquitecta",
    servicio: "redes-sociales",
  },
  {
    texto: "Pasamos de una marca dispersa a una marca con identidad. El cambio se notó en consultas y en ventas.",
    nombre: "Falcón Real Estate",
    marca: "Falcón Real Estate",
    rubro: "Real Estate",
    servicio: "performance",
  },
  {
    texto: "Saben leer el rubro y traducirlo a contenido. Eso es lo que nos faltaba antes de trabajar con ellas.",
    nombre: "Estudio MODO CASA",
    marca: "MODO CASA",
    rubro: "Interiorismo y Arquitectura",
    servicio: "redes-sociales",
  },
  {
    texto: "El acompañamiento mes a mes es lo que nos sostiene. No es un proyecto cerrado, es una operación viva.",
    nombre: "Horizon Global",
    marca: "HORIZON GLOBAL",
    rubro: "Ecommerce",
    servicio: "performance",
  },
  {
    texto: "Mi marca personal tomó otro nivel desde que trabajamos juntos. Hoy se siente coherente y propia.",
    nombre: "Fabiana García Lago",
    rubro: "Talent",
    servicio: "redes-sociales",
  },
  {
    texto: "Acompañan con criterio y con honestidad. Si algo no conviene lo dicen, eso vale más que cualquier sí.",
    nombre: "DINKA",
    marca: "DINKA",
    rubro: "Consultora de PYMES",
    servicio: "academy",
  },
  {
    texto: "El trabajo de pauta y CRM fue clave para escalar. La inversión empezó a tener un retorno medible.",
    nombre: "RE/MAX Raíces",
    marca: "RE/MAX Raíces",
    rubro: "Real Estate",
    servicio: "performance",
  },
  {
    texto: "Marcaron la diferencia entre publicar contenido y construir marca. No es lo mismo, y se nota.",
    nombre: "Coldwell Banker Lion Team",
    marca: "Coldwell Banker Lion Team",
    rubro: "Real Estate",
    servicio: "redes-sociales",
  },
  {
    texto: "Lograron poner en palabras lo que yo no podía. Mi marca personal cambió desde la primera reunión.",
    nombre: "Luna González",
    rubro: "Marca Personal",
    servicio: "redes-sociales",
  },
  {
    texto: "Entienden el negocio inmobiliario y lo traducen a una comunicación que vende. Eso es lo que buscábamos.",
    nombre: "INCO Desarrollos",
    marca: "INCO Desarrollos",
    rubro: "Desarrollador Inmobiliario",
    servicio: "performance",
  },
  {
    texto: "Trabajamos con un equipo que se compromete con el resultado. Eso cambió cómo encaramos nuestra marca.",
    nombre: "PATER",
    marca: "PATER",
    rubro: "Consultores inmobiliarios",
    servicio: "redes-sociales",
  },
  {
    texto: "Sumamos contenido, estrategia y campañas con un solo equipo. La coherencia en todo se nota mucho.",
    nombre: "Grupo Tercer Milenio",
    marca: "Grupo Tercer Milenio",
    rubro: "Mega librería",
    servicio: "redes-sociales",
  },
  {
    texto: "Mi marca personal tomó forma con ellas. Ahora siento que comunico desde la honestidad y no desde la fórmula.",
    nombre: "Anita La Torre",
    rubro: "Marca Personal",
    servicio: "academy",
  },
  {
    texto: "El proceso de trabajo es claro y profesional. Saben qué pedirte y cuándo, no hay vueltas.",
    nombre: "Fer Estevao Díaz",
    rubro: "Marca Personal",
    servicio: "redes-sociales",
  },
  {
    texto: "Pasamos de invertir sin saber a invertir con criterio. Las campañas tienen lógica y se ve en el ROAS.",
    nombre: "RE/MAX Emblema",
    marca: "RE/MAX Emblema",
    rubro: "Real Estate",
    servicio: "performance",
  },
  {
    texto: "El equipo se hizo cargo del proyecto como si fuera propio. Ese nivel de compromiso es raro de encontrar.",
    nombre: "MEADE 2 RE/MAX Estudio",
    marca: "MEADE 2 RE/MAX Estudio",
    rubro: "Real Estate",
    servicio: "redes-sociales",
  },
  {
    texto: "Saben acompañar a una marca personal sin hacerla genérica. Eso para mí, como coach, era fundamental.",
    nombre: "Ana Boucher",
    rubro: "Marca Personal · Coach",
    servicio: "redes-sociales",
  },
  {
    texto: "Lograron transmitir la confianza que necesita un paciente cuando elige un equipo médico. No es fácil.",
    nombre: "Núcleo Bariátrico",
    marca: "Núcleo Bariátrico",
    rubro: "Grupo médico",
    servicio: "redes-sociales",
  },
  {
    texto: "Trabajan con cuidado por la persona que está detrás de la marca. Eso para mí lo cambia todo.",
    nombre: "Dra. Agustina López",
    rubro: "Marca Personal · Cirujana",
    servicio: "redes-sociales",
  },
  {
    texto: "El proceso es ordenado, profesional y con resultados medibles. Eso me dio tranquilidad desde el inicio.",
    nombre: "Dr. Sergio Sitta",
    rubro: "Marca Personal · Cirujano",
    servicio: "redes-sociales",
  },
  {
    texto: "Una mirada externa con criterio comercial nos vino bien para destrabar cómo nos comunicábamos.",
    nombre: "Team Bazo C21 El Yar",
    marca: "Team Bazo C21 El Yar",
    rubro: "Real Estate",
    servicio: "performance",
  },
  {
    texto: "Crearon una identidad que se ve en todos los puntos de contacto. La marca tomó otra dimensión.",
    nombre: "AYERZA Resto",
    marca: "AYERZA Resto",
    rubro: "Gastronomía",
    servicio: "redes-sociales",
  },
  {
    texto: "Trabajamos pauta y creatividades con un mismo equipo. Eso evita el ida y vuelta y los resultados llegan más rápido.",
    nombre: "E-MOTIVO",
    marca: "E-MOTIVO",
    rubro: "Indumentaria",
    servicio: "performance",
  },
  {
    texto: "Nos ayudaron a comunicar lo que hacemos sin caer en clichés de RRHH. Esa diferencia se nota en el día a día.",
    nombre: "Magnetic",
    marca: "Magnetic",
    rubro: "Recursos Humanos",
    servicio: "redes-sociales",
  },
  {
    texto: "Confío en el equipo porque entendieron mi voz desde el inicio. No me cambiaron, me ordenaron.",
    nombre: "Micaela Elías",
    rubro: "Marca Personal",
    servicio: "academy",
  },
  {
    texto: "Acompañan con criterio, sin perder de vista lo que cada marca tiene de propio. Es lo que más valoro.",
    nombre: "Sofía Stamateas",
    rubro: "Marca Personal",
    servicio: "redes-sociales",
  },
] as const

/* ─── FOUNDERS ────────────────────────────────────────────────────────────── */

export const founders: readonly MiembroEquipo[] = [
  {
    nombre: "Victoria Timpanaro",
    rol: "Co-founder & Directora",
    iniciales: "V",
    bio: [
      "Licenciada en Comunicación y creativa por vocación. Se formó trabajando para empresas como IRSA, Elepants y Prüne, donde aprendió cómo viven las marcas desde sus equipos.",
      "Empezó a emprender en social media como freelance y hoy lidera la creatividad, la dirección de contenido y los equipos de HOLD.",
      "Después de cruzarse con Flor estudiando y con más de 6 años de experiencia trabajando con marcas, fundaron HOLD en el 2022.",
    ],
  },
  {
    nombre: "Florentina Ferrari",
    rol: "Co-founder & Directora",
    iniciales: "F",
    bio: [
      "Estratega con ojo comercial y obsesión por el detalle. Se forma en Diseño Gráfico después de dejar Arquitectura — donde entendió que el diseño era más amplio.",
      "Pasó por dos agencias antes de armar la suya. Seis años aprendiendo a leer marcas, equipos y clientes — desde el contenido hasta la estrategia comercial. La definen la lectura del negocio, el ojo creativo y trabajar en el detalle.",
      "Fundó HOLD junto a Vicky en 2022. Lidera la dirección creativa y el desarrollo comercial de la agencia.",
    ],
  },
] as const


/* ─── EQUIPO EXTENDIDO ────────────────────────────────────────────────────────
   Lista plana del equipo (sin dividir por áreas). El rol concreto de cada
   una llega más adelante — por ahora va lorem genérico. */

export const team: readonly MiembroEquipo[] = [
  { nombre: "Soledad",    rol: "Lorem ipsum dolor sit amet",  iniciales: "S" },
  { nombre: "Maya",       rol: "Lorem ipsum dolor sit amet",  iniciales: "M" },
  { nombre: "Natalia",    rol: "Lorem ipsum dolor sit amet",  iniciales: "N" },
  { nombre: "Morena",     rol: "Lorem ipsum dolor sit amet",  iniciales: "M" },
  { nombre: "Katty",      rol: "Lorem ipsum dolor sit amet",  iniciales: "K" },
  { nombre: "Andrea",     rol: "Lorem ipsum dolor sit amet",  iniciales: "A" },
  { nombre: "Manuela",    rol: "Lorem ipsum dolor sit amet",  iniciales: "M" },
  { nombre: "Iara",       rol: "Lorem ipsum dolor sit amet",  iniciales: "I" },
  { nombre: "María",      rol: "Lorem ipsum dolor sit amet",  iniciales: "M" },
  { nombre: "Raquel",     rol: "Lorem ipsum dolor sit amet",  iniciales: "R" },
  { nombre: "Gabriela",   rol: "Lorem ipsum dolor sit amet",  iniciales: "G" },
  { nombre: "Sofía",      rol: "Lorem ipsum dolor sit amet",  iniciales: "S" },
  { nombre: "Valentina",  rol: "Lorem ipsum dolor sit amet",  iniciales: "V" },
  { nombre: "Josefina",   rol: "Lorem ipsum dolor sit amet",  iniciales: "J" },
  { nombre: "Camila",     rol: "Lorem ipsum dolor sit amet",  iniciales: "C" },
  { nombre: "Martina",    rol: "Lorem ipsum dolor sit amet",  iniciales: "M" },
  { nombre: "Coni",       rol: "Lorem ipsum dolor sit amet",  iniciales: "C" },
] as const

/* ─── STATS DECORATIVOS ───────────────────────────────────────────────────── */

export const STATS = [
  { valor: "3+",      label: "años de experiencia" },
  { valor: "+50",     label: "marcas acompañadas" },
  { valor: "Academy", label: "activa y creciendo" },
] as const

/* ─── COPY GENERAL ────────────────────────────────────────────────────────── */

export const TAGLINE = "No solo hacemos contenido, construimos marcas."

/* ─── HOME (rediseño 2026) ─────────────────────────────────────────────────── */

/* Marquees grandes que viven en la home. */
export const MARQUEE_LO_QUE_HACEMOS = "Lo que hacemos ↓"
export const MARQUEE_TRABAJOS = "TRABAJOS"
export const MARQUEE_QUIENES_SOMOS = "¿Quiénes somos?"

/* Bloque editorial bajo el hero (copy REAL del PDF). */
export const BLOQUE_CITA = {
  titulo:
    "Algún día alguien te va a querer cobrar caro por decirte awareness, engagement y funnel.",
  bajada:
    "Nosotras preferimos no venderte humo, nos involucramos en tu negocio.",
} as const

/* Contadores animados (copy REAL del PDF). */
export const contadoresHome: readonly Contador[] = [
  { valor: 30,  suffix: "+", label: "Marcas de distintos rubros" },
  { valor: 15,  suffix: "+", label: "Profesionales en un equipo multidisciplinario" },
  { valor: 100, suffix: "+", label: "Proyectos en menos de cuatro años" },
] as const

/* Intro de la sección de contadores (copy REAL del PDF). */
export const CONTADORES_INTRO = "Sí, nuestro nombre es inglés y…"

/* Grilla de trabajos (LOREM por ahora — placeholders + clientes ficticios
   con rubros variados para que las cards no se vean todas iguales). */
export const trabajos: readonly Trabajo[] = [
  {
    cliente: "Cliente 01",
    rubro: "Real Estate",
    fotos: ["Cover · 01.1", "Cover · 01.2", "Cover · 01.3"],
    logo: "Logo · 01",
  },
  {
    cliente: "Cliente 02",
    rubro: "Indumentaria",
    fotos: ["Cover · 02.1", "Cover · 02.2", "Cover · 02.3"],
    logo: "Logo · 02",
  },
  {
    cliente: "Cliente 03",
    rubro: "Talent",
    fotos: ["Cover · 03.1", "Cover · 03.2", "Cover · 03.3"],
    logo: "Logo · 03",
  },
  {
    cliente: "Cliente 04",
    rubro: "Gastronomía",
    fotos: ["Cover · 04.1", "Cover · 04.2", "Cover · 04.3"],
    logo: "Logo · 04",
  },
  {
    cliente: "Cliente 05",
    rubro: "Health & Wellness",
    fotos: ["Cover · 05.1", "Cover · 05.2", "Cover · 05.3"],
    logo: "Logo · 05",
  },
  {
    cliente: "Cliente 06",
    rubro: "Legal",
    fotos: ["Cover · 06.1", "Cover · 06.2", "Cover · 06.3"],
    logo: "Logo · 06",
  },
] as const

/* Accordion de 6 servicios — títulos REALES del PDF, copy detallado
   LOREM por ahora hasta que las chicas pasen el copy de cada uno.
   Los 3 que tienen página propia incluyen href interno. */
export const serviciosHome: readonly ServicioHomeItem[] = [
  {
    slug: "redes-sociales",
    nombre: "Redes Sociales",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    bullets: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor incididunt",
      "Ut labore et dolore magna aliqua",
      "Ut enim ad minim veniam",
    ],
    href: "/redes-sociales",
  },
  {
    slug: "estrategia-contenido",
    nombre: "Estrategia de Contenido",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    bullets: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Duis aute irure dolor",
      "In reprehenderit in voluptate",
      "Velit esse cillum dolore",
    ],
  },
  {
    slug: "marca-personal",
    nombre: "Marca Personal",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    bullets: [
      "Excepteur sint occaecat cupidatat",
      "Non proident sunt in culpa",
      "Qui officia deserunt mollit",
      "Anim id est laborum",
      "Lorem ipsum dolor",
    ],
  },
  {
    slug: "posicionamiento-digital",
    nombre: "Posicionamiento Digital",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    bullets: [
      "Nemo enim ipsam voluptatem",
      "Quia voluptas sit aspernatur",
      "Aut odit aut fugit",
      "Sed quia consequuntur",
      "Magni dolores eos qui ratione",
    ],
  },
  {
    slug: "performance-ads",
    nombre: "Performance & Ads",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    bullets: [
      "Neque porro quisquam est",
      "Qui dolorem ipsum quia dolor",
      "Sit amet consectetur",
      "Adipisci velit sed quia",
      "Non numquam eius modi tempora",
    ],
    href: "/performance",
  },
  {
    slug: "academy",
    nombre: "HOLD Academy",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    bullets: [
      "At vero eos et accusamus",
      "Et iusto odio dignissimos",
      "Ducimus qui blanditiis",
      "Praesentium voluptatum",
      "Deleniti atque corrupti quos",
    ],
    href: "/academy",
  },
] as const

/* Macro-grupos de servicios (copy REAL completo del PDF). */
export const serviciosGrupos: readonly ServicioGrupo[] = [
  {
    numero: "01",
    titulo: "HOLD BRANDS",
    descripcion:
      "Para negocios que quieren construir su marca con estrategia. Nos involucramos en el negocio y construimos la comunicación desde adentro.",
    bullets: [
      "Branding e identidad de marca",
      "Estrategia y planificación de comunicación",
      "Campañas y lanzamientos",
      "Gestión de redes sociales",
      "Producción audiovisual",
      "Desarrollo web",
    ],
  },
  {
    numero: "02",
    titulo: "HOLD TALENTS",
    descripcion:
      "Para figuras públicas y creadores que quieren monetizar su marca personal. Construcción de identidad, estrategia de contenido, gestión de comunidad y vinculación con marcas.",
    bullets: [
      "Estrategia de marca personal",
      "Management",
      "Gestión con marcas",
      "Dirección creativa",
      "Gestión de redes y comunidad",
      "Producción de contenido",
    ],
  },
  {
    numero: "03",
    titulo: "HOLD PERFORMANCE",
    descripcion:
      "Generamos oportunidades comerciales reales para tu negocio. Implementamos campañas en Meta, Google, LinkedIn y TikTok, según tu marca necesite, integradas con CRM y automatizaciones, para captar, gestionar y convertir contactos en potenciales clientes.",
    bullets: [
      "Campañas en Meta, Google, LinkedIn y Tiktok",
      "Comunicación estratégica para pauta",
      "Implementación de CRM",
      "Automatizaciones de captación y seguimiento",
      "Base de datos propia para tu negocio",
      "Gestión de redes y comunidad",
      "Reportes y optimización mensual",
    ],
  },
] as const

/* Historia birra (copy REAL del PDF). */
export const HISTORIA_BIRRA = {
  cita:
    "Las mejores decisiones se toman con una birra de por medio. La nuestra fue dejar de buscar la agencia que queríamos y construirla nosotras.",
  fotoBirra: "Birra · 2021",
  fotoEquipo: "Equipo · 2026",
} as const
