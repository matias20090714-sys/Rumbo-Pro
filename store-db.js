/* ==========================================================================
   RUMBO PRO — LOCAL DATABASE & STATE ENGINE (store-db.js)
   ========================================================================== */

const DB_KEY_USERS = 'rumbopro_db_users';
const DB_KEY_COURSES = 'rumbopro_db_courses';
const DB_KEY_PROGRESS = 'rumbopro_db_progress';
const DB_KEY_CERTIFICATES = 'rumbopro_db_certificates';
const DB_KEY_USER_COURSES = 'rumbopro_db_user_courses';
const DB_KEY_SESSION = 'rumbopro_db_session';

// Course content types:
// 'drive' => Embeds Google Drive folder viewer (students browse files)
// 'page'  => Embeds an external page with open-in-tab fallback
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
        title: 'Modulo 1 — Material del Curso',
        lessons: [
          {
            id: 'les-ecom-101',
            title: 'Contenido completo del curso',
            duration: '',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz#list',
            driveLink: 'https://drive.google.com/drive/folders/1a44KG1tc_PqjUEP4xPmM-NkGURACJGcz',
            content: 'Accede a todos los materiales, videos y recursos del curso de E-Commerce / Dropshipping. Haz clic en cualquier archivo para abrirlo, o usa el boton para abrirlo en Google Drive.'
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
        title: 'Modulo 1 — Material del Curso',
        lessons: [
          {
            id: 'les-afi-101',
            title: 'Contenido completo del curso',
            duration: '',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=104agUfbMBtEr25dVY2gjGRnf9o8OzhXD#list',
            driveLink: 'https://drive.google.com/drive/folders/104agUfbMBtEr25dVY2gjGRnf9o8OzhXD',
            content: 'Accede a todos los materiales, videos y recursos del curso de Marketing de Afiliados. Haz clic en cualquier archivo para abrirlo, o usa el boton para abrirlo en Google Drive.'
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
        title: 'Modulo 1 — Material del Curso',
        lessons: [
          {
            id: 'les-cls-101',
            title: 'Contenido completo del curso',
            duration: '',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d#list',
            driveLink: 'https://drive.google.com/drive/folders/1Lx5_7cC_AaTfWHnddgqYRvs6L8_9cr9d',
            content: 'Accede a todos los materiales, videos y recursos del curso de Closer de Ventas. Haz clic en cualquier archivo para abrirlo, o usa el boton para abrirlo en Google Drive.'
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
        title: 'Modulo 1 — Trabaja en Digital',
        lessons: [
          {
            id: 'les-cm-101',
            title: 'Trabaja en Digital',
            duration: '',
            type: 'page',
            videoUrl: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            driveLink: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            content: 'Formacion sobre como trabajar en el mundo digital.'
          }
        ]
      },
      {
        id: 'mod-cm-2',
        title: 'Modulo 2 — Incognito Pro',
        lessons: [
          {
            id: 'les-cm-201',
            title: 'Incognito Pro',
            duration: '',
            type: 'page',
            videoUrl: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            content: 'Estrategias de contenido anonimo y marca personal.'
          }
        ]
      },
      {
        id: 'mod-cm-3',
        title: 'Modulo 3 — Creador Pro',
        lessons: [
          {
            id: 'les-cm-301',
            title: 'Creador Pro',
            duration: '',
            type: 'page',
            videoUrl: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            content: 'Formacion para creadores de contenido digital y edicion de video.'
          }
        ]
      },
      {
        id: 'mod-cm-4',
        title: 'Modulo 4 — ABC Marketing de Afiliados',
        lessons: [
          {
            id: 'les-cm-401',
            title: 'ABC Marketing de Afiliados',
            duration: '',
            type: 'page',
            videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            content: 'Fundamentos del marketing de afiliados aplicados a redes sociales.'
          }
        ]
      },
      {
        id: 'mod-cm-5',
        title: 'Modulo 5 — Domina la IA',
        lessons: [
          {
            id: 'les-cm-501',
            title: 'Domina la IA',
            duration: '',
            type: 'page',
            videoUrl: 'https://domina-la-ia-lyc-2026.netlify.app/gracias',
            driveLink: 'https://domina-la-ia-lyc-2026.netlify.app/gracias',
            content: 'Uso de inteligencia artificial para crear contenido y automatizar procesos.'
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
        title: 'Modulo 1 — Material del Curso',
        lessons: [
          {
            id: 'les-hot-101',
            title: 'Contenido completo del curso',
            duration: '',
            type: 'drive',
            videoUrl: 'https://drive.google.com/embeddedfolderview?id=1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV#list',
            driveLink: 'https://drive.google.com/drive/folders/1MjLMShD3uJ_EEMFTEZJ-BwdXeIhYylOV',
            content: 'Accede a todos los materiales, videos y recursos del curso de Hotmart. Haz clic en cualquier archivo para abrirlo, o usa el boton para abrirlo en Google Drive.'
          }
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
    password: 'admin123',
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
    // Force-reset courses to get updated content if schema version changed
    const storedVersion = localStorage.getItem('rumbopro_schema_version');
    const currentVersion = 'v2-real-content';
    if (storedVersion !== currentVersion) {
      localStorage.removeItem(DB_KEY_COURSES);
      localStorage.setItem('rumbopro_schema_version', currentVersion);
    }

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
      throw new Error('El correo electronico ya se encuentra registrado.');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: 'ALUMNO',
      status: 'PENDIENTE',
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

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

  updateUserStatus(userId, newStatus) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
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
      progress.push({ userId, courseId, lessonId, completedAt: new Date().toISOString() });
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
    const completedCount = progress.filter(p => p.userId === userId && allLessonIds.includes(p.lessonId)).length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCompleted = percentage === 100 && totalLessons > 0;

    return { totalLessons, completedLessons: completedCount, percentage, isCompleted };
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
    this.saveCertificates(certs);
    return newCert;
  }

  verifyCertificate(code) {
    const certs = this.getCertificates();
    return certs.find(c => c.id === code.trim().toUpperCase()) || null;
  }
}

// Global Singleton Instance
window.rumboDB = new RumboProDB();
