// Centralized list of courses used by Home and Cursos pages.
// Fields: slug (used in /producto/{slug}), title, image, description, price, categories (array of slugs), featured
const rawCourses = [
  {
    slug: 'curso-criolipo-2',
    title: 'CrioLipo',
    image: '/criolipo.webp',
    description: 'Curso criolipotratamiento avanzado para reducción de tejido graso localizado.',
    price: '$450.000',
    featured: true,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-criolipolisis-de-placa',
    title: 'Criolipólisis de placas',
    image: '/criolipolisis-de-placa.webp',
    description: 'Técnicas estáticas y dinámicas para lograr reducción y reafirmación corporal.',
    price: '$140.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-criolipolisis-expert',
    title: 'Criolipólisis Expert',
    image: '/3-curso.webp',
    description: 'Conviértete en experto con la formación más completa en criolipólisis.',
    price: '$850.000',
    featured: false,
    categories: ['cursos-online-presenciales','cursos-online-grabados'],
  },
  {
    slug: 'curso-secretos-de-criolipolisis',
    title: 'Secretos de Criolipólisis',
    image: '/4-curso.webp',
    description: 'Gana seguridad y domina la técnica para transformarte en un verdadero experto en el área.',
    price: '$80.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-tratamiento-criofacial-fusion-multicapa',
    title: 'Curso Tratamiento Criofacial Fusión Multicapa',
    image: '/5-curso.webp',
    description: 'Curso de rejuvenecimiento facial no invasivo que combina tensado, bioestimulación y reducción de grasa.',
    price: '$200.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-tecnologias-para-grasa-localizada',
    title: 'Tecnologías para Grasa Localizada',
    image: '/6-curso.webp',
    description: 'Curso para reducir grasa localizada con resultados efectivos.',
    price: '$110.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-ultrasonidos-micro-focalizados-mfus-y-hifu',
    title: 'Ultrasonido Micro Focalizados Mfus y Hifu',
    image: '/7-curso.webp',
    description: 'Ultrasonido para rejuvenecimiento y grasa, dependiente del operador.',
    price: '$80.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-prevencion-y-manejo-de-complicaciones-con-criolipolisis',
    title: 'Prevención y Manejo de Complicaciones en Criolipólisis',
    image: '/8-curso.webp',
    description: 'Curso para prevenir y manejar complicaciones con seguridad y eficacia.',
    price: '$80.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
  {
    slug: 'curso-depilacion-laser-teorico-y-practico-demostrativo',
    title: 'Depilación Laser Teórico y Practico demostrativo',
    image: '/9-curso-1.webp',
    description: 'Curso de depilación láser y termólisis selectiva para lograr depilación definitiva.',
    price: '$60.000',
    featured: false,
    categories: ['cursos-online-grabados'],
  },
];

// Normalize fields so consumers always receive the same shape
export const courses = rawCourses.map((c) => ({
  slug: String(c.slug || '').trim(),
  title: String(c.title || c.titulo || c.slug || '').trim(),
  image: c.image ? String(c.image).trim() : '',
  description: String(c.description || c.descripcion || '').trim(),
  price: c.price ? String(c.price) : '',
  categories: Array.isArray(c.categories) ? c.categories : [],
  featured: !!c.featured,
  href: `/producto/${String(c.slug || '').trim()}`,
}));

export const featuredSlugs = courses.filter((c) => c.featured).map((c) => c.slug);

export default { courses, featuredSlugs };
