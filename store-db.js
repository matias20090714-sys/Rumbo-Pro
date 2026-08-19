/* ==========================================================================
   RUMBO PRO — LOCAL DATABASE & STATE ENGINE (store-db.js)
   ========================================================================== */

const DB_KEY_USERS = 'rumbopro_db_users';
const DB_KEY_COURSES = 'rumbopro_db_courses';
const DB_KEY_PROGRESS = 'rumbopro_db_progress';
const DB_KEY_CERTIFICATES = 'rumbopro_db_certificates';
const DB_KEY_USER_COURSES = 'rumbopro_db_user_courses';
const DB_KEY_SESSION = 'rumbopro_db_session';

// Initial Official Courses Data (5 Official Courses with Native Modules & Lessons)
const INITIAL_COURSES = [
  {
    id: 'course-ecommerce',
    title: 'E-COMMERCE / DROPSHIPPING',
    badge: 'FORMACIÓN ONLINE',
    icon: '🛒',
    description: 'Aprendé los fundamentos para crear y desarrollar un negocio de comercio electrónico y ventas online.',
    active: true,
    modules: [
      {
        id: 'mod-ecom-1',
        title: 'Módulo 1 — Fundamentos y Modelo de Negocio',
        lessons: [
          { id: 'les-ecom-101', title: 'Clase 1: Introducción al E-Commerce y Dropshipping', duration: '15 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'En esta clase aprenderás la estructura básica de una tienda online de comercio electrónico y el modelo de envíos directos.' },
          { id: 'les-ecom-102', title: 'Clase 2: Selección de Productos Ganadores', duration: '22 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Descubre los criterios para analizar demanda, márgenes de ganancia y viabilidad comercial de productos.' },
          { id: 'les-ecom-103', title: 'Clase 3: Creación y Configuración de Tienda Online', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Guía paso a paso para estructurar tu tienda, pasarela de pago y catálogo de ofertas.' }
        ]
      },
      {
        id: 'mod-ecom-2',
        title: 'Módulo 2 — Proveedores y Logística',
        lessons: [
          { id: 'les-ecom-201', title: 'Clase 4: Negociación con Proveedores', duration: '18 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Cómo encontrar proveedores confiables y coordinar tiempos de entrega.' },
          { id: 'les-ecom-202', title: 'Clase 5: Procesamiento y Gestión de Pedidos', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Sistemas automáticos para procesar órdenes y atención al cliente.' }
        ]
      },
      {
        id: 'mod-ecom-3',
        title: 'Módulo 3 — Estrategias de Ventas y Tráfico',
        lessons: [
          { id: 'les-ecom-301', title: 'Clase 6: Publicidad y Tráfico para E-Commerce', duration: '28 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Estrategias de anuncios para atraer compradores calificados a tu tienda.' },
          { id: 'les-ecom-302', title: 'Clase 7: Optimización de Conversión', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Técnicas para reducir carritos abandonados y aumentar el ticket promedio.' }
        ]
      }
    ]
  },
  {
    id: 'course-afiliados',
    title: 'MARKETING DE AFILIADOS',
    badge: 'FORMACIÓN ONLINE',
    icon: '💰',
    description: 'Aprendé cómo funciona el marketing de afiliados, cómo promocionar productos y desarrollar estrategias de contenido y ventas.',
    active: true,
    modules: [
      {
        id: 'mod-afi-1',
        title: 'Módulo 1 — Fundamentos de Afiliación',
        lessons: [
          { id: 'les-afi-101', title: 'Clase 1: Ecosistema del Marketing de Afiliados', duration: '16 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Conceptos clave, roles, atribución de comisiones y funcionamiento del mercado de afiliados.' },
          { id: 'les-afi-102', title: 'Clase 2: Elección de Ofertas y Productos', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Cómo elegir infoproductos o membresías con alto potencial de conversión.' }
        ]
      },
      {
        id: 'mod-afi-2',
        title: 'Módulo 2 — Estrategias de Contenido y Tráfico',
        lessons: [
          { id: 'les-afi-201', title: 'Clase 3: Generación de Contenido Orgánico', duration: '24 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Estrategias para crear reels, videos y posts que atraigan clientes calificados.' },
          { id: 'les-afi-202', title: 'Clase 4: Embudos de Conversión y Guiones', duration: '26 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Estructuración de embudos y guiones de venta para prospectos.' }
        ]
      },
      {
        id: 'mod-afi-3',
        title: 'Módulo 3 — Cierre de Ventas y Escalamiento',
        lessons: [
          { id: 'les-afi-301', title: 'Clase 5: Cierre de Prospectos en Mensajería', duration: '22 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Manejo de conversaciones, objeciones y envío de links de afiliar.' }
        ]
      }
    ]
  },
  {
    id: 'course-closer',
    title: 'CLOSER DE VENTAS',
    badge: 'FORMACIÓN ONLINE',
    icon: '🎯',
    description: 'Aprendé técnicas de comunicación, negociación y cierre de ventas para llamadas y conversaciones de alto valor.',
    active: true,
    modules: [
      {
        id: 'mod-cls-1',
        title: 'Módulo 1 — Mentalidad y Comunicación del Closer',
        lessons: [
          { id: 'les-cls-101', title: 'Clase 1: El Rol y Perfil del Closer de Ventas', duration: '18 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Definición del rol del closer en negocios digitales y ofertas High Ticket.' },
          { id: 'les-cls-102', title: 'Clase 2: Descubrimiento de Necesidades y Dolores', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Preguntas estratégicas para entender la situación y metas del cliente.' }
        ]
      },
      {
        id: 'mod-cls-2',
        title: 'Módulo 2 — Manejo de Objeciones y Cierre',
        lessons: [
          { id: 'les-cls-201', title: 'Clase 3: Objeciones de Precio, Tiempo y Confianza', duration: '28 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Marcos de respuesta para superar dudas y generar certeza.' },
          { id: 'les-cls-202', title: 'Clase 4: Acuerdos y Seguimiento de Contratos', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Cómo concretar el pago y realizar seguimientos profesionales sin presionar.' }
        ]
      }
    ]
  },
  {
    id: 'course-cm',
    title: 'COMMUNITY MANAGER',
    badge: 'FORMACIÓN ONLINE',
    icon: '📱',
    description: 'Aprendé a gestionar redes sociales, crear contenido estratégico y desarrollar marcas digitales.',
    active: true,
    modules: [
      {
        id: 'mod-cm-1',
        title: 'Módulo 1 — Trabaja en Digital y Marca Personal',
        lessons: [
          { id: 'les-cm-101', title: 'Clase 1: Fundamentos de la Gestión de Marcas', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Estructuración de perfil, propuesta de valor y línea gráfica para negocios.' },
          { id: 'les-cm-102', title: 'Clase 2: Planificación de Calendario de Contenido', duration: '22 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Creación de pilares de contenido, frecuencia de publicación y copywriting.' }
        ]
      },
      {
        id: 'mod-cm-2',
        title: 'Módulo 2 — Creador Pro y Formatos Virales',
        lessons: [
          { id: 'les-cm-201', title: 'Clase 3: Edición y Formatos para Redes', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Herramientas de diseño y edición ágil de video corto para Reels y TikTok.' },
          { id: 'les-cm-202', title: 'Clase 4: Uso de Inteligencia Artificial para Redes', duration: '24 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Optimización de ideas, guiones y publicaciones mediante herramientas IA.' }
        ]
      }
    ]
  },
  {
    id: 'course-hotmart',
    title: 'HOTMART',
    badge: 'FORMACIÓN ONLINE',
    icon: '🔥',
    description: 'Aprendé a utilizar la plataforma Hotmart, entender el funcionamiento de productos digitales, ventas y afiliación.',
    active: true,
    modules: [
      {
        id: 'mod-hot-1',
        title: 'Módulo 1 — Ecosistema Hotmart',
        lessons: [
          { id: 'les-hot-101', title: 'Clase 1: Registro y Configuración de Cuenta Hotmart', duration: '15 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Creación de cuenta, verificación de datos de cobro y navegación del panel.' },
          { id: 'les-hot-102', title: 'Clase 2: Elección de Productos en Mercado de Hotmart', duration: '22 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Análisis de temperatura, blueprint y satisfacción de infoproductos.' }
        ]
      },
      {
        id: 'mod-hot-2',
        title: 'Módulo 2 — Estrategia y Divulgación de Hotlinks',
        lessons: [
          { id: 'les-hot-201', title: 'Clase 3: Uso de Hotlinks y Rastreos', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Cómo promocionar correctamente tus enlaces sin perder la comisión.' },
          { id: 'les-hot-202', title: 'Clase 4: Panel de Ventas y Retiro de Comisiones', duration: '18 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Monitoreo de métricas, conversión y retiro de fondos a tu cuenta bancaria.' }
        ]
      }
    ]
  }
];

// Initial Admin User Seed
const INITIAL_USERS = [
  {
    id: 'user-admin-01',
    firstName: 'Pablo',
    lastName: 'Xavier',
    email: 'admin@rumbopro.com',
    password: 'admin123', // In real prod hashed
    role: 'ADMINISTRADOR',
    status: 'APROBADO',
    registeredAt: '2026-08-15T10:00:00.000Z'
  }
];

// Database Wrapper Class
class RumboProDB {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (!localStorage.getItem(DB_KEY_USERS)) {
      localStorage.setItem(DB_KEY_USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(DB_KEY_COURSES)) {
      localStorage.setItem(DB_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(DB_KEY_PROGRESS)) {
      localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEY_CERTIFICATES)) {
      localStorage.setItem(DB_KEY_CERTIFICATES, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEY_USER_COURSES)) {
      // By default, approved users get assigned all 5 official courses
      const initialAssignments = [
        { userId: 'user-admin-01', courseId: 'course-ecommerce' },
        { userId: 'user-admin-01', courseId: 'course-afiliados' },
        { userId: 'user-admin-01', courseId: 'course-closer' },
        { userId: 'user-admin-01', courseId: 'course-cm' },
        { userId: 'user-admin-01', courseId: 'course-hotmart' }
      ];
      localStorage.setItem(DB_KEY_USER_COURSES, JSON.stringify(initialAssignments));
    }
  }

  // --- AUTH & USER MANAGEMENT ---
  getUsers() {
    return JSON.parse(localStorage.getItem(DB_KEY_USERS) || '[]');
  }

  saveUsers(users) {
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
  }

  registerUser(userData) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: 'ALUMNO',
      status: 'PENDIENTE', // Default state is PENDIENTE DE APROBACIÓN
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Auto-assign all 5 default active courses (they unlock upon approval)
    const courses = this.getCourses();
    const userCourses = JSON.parse(localStorage.getItem(DB_KEY_USER_COURSES) || '[]');
    courses.forEach(c => {
      userCourses.push({ userId: newUser.id, courseId: c.id });
    });
    localStorage.setItem(DB_KEY_USER_COURSES, JSON.stringify(userCourses));

    return newUser;
  }

  loginUser(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
    }

    // Save active session
    const session = {
      userId: user.id,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(DB_KEY_SESSION, JSON.stringify(session));
    return user;
  }

  getCurrentUser() {
    const session = JSON.parse(localStorage.getItem(DB_KEY_SESSION) || 'null');
    if (!session) return null;

    const users = this.getUsers();
    return users.find(u => u.id === session.userId) || null;
  }

  logout() {
    localStorage.removeItem(DB_KEY_SESSION);
  }

  updateUserStatus(userId, newStatus) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus; // PENDIENTE, APROBADO, RECHAZADO, SUSPENDIDO
      this.saveUsers(users);
    }
  }

  // --- COURSE & CONTENT MANAGEMENT ---
  getCourses() {
    return JSON.parse(localStorage.getItem(DB_KEY_COURSES) || '[]');
  }

  saveCourses(courses) {
    localStorage.setItem(DB_KEY_COURSES, JSON.stringify(courses));
  }

  getUserCourses(userId) {
    const userCourses = JSON.parse(localStorage.getItem(DB_KEY_USER_COURSES) || '[]');
    const assignedIds = userCourses.filter(uc => uc.userId === userId).map(uc => uc.courseId);
    const allCourses = this.getCourses();
    return allCourses.filter(c => assignedIds.includes(c.id) && c.active);
  }

  assignCourseToUser(userId, courseId) {
    const userCourses = JSON.parse(localStorage.getItem(DB_KEY_USER_COURSES) || '[]');
    const exists = userCourses.some(uc => uc.userId === userId && uc.courseId === courseId);
    if (!exists) {
      userCourses.push({ userId, courseId });
      localStorage.setItem(DB_KEY_USER_COURSES, JSON.stringify(userCourses));
    }
  }

  removeCourseFromUser(userId, courseId) {
    let userCourses = JSON.parse(localStorage.getItem(DB_KEY_USER_COURSES) || '[]');
    userCourses = userCourses.filter(uc => !(uc.userId === userId && uc.courseId === courseId));
    localStorage.setItem(DB_KEY_USER_COURSES, JSON.stringify(userCourses));
  }

  createCourse(courseData) {
    const courses = this.getCourses();
    const newCourse = {
      id: 'course-' + Date.now(),
      title: courseData.title,
      badge: courseData.badge || 'FORMACIÓN ONLINE',
      icon: courseData.icon || '🎓',
      description: courseData.description,
      active: true,
      modules: []
    };
    courses.push(newCourse);
    this.saveCourses(courses);
    return newCourse;
  }

  addModuleToCourse(courseId, moduleTitle) {
    const courses = this.getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const newModule = {
        id: 'mod-' + Date.now(),
        title: moduleTitle,
        lessons: []
      };
      course.modules.push(newModule);
      this.saveCourses(courses);
      return newModule;
    }
  }

  addLessonToModule(courseId, moduleId, lessonData) {
    const courses = this.getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const module = course.modules.find(m => m.id === moduleId);
      if (module) {
        const newLesson = {
          id: 'les-' + Date.now(),
          title: lessonData.title,
          duration: lessonData.duration || '15 min',
          type: 'video',
          videoUrl: lessonData.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          content: lessonData.content || ''
        };
        module.lessons.push(newLesson);
        this.saveCourses(courses);
        return newLesson;
      }
    }
  }

  // --- PROGRESS TRACKING ENGINE ---
  getProgress() {
    return JSON.parse(localStorage.getItem(DB_KEY_PROGRESS) || '[]');
  }

  saveProgress(progressList) {
    localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(progressList));
  }

  markLessonComplete(userId, courseId, lessonId) {
    let progress = this.getProgress();
    const exists = progress.some(p => p.userId === userId && p.lessonId === lessonId);
    if (!exists) {
      progress.push({
        userId,
        courseId,
        lessonId,
        completedAt: new Date().toISOString()
      });
      this.saveProgress(progress);
    }
  }

  markLessonIncomplete(userId, courseId, lessonId) {
    let progress = this.getProgress();
    progress = progress.filter(p => !(p.userId === userId && p.lessonId === lessonId));
    this.saveProgress(progress);
  }

  getCourseStats(userId, courseId) {
    const courses = this.getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return { totalLessons: 0, completedLessons: 0, percentage: 0, isCompleted: false };

    let totalLessons = 0;
    const allLessonIds = [];
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        totalLessons++;
        allLessonIds.push(l.id);
      });
    });

    const progress = this.getProgress();
    const completedForUser = progress.filter(p => p.userId === userId && allLessonIds.includes(p.lessonId));
    const completedCount = completedForUser.length;

    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCompleted = percentage === 100 && totalLessons > 0;

    return {
      totalLessons,
      completedLessons: completedCount,
      percentage,
      isCompleted
    };
  }

  // --- CERTIFICATES ENGINE ---
  getCertificates() {
    return JSON.parse(localStorage.getItem(DB_KEY_CERTIFICATES) || '[]');
  }

  saveCertificates(certs) {
    localStorage.setItem(DB_KEY_CERTIFICATES, JSON.stringify(certs));
  }

  generateCertificate(userId, courseId) {
    const stats = this.getCourseStats(userId, courseId);
    if (!stats.isCompleted) {
      throw new Error('El curso debe estar al 100% completado para emitir el certificado.');
    }

    const certs = this.getCertificates();
    const existing = certs.find(c => c.userId === userId && c.courseId === courseId);
    if (existing) {
      return existing; // Return existing certificate if already generated
    }

    const user = this.getUsers().find(u => u.id === userId);
    const course = this.getCourses().find(c => c.id === courseId);

    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCert = {
      id: 'RP-CERT-' + randomHash,
      userId: userId,
      userName: `${user.firstName} ${user.lastName}`,
      courseId: courseId,
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      signature: 'Pablo Xavier',
      directorTitle: 'Director & Fundador de RUMBO PRO'
    };

    certs.push(newCert);
    this.saveCertificates(certs);
    return newCert;
  }

  verifyCertificate(code) {
    const certs = this.getCertificates();
    const cleanCode = code.trim().toUpperCase();
    return certs.find(c => c.id === cleanCode) || null;
  }
}

// Global Singleton Instance
window.rumboDB = new RumboProDB();
