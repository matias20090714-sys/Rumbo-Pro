/* ==========================================================================
   RUMBO PRO — SUPABASE REAL-TIME DATABASE & STATE ENGINE (store-db.js)
   ========================================================================== */

const SUPABASE_URL = 'https://vjmzwudzxvwllmxkpmqm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbXp3dWR6eHZ3bGxteGtwbXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNjQ3NjIsImV4cCI6MjEwMjg0MDc2Mn0.R_4ewIacddxPWkEkCjAjblVu9ST0CFpe-j1N05k_Uqk';

const DB_KEY_USERS = 'rumbopro_db_users';
const DB_KEY_COURSES = 'rumbopro_db_courses';
const DB_KEY_PROGRESS = 'rumbopro_db_progress';
const DB_KEY_CERTIFICATES = 'rumbopro_db_certificates';
const DB_KEY_USER_COURSES = 'rumbopro_db_user_courses';
const DB_KEY_SESSION = 'rumbopro_db_session';

// Official Courses Definition (Structured by Real Modules & Lessons)
const INITIAL_COURSES = [
  {
    id: 'course-ecommerce',
    title: 'E-COMMERCE / DROPSHIPPING',
    badge: 'FORMACION ONLINE',
    icon: '🛒',
    description: 'Aprende los fundamentos para crear y desarrollar un negocio de comercio electronico y ventas online.',
    active: true,
    modules: [
      {
        id: 'mod-ecom-1',
        title: 'Módulo 1 — Fundamentos y Modelo de Negocio',
        lessons: [
          {
            id: 'les-ecom-101',
            title: 'Módulo 1: Introducción, Fundamentos y Mentalidad de E-Commerce',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz#list',
            driveLink: 'https://drive.google.com/drive/folders/1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz',
            content: 'Material formativo sobre los fundamentos del comercio electrónico, estructura de negocios digitales y modelos de venta online.'
          }
        ]
      },
      {
        id: 'mod-ecom-2',
        title: 'Módulo 2 — Selección de Productos Ganadores',
        lessons: [
          {
            id: 'les-ecom-201',
            title: 'Módulo 2: Investigación de Mercado y Productos Ganadores',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz#list',
            driveLink: 'https://drive.google.com/drive/folders/1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz',
            content: 'Estrategias para identificar productos de alta demanda, análisis de competencia y márgenes de ganancia.'
          }
        ]
      },
      {
        id: 'mod-ecom-3',
        title: 'Módulo 3 — Creación y Configuración de Tienda',
        lessons: [
          {
            id: 'les-ecom-301',
            title: 'Módulo 3: Creación de Tienda Online y Pasarelas de Pago',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz#list',
            driveLink: 'https://drive.google.com/drive/folders/1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz',
            content: 'Estructuración visual de tu tienda, configuración de cobros y catálogo de productos.'
          }
        ]
      },
      {
        id: 'mod-ecom-4',
        title: 'Módulo 4 — Proveedores, Envíos y Publicidad',
        lessons: [
          {
            id: 'les-ecom-401',
            title: 'Módulo 4: Proveedores, Logística y Estrategias de Venta',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz#list',
            driveLink: 'https://drive.google.com/drive/folders/1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz',
            content: 'Gestión de logística con proveedores y atracción de clientes compradores.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-afiliados',
    title: 'MARKETING DE AFILIADOS',
    badge: 'FORMACION ONLINE',
    icon: '💰',
    description: 'Aprende como funciona el marketing de afiliados, como promocionar productos y desarrollar estrategias de contenido y ventas.',
    active: true,
    modules: [
      {
        id: 'mod-afi-1',
        title: 'Módulo 1 — Ecosistema y Fundamentos de Afiliación',
        lessons: [
          {
            id: 'les-afi-101',
            title: 'Módulo 1: Ecosistema y Modelos de Negocio en Afiliación',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=104agUfbMBtEr25dVY2gjGRnf9o8OzhXD#list',
            driveLink: 'https://drive.google.com/drive/folders/104agUfbMBtEr25dVY2gjGRnf9o8OzhXD',
            content: 'Conceptos clave de comisiones, plataformas y modelos de recomendación comercial.'
          }
        ]
      },
      {
        id: 'mod-afi-2',
        title: 'Módulo 2 — Elección de Ofertas y Productos',
        lessons: [
          {
            id: 'les-afi-201',
            title: 'Módulo 2: Selección de Infoproductos y Ofertas Rentables',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=104agUfbMBtEr25dVY2gjGRnf9o8OzhXD#list',
            driveLink: 'https://drive.google.com/drive/folders/104agUfbMBtEr25dVY2gjGRnf9o8OzhXD',
            content: 'Criterios para elegir ofertas con alta conversión y buen soporte de ventas.'
          }
        ]
      },
      {
        id: 'mod-afi-3',
        title: 'Módulo 3 — Estrategias de Contenido y Tráfico',
        lessons: [
          {
            id: 'les-afi-301',
            title: 'Módulo 3: Contenido Orgánico, Redes y Embudos de Conversión',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=104agUfbMBtEr25dVY2gjGRnf9o8OzhXD#list',
            driveLink: 'https://drive.google.com/drive/folders/104agUfbMBtEr25dVY2gjGRnf9o8OzhXD',
            content: 'Cómo atraer prospectos calificados mediante contenido estratégico y videos cortos.'
          }
        ]
      },
      {
        id: 'mod-afi-4',
        title: 'Módulo 4 — Cierre de Ventas y Escalamiento',
        lessons: [
          {
            id: 'les-afi-401',
            title: 'Módulo 4: Conversaciones, Guiones de Venta y Cierre',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=104agUfbMBtEr25dVY2gjGRnf9o8OzhXD#list',
            driveLink: 'https://drive.google.com/drive/folders/104agUfbMBtEr25dVY2gjGRnf9o8OzhXD',
            content: 'Guiones y técnicas de respuesta para cerrar interesados y generar comisiones.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-closer',
    title: 'CLOSER DE VENTAS',
    badge: 'FORMACION ONLINE',
    icon: '🎯',
    description: 'Aprende tecnicas de comunicacion, negociacion y cierre de ventas para llamadas y conversaciones de alto valor.',
    active: true,
    modules: [
      {
        id: 'mod-cls-1',
        title: 'Módulo 1 — Mentalidad y Perfil del Closer',
        lessons: [
          {
            id: 'les-cls-101',
            title: 'Módulo 1: El Rol y Habilidades del Closer de Ventas',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d#list',
            driveLink: 'https://drive.google.com/drive/folders/1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d',
            content: 'Perfil profesional, roles en negocios digitales y ofertas de alto valor.'
          }
        ]
      },
      {
        id: 'mod-cls-2',
        title: 'Módulo 2 — Diagnóstico y Calificación',
        lessons: [
          {
            id: 'les-cls-201',
            title: 'Módulo 2: Preguntas Estratégicas y Descubrimiento de Dolores',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d#list',
            driveLink: 'https://drive.google.com/drive/folders/1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d',
            content: 'Cómo entender a fondo la situación del cliente para presentar la solución adecuada.'
          }
        ]
      },
      {
        id: 'mod-cls-3',
        title: 'Módulo 3 — Manejo de Objeciones y Cierre',
        lessons: [
          {
            id: 'les-cls-301',
            title: 'Módulo 3: Superación de Objeciones (Precio, Tiempo, Confianza)',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d#list',
            driveLink: 'https://drive.google.com/drive/folders/1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d',
            content: 'Marcos de respuesta para generar confianza y cerrar acuerdos comerciales.'
          }
        ]
      },
      {
        id: 'mod-cls-4',
        title: 'Módulo 4 — Seguimiento y Acuerdos de Pago',
        lessons: [
          {
            id: 'les-cls-401',
            title: 'Módulo 4: Cierre Formal, Seguimiento Profesional y Contratos',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d#list',
            driveLink: 'https://drive.google.com/drive/folders/1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d',
            content: 'Estrategias de seguimiento post-llamada para concretar pagos sin ser invasivo.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-cm',
    title: 'COMMUNITY MANAGER',
    badge: 'FORMACION ONLINE',
    icon: '📱',
    description: 'Aprende a gestionar redes sociales, crear contenido estrategico y desarrollar marcas digitales. 5 modulos especializados.',
    active: true,
    modules: [
      {
        id: 'mod-cm-1',
        title: 'Módulo 1 — Trabaja en Digital',
        lessons: [
          {
            id: 'les-cm-101',
            title: 'Trabaja en Digital: Formación y Oportunidad',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            driveLink: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            content: 'Formación sobre cómo trabajar en el mundo digital y ofrecer servicios de gestión digital.'
          }
        ]
      },
      {
        id: 'mod-cm-2',
        title: 'Módulo 2 — Incógnito Pro',
        lessons: [
          {
            id: 'les-cm-201',
            title: 'Incógnito Pro: Creación de Marcas sin Rostro',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            content: 'Estrategias de contenido anónimo y monetización de marcas digitales.'
          }
        ]
      },
      {
        id: 'mod-cm-3',
        title: 'Módulo 3 — Creador Pro',
        lessons: [
          {
            id: 'les-cm-301',
            title: 'Creador Pro: Edición y Formatos Virales',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            content: 'Formación para creadores de contenido digital, edición de video corto y diseño ágil.'
          }
        ]
      },
      {
        id: 'mod-cm-4',
        title: 'Módulo 4 — ABC Marketing de Afiliados',
        lessons: [
          {
            id: 'les-cm-401',
            title: 'ABC Marketing de Afiliados aplicado a Redes',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            content: 'Fundamentos del marketing de afiliados aplicados a la gestión de comunidades.'
          }
        ]
      },
      {
        id: 'mod-cm-5',
        title: 'Módulo 5 — Domina la IA',
        lessons: [
          {
            id: 'les-cm-501',
            title: 'Domina la IA: Herramientas y Automatización',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://domina-la-ia-lyc-2026.netlify.app/gracias',
            driveLink: 'https://domina-la-ia-lyc-2026.netlify.app/gracias',
            content: 'Uso de inteligencia artificial para acelerar la creación de contenido y automatizar procesos.'
          }
        ]
      }
    ]
  },
  {
    id: 'course-hotmart',
    title: 'HOTMART',
    badge: 'FORMACION ONLINE',
    icon: '🔥',
    description: 'Aprende a utilizar la plataforma Hotmart, el funcionamiento de productos digitales, ventas y afiliacion.',
    active: true,
    modules: [
      {
        id: 'mod-hot-1',
        title: 'Módulo 1 — Registro y Configuración de Cuenta',
        lessons: [
          {
            id: 'les-hot-101',
            title: 'Módulo 1: Creación de Perfil y Configuración en Hotmart',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV#list',
            driveLink: 'https://drive.google.com/drive/folders/1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV',
            content: 'Paso a paso para configurar tu cuenta, verificación y navegación en la plataforma Hotmart.'
          }
        ]
      },
      {
        id: 'mod-hot-2',
        title: 'Módulo 2 — Exploración del Mercado de Afiliación',
        lessons: [
          {
            id: 'les-hot-201',
            title: 'Módulo 2: Análisis de Productos y Temperatura en Hotmart',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV#list',
            driveLink: 'https://drive.google.com/drive/folders/1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV',
            content: 'Cómo evaluar la temperatura, blueprint y comisiones de productos en el mercado de Hotmart.'
          }
        ]
      },
      {
        id: 'mod-hot-3',
        title: 'Módulo 3 — Hotlinks y Tracking de Comisiones',
        lessons: [
          {
            id: 'les-hot-301',
            title: 'Módulo 3: Gestión de Enlaces de Afiliado y Parámetros de Rastreo',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV#list',
            driveLink: 'https://drive.google.com/drive/folders/1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV',
            content: 'Configuración correcta de enlaces Hotlinks para asegurar la asignación de tus comisiones.'
          }
        ]
      },
      {
        id: 'mod-hot-4',
        title: 'Módulo 4 — Estrategias de Venta y Retiros',
        lessons: [
          {
            id: 'les-hot-401',
            title: 'Módulo 4: Estrategias de Promoción, Métricas y Retiro de Fondos',
            duration: 'Carpeta Drive',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV#list',
            driveLink: 'https://drive.google.com/drive/folders/1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV',
            content: 'Análisis de métricas de ventas y procedimiento para retirar tus ganancias bancarias.'
          }
        ]
      }
    ]
  }
];

class RumboProDB {
  constructor() {
    this.supabase = null;
    this.initSupabaseClient();
    this.initDatabase();
  }

  initSupabaseClient() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  }

  async initDatabase() {
    const CURRENT_VERSION = 'v5-multi-modules-clean';
    if (localStorage.getItem('rumbopro_modules_version') !== CURRENT_VERSION) {
      localStorage.setItem(DB_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
      localStorage.setItem('rumbopro_modules_version', CURRENT_VERSION);
    } else if (!localStorage.getItem(DB_KEY_COURSES)) {
      localStorage.setItem(DB_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
    }
    // Sync latest from Supabase
    await this.syncFromCloud();
  }

  async syncFromCloud() {
    if (!this.supabase) this.initSupabaseClient();
    if (!this.supabase) return;

    try {
      // 1. Fetch Users
      const { data: users, error: uErr } = await this.supabase.from('rumbopro_users').select('*');
      if (!uErr && users) {
        const formattedUsers = users.map(u => ({
          id: u.id,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
          password: u.password,
          role: u.role,
          status: u.status,
          registeredAt: u.registered_at
        }));
        localStorage.setItem(DB_KEY_USERS, JSON.stringify(formattedUsers));
      }

      // 2. Fetch Progress
      const { data: progress, error: pErr } = await this.supabase.from('rumbopro_progress').select('*');
      if (!pErr && progress) {
        const formattedProgress = progress.map(p => ({
          userId: p.user_id,
          courseId: p.course_id,
          lessonId: p.lesson_id,
          completedAt: p.completed_at
        }));
        localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(formattedProgress));
      }

      // 3. Fetch Certificates
      const { data: certs, error: cErr } = await this.supabase.from('rumbopro_certificates').select('*');
      if (!cErr && certs) {
        const formattedCerts = certs.map(c => ({
          id: c.id,
          userId: c.user_id,
          userName: c.user_name,
          courseId: c.course_id,
          courseTitle: c.course_title,
          issueDate: c.issue_date,
          signature: c.signature,
          directorTitle: c.director_title
        }));
        localStorage.setItem(DB_KEY_CERTIFICATES, JSON.stringify(formattedCerts));
      }
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }

  // --- REAL-TIME SUBSCRIPTION ---
  subscribeToLiveUpdates(onUpdateCallback) {
    if (!this.supabase) this.initSupabaseClient();
    if (!this.supabase) return;

    return this.supabase
      .channel('rumbopro_realtime_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rumbopro_users' }, async () => {
        await this.syncFromCloud();
        if (typeof onUpdateCallback === 'function') onUpdateCallback();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rumbopro_progress' }, async () => {
        await this.syncFromCloud();
        if (typeof onUpdateCallback === 'function') onUpdateCallback();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rumbopro_certificates' }, async () => {
        await this.syncFromCloud();
        if (typeof onUpdateCallback === 'function') onUpdateCallback();
      })
      .subscribe();
  }

  // --- AUTH & USER MANAGEMENT ---
  getUsers() {
    return JSON.parse(localStorage.getItem(DB_KEY_USERS) || '[]');
  }

  async registerUser(userData) {
    if (!this.supabase) this.initSupabaseClient();

    const cleanEmail = userData.email.trim().toLowerCase();
    const newUser = {
      id: 'user-' + Date.now(),
      first_name: userData.firstName.trim(),
      last_name: userData.lastName.trim(),
      email: cleanEmail,
      password: userData.password,
      role: 'ALUMNO',
      status: 'PENDIENTE'
    };

    // 1. Cloud insert
    if (this.supabase) {
      const { data, error } = await this.supabase
        .from('rumbopro_users')
        .insert([newUser])
        .select();

      if (error) {
        if (error.code === '23505' || error.message.includes('unique')) {
          throw new Error('El correo electronico ya se encuentra registrado.');
        }
        throw new Error(error.message || 'Error al registrar usuario en la nube.');
      }
    }

    // 2. Local Cache Update
    const users = this.getUsers();
    users.push({
      id: newUser.id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      status: newUser.status,
      registeredAt: new Date().toISOString()
    });
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));

    return newUser;
  }

  async loginUser(email, password) {
    await this.syncFromCloud();
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      throw new Error('Credenciales incorrectas. Verifica tu email y contrasena.');
    }

    const session = { userId: user.id, loginAt: new Date().toISOString() };
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

  async updateUserStatus(userId, newStatus) {
    // 1. Local Cache Update
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
      localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
    }

    // 2. Cloud Update in Supabase
    if (this.supabase) {
      await this.supabase
        .from('rumbopro_users')
        .update({ status: newStatus })
        .eq('id', userId);
    }
  }

  // --- COURSE & CONTENT MANAGEMENT ---
  getCourses() {
    return JSON.parse(localStorage.getItem(DB_KEY_COURSES) || JSON.stringify(INITIAL_COURSES));
  }

  getUserCourses(userId) {
    return this.getCourses().filter(c => c.active);
  }

  // --- PROGRESS TRACKING ENGINE ---
  getProgress() {
    return JSON.parse(localStorage.getItem(DB_KEY_PROGRESS) || '[]');
  }

  async markLessonComplete(userId, courseId, lessonId) {
    let progress = this.getProgress();
    const exists = progress.some(p => p.userId === userId && p.lessonId === lessonId);
    if (!exists) {
      progress.push({ userId, courseId, lessonId, completedAt: new Date().toISOString() });
      localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(progress));

      if (this.supabase) {
        await this.supabase.from('rumbopro_progress').insert([{
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId
        }]);
      }
    }
  }

  async markLessonIncomplete(userId, courseId, lessonId) {
    let progress = this.getProgress();
    progress = progress.filter(p => !(p.userId === userId && p.lessonId === lessonId));
    localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(progress));

    if (this.supabase) {
      await this.supabase
        .from('rumbopro_progress')
        .delete()
        .eq('user_id', userId)
        .eq('lesson_id', lessonId);
    }
  }

  async toggleCourseComplete(userId, courseId) {
    const stats = this.getCourseStats(userId, courseId);
    const course = this.getCourses().find(c => c.id === courseId);
    if (!course) return false;

    let progress = this.getProgress();
    const allLessonIds = [];
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        allLessonIds.push(l.id);
      });
    });

    if (stats.isCompleted) {
      progress = progress.filter(p => !(p.userId === userId && allLessonIds.includes(p.lessonId)));
      localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(progress));

      if (this.supabase) {
        await this.supabase
          .from('rumbopro_progress')
          .delete()
          .eq('user_id', userId)
          .eq('course_id', courseId);
      }
    } else {
      const newItems = [];
      allLessonIds.forEach(lId => {
        if (!progress.some(p => p.userId === userId && p.lessonId === lId)) {
          progress.push({ userId, courseId, lessonId: lId, completedAt: new Date().toISOString() });
          newItems.push({ user_id: userId, course_id: courseId, lesson_id: lId });
        }
      });
      localStorage.setItem(DB_KEY_PROGRESS, JSON.stringify(progress));

      if (this.supabase && newItems.length > 0) {
        await this.supabase.from('rumbopro_progress').insert(newItems);
      }
    }
    return !stats.isCompleted;
  }

  getOverallStats(userId) {
    const courses = this.getUserCourses(userId);
    const totalCourses = courses.length;
    let completedCourses = 0;
    courses.forEach(c => {
      const stats = this.getCourseStats(userId, c.id);
      if (stats.isCompleted) completedCourses++;
    });
    const percentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    const certs = this.getCertificates().filter(c => c.userId === userId);
    return {
      totalCourses,
      completedCourses,
      percentage,
      totalCertificates: certs.length
    };
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
    const completedCount = progress.filter(p => p.userId === userId && allLessonIds.includes(p.lessonId)).length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCompleted = percentage === 100 && totalLessons > 0;

    return { totalLessons, completedLessons: completedCount, percentage, isCompleted };
  }

  // --- CERTIFICATES ENGINE ---
  getCertificates() {
    return JSON.parse(localStorage.getItem(DB_KEY_CERTIFICATES) || '[]');
  }

  async generateCertificate(userId, courseId) {
    const stats = this.getCourseStats(userId, courseId);
    if (!stats.isCompleted) {
      throw new Error('El curso debe estar al 100% completado para emitir el certificado.');
    }
    const certs = this.getCertificates();
    const existing = certs.find(c => c.userId === userId && c.courseId === courseId);
    if (existing) return existing;

    const user = this.getUsers().find(u => u.id === userId);
    const course = this.getCourses().find(c => c.id === courseId);
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCert = {
      id: 'RP-CERT-' + randomHash,
      userId,
      userName: user.firstName + ' ' + user.lastName,
      courseId,
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      signature: 'Pablo Xavier',
      directorTitle: 'Director & Fundador de RUMBO PRO'
    };

    certs.push(newCert);
    localStorage.setItem(DB_KEY_CERTIFICATES, JSON.stringify(certs));

    if (this.supabase) {
      await this.supabase.from('rumbopro_certificates').insert([{
        id: newCert.id,
        user_id: newCert.userId,
        user_name: newCert.userName,
        course_id: newCert.courseId,
        course_title: newCert.courseTitle,
        issue_date: newCert.issueDate,
        signature: newCert.signature,
        director_title: newCert.directorTitle
      }]);
    }

    return newCert;
  }

  verifyCertificate(code) {
    const certs = this.getCertificates();
    return certs.find(c => c.id === code.trim().toUpperCase()) || null;
  }
}

// Global Singleton Instance
window.rumboDB = new RumboProDB();
