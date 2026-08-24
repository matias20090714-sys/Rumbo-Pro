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

// Official Courses Definition — 1 direct folder per course (except Community Manager with 5 real modules)
const INITIAL_COURSES = [
  {
    id: 'course-ecommerce',
    title: 'E-COMMERCE / DROPSHIPPING',
    badge: 'FORMACION ONLINE',
    icon: '🛒',
    description: 'Aprende los fundamentos para crear y escalar tu tienda online con TikTok Orgánico y Dropshipping (Formación MRW).',
    active: true,
    modules: [
      {
        id: 'mod-ecom-1',
        title: 'Formación E-Commerce (MRW)',
        lessons: [
          { id: 'les-ecom-1', title: 'Módulo 1: Información básica', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1J2MEV-GlIaeZEn_QVW1L1R4ntdU1pwot#grid', driveLink: 'https://drive.google.com/drive/folders/1J2MEV-GlIaeZEn_QVW1L1R4ntdU1pwot', content: 'Fundamentos y primeros pasos en el modelo de negocio.' },
          { id: 'les-ecom-2', title: 'Módulo 2: Reglas Que Nadie Dice y Son la Clave del Éxito', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1uQC3qPEP0JOj1wI91rXn99pcBij8Uhj3#grid', driveLink: 'https://drive.google.com/drive/folders/1uQC3qPEP0JOj1wI91rXn99pcBij8Uhj3', content: 'Claves estratégicas y errores a evitar.' },
          { id: 'les-ecom-3', title: 'Módulo 3: Cuentas de TikTok Profesionales', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1E6h3AnrPq9bldXVNK0cyu1AvpSTYiiz5#grid', driveLink: 'https://drive.google.com/drive/folders/1E6h3AnrPq9bldXVNK0cyu1AvpSTYiiz5', content: 'Configuración y optimización de cuentas comerciales en TikTok.' },
          { id: 'les-ecom-4', title: 'Módulo 4: Vamos a Grabar ¿Qué Debo Hacer y Cómo', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1be04mhFRooAzTy20b6z147cz0McYBr6M#grid', driveLink: 'https://drive.google.com/drive/folders/1be04mhFRooAzTy20b6z147cz0McYBr6M', content: 'Técnicas de grabación para productos ganadores.' },
          { id: 'les-ecom-5', title: 'Módulo 5: Textos Para los Vídeos', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1oN3IxqWtnCs1-pglJbOGgo-H2Acdj-qy#grid', driveLink: 'https://drive.google.com/drive/folders/1oN3IxqWtnCs1-pglJbOGgo-H2Acdj-qy', content: 'Copywriting y ganchos de alta retención.' },
          { id: 'les-ecom-6', title: 'Módulo 6: Cosas Importantes Antes de Subir el Vídeo', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1WCg-tDgv2DGX0f3CI32ZX1THpxmwFyx8#grid', driveLink: 'https://drive.google.com/drive/folders/1WCg-tDgv2DGX0f3CI32ZX1THpxmwFyx8', content: 'Checklist previo a la publicación.' },
          { id: 'les-ecom-7', title: 'Módulo 7: Instagram Reels (2023)', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1ZiWSok7Zp77vPKpGDs3Y1JIacFX5yq6m#grid', driveLink: 'https://drive.google.com/drive/folders/1ZiWSok7Zp77vPKpGDs3Y1JIacFX5yq6m', content: 'Distribución y viralización en Instagram Reels.' },
          { id: 'les-ecom-8', title: 'Módulo 8: Youtube Shorts (2023)', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1y87SrhidUsmnc0B03pVPbpbgnXBppgGJ#grid', driveLink: 'https://drive.google.com/drive/folders/1y87SrhidUsmnc0B03pVPbpbgnXBppgGJ', content: 'Estrategia de alcance orgánico con YouTube Shorts.' },
          { id: 'les-ecom-9', title: 'Módulo 9: Hacemos Esto Después de Subir un TikTok', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1CjKzWRQ8LfmQT996pm99-cD_na6krOWF#grid', driveLink: 'https://drive.google.com/drive/folders/1CjKzWRQ8LfmQT996pm99-cD_na6krOWF', content: 'Interacción y optimización post-publicación.' },
          { id: 'les-ecom-10', title: 'Módulo 10: El Famoso Shadowban', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1nEucbiGMbbBQXsHCexPiDYqv952h1U51#grid', driveLink: 'https://drive.google.com/drive/folders/1nEucbiGMbbBQXsHCexPiDYqv952h1U51', content: 'Cómo evitar y salir de restricciones de alcance.' },
          { id: 'les-ecom-11', title: 'Módulo 11: Cuándo Debemos de Cambiar o Dejar de Vender un Producto', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1hBhqcePCwGy0qJOvYaRVVOkI-tS20OBi#grid', driveLink: 'https://drive.google.com/drive/folders/1hBhqcePCwGy0qJOvYaRVVOkI-tS20OBi', content: 'Análisis de métricas y ciclo de vida de producto.' },
          { id: 'les-ecom-12', title: 'Módulo 12: Mis Estrategias para Encontrar Productos para TikTok Orgánico', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1lQIWPjrmn_bGAqPmgU2OcW8mT1ARrSgt#grid', driveLink: 'https://drive.google.com/drive/folders/1lQIWPjrmn_bGAqPmgU2OcW8mT1ARrSgt', content: 'Búsqueda e investigación de productos ganadores.' },
          { id: 'les-ecom-13', title: 'Módulo 13: Productos con Envíos 24/48h (Almacén)', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1yo36q5s0oHaGaXwinzHKut9ouYKdgHOS#grid', driveLink: 'https://drive.google.com/drive/folders/1yo36q5s0oHaGaXwinzHKut9ouYKdgHOS', content: 'Logística rápida y almacenes locales.' },
          { id: 'les-ecom-14', title: 'Módulo 14: CJ Dropshipping', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1c4YG5zMUnB3zWz4G7q0Mg-kbLZzqkkgW#grid', driveLink: 'https://drive.google.com/drive/folders/1c4YG5zMUnB3zWz4G7q0Mg-kbLZzqkkgW', content: 'Integración y abastecimiento con CJ Dropshipping.' },
          { id: 'les-ecom-15', title: 'Módulo 15: Creamos Tienda Profesional Paso a Paso', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1-iYgRJUGQ-B0wpCS58Q6m-MjTCeEllud#grid', driveLink: 'https://drive.google.com/drive/folders/1-iYgRJUGQ-B0wpCS58Q6m-MjTCeEllud', content: 'Construcción y diseño de tu tienda online.' },
          { id: 'les-ecom-16', title: 'Módulo 16: Qué Hacemos Cuando Hemos Vendido', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Prf5PzM9U0gPKirBstLNNipnhwrPIMSU#grid', driveLink: 'https://drive.google.com/drive/folders/1Prf5PzM9U0gPKirBstLNNipnhwrPIMSU', content: 'Procesamiento de pedidos y atención al cliente.' },
          { id: 'les-ecom-17', title: 'Módulo 17: Vender en EEUU con TikTok Orgánico', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=10KPDF-tRUtBbuJvBQDGa9DhCqAN_ZedS#grid', driveLink: 'https://drive.google.com/drive/folders/10KPDF-tRUtBbuJvBQDGa9DhCqAN_ZedS', content: 'Escalamiento internacional a mercado estadounidense.' },
          { id: 'les-ecom-18', title: 'Módulo 18: BONUSTRACK', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1FJRUXp_lZ4fjtEvcw-LXCOckaAYkASpO#grid', driveLink: 'https://drive.google.com/drive/folders/1FJRUXp_lZ4fjtEvcw-LXCOckaAYkASpO', content: 'Recursos extra y material complementario.' }
        ]
      }
    ]
  },
  {
    id: 'course-closer',
    title: 'CLOSER DE VENTAS',
    badge: 'FORMACION ONLINE',
    icon: '🎯',
    description: 'Formación profesional en cierre de ventas de alto valor (Universidad del Closer - Tino Mossu).',
    active: true,
    modules: [
      {
        id: 'mod-cls-1',
        title: 'Universidad del Closer',
        lessons: [
          { id: 'les-cls-1', title: '1. Profesionalismo cómo closer', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1vne9Vy_PhL-eFGkn_UuF3iy43sRiqbDk#grid', driveLink: 'https://drive.google.com/drive/folders/1vne9Vy_PhL-eFGkn_UuF3iy43sRiqbDk', content: 'Postura, mentalidad y estándares del closer profesional.' },
          { id: 'les-cls-2', title: '2. El proceso de venta', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1LBx2iJb25fz1x2mQqFj_XqPIde2-Va6B#grid', driveLink: 'https://drive.google.com/drive/folders/1LBx2iJb25fz1x2mQqFj_XqPIde2-Va6B', content: 'Estructura paso a paso de una llamada de venta.' },
          { id: 'les-cls-3', title: '3. Objeciones', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1PU6iKhxeEXBkTZHbtVU2OVhb528HxCmC#grid', driveLink: 'https://drive.google.com/drive/folders/1PU6iKhxeEXBkTZHbtVU2OVhb528HxCmC', content: 'Manejo y resolución de objeciones comunes y complejas.' },
          { id: 'les-cls-4', title: '4. Seguimiento de venta', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1p78c_NFBnViUKG1ILI03wj9NO-KxGajw#grid', driveLink: 'https://drive.google.com/drive/folders/1p78c_NFBnViUKG1ILI03wj9NO-KxGajw', content: 'Estrategias de follow-up efectivo sin ser invasivo.' },
          { id: 'les-cls-5', title: '5. Venta por Whatsapp', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1ATsXsI5_X473nYMkD6nZWVEEg_zv_BWr#grid', driveLink: 'https://drive.google.com/drive/folders/1ATsXsI5_X473nYMkD6nZWVEEg_zv_BWr', content: 'Conversación, audio y cierre mediante mensajería directa.' },
          { id: 'les-cls-6', title: '6. Cómo ganar entrevistas con expertos', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1oqjYZnDF8CgSButuwu30NtEKMCwRtiB7#grid', driveLink: 'https://drive.google.com/drive/folders/1oqjYZnDF8CgSButuwu30NtEKMCwRtiB7', content: 'Prospección y acuerdos con creadores e infoproductores.' },
          { id: 'les-cls-7', title: '7. Cómo ser el cerrador numero 1', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1eVlkXVR-x01OsmIrTYvEvUO-3viHGeo0#grid', driveLink: 'https://drive.google.com/drive/folders/1eVlkXVR-x01OsmIrTYvEvUO-3viHGeo0', content: 'Hábitos y técnicas de rendimiento de élite.' },
          { id: 'les-cls-8', title: '8. BONUS: Cómo cerrar en lanzamientos', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1nbAyBJUtWenYemu3h1-IXz0LZUu4PDVv#grid', driveLink: 'https://drive.google.com/drive/folders/1nbAyBJUtWenYemu3h1-IXz0LZUu4PDVv', content: 'Dinámicas de cierre masivo durante eventos y lanzamientos.' }
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
            title: 'Trabaja en Digital',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            driveLink: 'https://trabaja-en-digital-lyc-2026.netlify.app/gracias',
            content: 'Formacion sobre como trabajar en el mundo digital.'
          }
        ]
      },
      {
        id: 'mod-cm-2',
        title: 'Módulo 2 — Incógnito Pro',
        lessons: [
          {
            id: 'les-cm-201',
            title: 'Incógnito Pro',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://incognito-pro-lyc-2026.netlify.app/gracias',
            content: 'Estrategias de contenido anonimo y marca personal.'
          }
        ]
      },
      {
        id: 'mod-cm-3',
        title: 'Módulo 3 — Creador Pro',
        lessons: [
          {
            id: 'les-cm-301',
            title: 'Creador Pro',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            driveLink: 'https://creador-pro-lyc-2026.netlify.app/gracias',
            content: 'Formacion para creadores de contenido digital y edicion de video.'
          }
        ]
      },
      {
        id: 'mod-cm-4',
        title: 'Módulo 4 — ABC Marketing de Afiliados',
        lessons: [
          {
            id: 'les-cm-401',
            title: 'ABC Marketing de Afiliados',
            duration: 'Módulo Web',
            type: 'page',
            videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias',
            content: 'Fundamentos del marketing de afiliados aplicados a redes sociales.'
          }
        ]
      },
      {
        id: 'mod-cm-5',
        title: 'Módulo 5 — Domina la IA',
        lessons: [
          {
            id: 'les-cm-501',
            title: 'Domina la IA',
            duration: 'Módulo Web',
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
    description: 'Ventas de productos digitales con tráfico orgánico (Método Fukuda - Poder Orgánico).',
    active: true,
    modules: [
      {
        id: 'mod-hot-1',
        title: 'Método Fukuda - Poder Orgánico',
        lessons: [
          { id: 'les-hot-1', title: '1. BIENVENIDOS', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1h6x4D_k_uhCVFBPjVxfL3G6pTLoLLljn#grid', driveLink: 'https://drive.google.com/drive/folders/1h6x4D_k_uhCVFBPjVxfL3G6pTLoLLljn', content: 'Bienvenida y orientación general del curso.' },
          { id: 'les-hot-2', title: '2. GRUPOS PRIVADOS', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1le0KS8R7rb02YW2DoPBjvksvS-9OQ0Y5#grid', driveLink: 'https://drive.google.com/drive/folders/1le0KS8R7rb02YW2DoPBjvksvS-9OQ0Y5', content: 'Comunidades y canales de soporte.' },
          { id: 'les-hot-3', title: '3. CONOCE TU PLATAFORMA', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1fiZKgrTeoZiSapWj-DJagfciLcpmTMXj#grid', driveLink: 'https://drive.google.com/drive/folders/1fiZKgrTeoZiSapWj-DJagfciLcpmTMXj', content: 'Manejo y configuración de Hotmart.' },
          { id: 'les-hot-4', title: '4. TUS HERRAMIENTAS', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1kUHGLMarw0RVHFs6ETgOWRBhI4oNBj1I#grid', driveLink: 'https://drive.google.com/drive/folders/1kUHGLMarw0RVHFs6ETgOWRBhI4oNBj1I', content: 'Recursos y software para operar.' },
          { id: 'les-hot-5', title: '5. INTRODUCCION AL TRAFICO ORGANICO', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1b4n_B-g1u02HkIE5KvwsPnNtAY_r2Qj4#grid', driveLink: 'https://drive.google.com/drive/folders/1b4n_B-g1u02HkIE5KvwsPnNtAY_r2Qj4', content: 'Atracción de prospectos sin pagar publicidad.' },
          { id: 'les-hot-6', title: '6. GATILLOS MENTALES Y COPYWRITING', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1IleRz3YJzFxrhXOaoLYk5m9a83htOLfc#grid', driveLink: 'https://drive.google.com/drive/folders/1IleRz3YJzFxrhXOaoLYk5m9a83htOLfc', content: 'Persuasión escrita y disparadores psicológicos.' },
          { id: 'les-hot-7', title: '7. VENTAS LOW TICKET', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1KYJ1eMfEY6pyH1Uzqm7ThVg0cevrGHg_#grid', driveLink: 'https://drive.google.com/drive/folders/1KYJ1eMfEY6pyH1Uzqm7ThVg0cevrGHg_', content: 'Estrategias para comercializar productos de bajo costo.' },
          { id: 'les-hot-8', title: '8. NICHO DEL DINERO $ - High Ticket', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1CFvoiX9DqKe9k3BxzAb4rMuJzKn5jyXU#grid', driveLink: 'https://drive.google.com/drive/folders/1CFvoiX9DqKe9k3BxzAb4rMuJzKn5jyXU', content: 'Ofertas de alto valor en el sector de negocios y dinero.' },
          { id: 'les-hot-9', title: '9. CASO DE ESTUDIO HIGH TICKET', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1-CL8tXBqBDhSHq_D_gQKwTFnjUBSU6sc#grid', driveLink: 'https://drive.google.com/drive/folders/1-CL8tXBqBDhSHq_D_gQKwTFnjUBSU6sc', content: 'Desglose práctico de ventas de alto valor.' },
          { id: 'les-hot-10', title: '10. CREACION DE COMUNIDAD', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1iNrFwIxpyfB8qsU-vlh1-x0pSxp40HWU#grid', driveLink: 'https://drive.google.com/drive/folders/1iNrFwIxpyfB8qsU-vlh1-x0pSxp40HWU', content: 'Construcción y nutrición de audiencias leales.' },
          { id: 'les-hot-11', title: '11. LANZAMIENTOS ORGÁNICOS', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1JZbTe4U0zrn8bYFFyveVZSuX6Y7DixxT#grid', driveLink: 'https://drive.google.com/drive/folders/1JZbTe4U0zrn8bYFFyveVZSuX6Y7DixxT', content: 'Fórmula de lanzamiento paso a paso.' },
          { id: 'les-hot-12', title: '12. BONO - FACEBOOK MASTERS', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=13KJI7z4DLbk1yWbXHgZwwqkXuz8JZjNG#grid', driveLink: 'https://drive.google.com/drive/folders/13KJI7z4DLbk1yWbXHgZwwqkXuz8JZjNG', content: 'Técnicas avanzadas en grupos y perfiles de Facebook.' },
          { id: 'les-hot-13', title: '13. BONO ESPECIAL - REPOTENCIA TUS CUENTAS DE INSTAGRAM', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Ayy6mIwVXMtM2cvWCqXmn41BTMN-5un0#grid', driveLink: 'https://drive.google.com/drive/folders/1Ayy6mIwVXMtM2cvWCqXmn41BTMN-5un0', content: 'Crecimiento orgánico acelerado en Instagram.' },
          { id: 'les-hot-14', title: '14. BONO ESPECIAL - VENTAS POR YOUTUBE', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1Tibw2wZyg-ICXsrbf9wUymslmQ6Sjcm_#grid', driveLink: 'https://drive.google.com/drive/folders/1Tibw2wZyg-ICXsrbf9wUymslmQ6Sjcm_', content: 'Conversión de suscriptores y visualizaciones en ventas.' },
          { id: 'les-hot-15', title: '15. BONO ESPECIAL - DISEÑO PUBLICITARIO PROFESIONAL', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=1I5idERzuKuD8LpPQR12b1htmZpF8iSzJ#grid', driveLink: 'https://drive.google.com/drive/folders/1I5idERzuKuD8LpPQR12b1htmZpF8iSzJ', content: 'Creativos y piezas gráficas de alto impacto.' },
          { id: 'les-hot-16', title: '16. CLASES EN VIVO', duration: 'Clase en Video', type: 'drive', videoUrl: 'https://drive.google.com/embeddedfolderview?id=18-b8cTfWg_EvknhVcvFrcbxmNXzpGiFE#grid', driveLink: 'https://drive.google.com/drive/folders/18-b8cTfWg_EvknhVcvFrcbxmNXzpGiFE', content: 'Sesiones de preguntas, respuestas y análisis en vivo.' }
        ]
      }
    ]
  },
  {
    id: 'course-affiliate',
    title: 'MARKETING DE AFILIADOS & ESTRATEGIA',
    badge: 'FORMACION ONLINE',
    icon: '💰',
    description: 'Aprende a crear tu marca, atraer prospectos con contenido orgánico, cerrar ventas por WhatsApp y generar 90% de comisión por venta.',
    active: true,
    modules: [
      {
        id: 'mod-aff-1',
        title: 'Programa y Manual del Afiliado',
        lessons: [
          { id: 'les-aff-1', title: '01. Introducción y el Proceso de 8 Pasos', duration: 'Lectura y Estrategia', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Cómo crear tu marca, atraer personas, vender y generar comisiones desde tu celular.' },
          { id: 'les-aff-2', title: '02. ¿Cómo Gana Dinero un Afiliado?', duration: 'Modelo de Negocio', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'El modelo de recomendación, ventas y comisiones fijas ($87 USD / 3.900 UYU).' },
          { id: 'les-aff-3', title: '03. No seas "un afiliado", crea tu propia marca', duration: 'Marca Personal', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Construir confianza y autoridad para que las personas quieran aprender contigo.' },
          { id: 'les-aff-4', title: '04. Elige tu Rol o Especialidad', duration: 'Especialización', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Cómo posicionarte en Ecommerce, Ventas, Redes Sociales o IA.' },
          { id: 'les-aff-5', title: '05. Cómo Crear Contenido que Atraiga Personas', duration: 'Contenido Orgánico', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Estructura de videos, ganchos de alta retención y llamados a la acción efectivos.' },
          { id: 'les-aff-6', title: '06. Cómo Llevar Personas a WhatsApp', duration: 'Conversión', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Enlace en biografía, historias magnéticas y respuestas automáticas.' },
          { id: 'les-aff-7', title: '07. Qué Responder Cuando te Escriben', duration: 'Cierre de Ventas', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Estructura de conversación, notas de voz persuasivas y manejo de objeciones.' },
          { id: 'les-aff-8', title: '08. Cómo Presentar Rumbo Pro de Forma Correcta', duration: 'Presentación', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Transmitir el valor real de la academia sin presionar y enviar tu enlace de afiliado.' },
          { id: 'les-aff-9', title: '09. Errores Comunes que Debes Evitar', duration: 'Optimización', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Los 7 errores frecuentes que frenan las ventas de un afiliado novato.' },
          { id: 'les-aff-10', title: '10. La Mentalidad del Afiliado Pro y Hitos de Ventas', duration: 'Mentalidad y Logros', type: 'page', videoUrl: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', driveLink: 'https://abc-marketing-de-afiliados-lyc-2026.netlify.app/gracias', content: 'Constancia, disciplina diaria y cómo escalar de Rookie a Legend con 90% de comisión.' }
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
    const CURRENT_VERSION = 'v12-affiliate-protected';
    if (localStorage.getItem('rumbopro_folders_version') !== CURRENT_VERSION) {
      localStorage.setItem(DB_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
      localStorage.setItem('rumbopro_folders_version', CURRENT_VERSION);
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
          status: u.status || 'PENDIENTE',
          referredBy: u.referred_by || u.referredBy || null,
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

  recordAffiliateClick(affiliateId) {
    if (!affiliateId) return;
    const clicks = JSON.parse(localStorage.getItem('rumbopro_db_affiliate_clicks') || '{}');
    clicks[affiliateId] = (clicks[affiliateId] || 0) + 1;
    localStorage.setItem('rumbopro_db_affiliate_clicks', JSON.stringify(clicks));
  }

  getAffiliateStats(userId) {
    const users = this.getUsers();
    const clicksObj = JSON.parse(localStorage.getItem('rumbopro_db_affiliate_clicks') || '{}');
    const totalClicks = clicksObj[userId] || 0;

    // Find all users referred by this user
    const referrals = users.filter(u => u.referredBy === userId || u.referred_by === userId);
    const approvedSales = referrals.filter(u => u.status === 'APROBADO');
    const pendingSales = referrals.filter(u => u.status === 'PENDIENTE');

    const salesCount = approvedSales.length;
    const RUMBOPRO_PRICE_USD = 97; // Precio oficial: 3.900 UYU (~$97 USD)
    const COMMISSION_PER_SALE = 87; // 90% de comisión ($87 USD por venta)
    const totalEarnedUsd = salesCount * COMMISSION_PER_SALE;

    // Affiliate Ranks (Sales Milestones Tracking — 90% Commission & Full Platform Access for All)
    let tier = {
      id: 'tier-rookie',
      name: 'Rango Rookie',
      icon: '🥉',
      badgeClass: 'tier-bronze',
      commissionRate: '90% ($87 USD/venta)',
      salesNeededForNext: 3,
      nextTierName: 'Rango Pro (3 ventas)',
      progressPercentage: Math.min(100, Math.round((salesCount / 3) * 100)),
      salesRange: '0 a 2 ventas',
      tagline: 'Fase Inicial de Afiliado'
    };

    if (salesCount >= 25) {
      tier = {
        id: 'tier-legend',
        name: 'Rango Legend',
        icon: '💎',
        badgeClass: 'tier-diamond',
        commissionRate: '90% ($87 USD/venta)',
        salesNeededForNext: 0,
        nextTierName: 'Hito Máximo Alcanzado 🏆',
        progressPercentage: 100,
        salesRange: '25+ ventas',
        tagline: 'Afiliado Referente'
      };
    } else if (salesCount >= 10) {
      tier = {
        id: 'tier-master',
        name: 'Rango Master',
        icon: '🥇',
        badgeClass: 'tier-gold',
        commissionRate: '90% ($87 USD/venta)',
        salesNeededForNext: 25,
        nextTierName: 'Rango Legend (25 ventas)',
        progressPercentage: Math.min(100, Math.round(((salesCount - 10) / 15) * 100)),
        salesRange: '10 a 24 ventas',
        tagline: 'Afiliado Avanzado'
      };
    } else if (salesCount >= 3) {
      tier = {
        id: 'tier-pro',
        name: 'Rango Pro',
        icon: '🥈',
        badgeClass: 'tier-silver',
        commissionRate: '90% ($87 USD/venta)',
        salesNeededForNext: 10,
        nextTierName: 'Rango Master (10 ventas)',
        progressPercentage: Math.min(100, Math.round(((salesCount - 3) / 7) * 100)),
        salesRange: '3 a 9 ventas',
        tagline: 'Afiliado Activo'
      };
    }

    return {
      clicks: totalClicks,
      referralsCount: referrals.length,
      salesCount: salesCount,
      pendingCount: pendingSales.length,
      totalEarnedUsd: totalEarnedUsd,
      priceUsd: RUMBOPRO_PRICE_USD,
      commissionPerSale: COMMISSION_PER_SALE,
      tier: tier,
      referralsList: referrals
    };
  }

  getTopAffiliatesLeaderboard(limit = 10) {
    const allUsers = this.getUsers();
    const affiliates = allUsers.filter(u => u.role !== 'ADMINISTRADOR');
    const clicksObj = JSON.parse(localStorage.getItem('rumbopro_db_affiliate_clicks') || '{}');

    const leaderboard = affiliates.map(u => {
      const referrals = allUsers.filter(ref => ref.referredBy === u.id || ref.referred_by === u.id);
      const approvedSales = referrals.filter(ref => ref.status === 'APROBADO');
      const pendingSales = referrals.filter(ref => ref.status === 'PENDIENTE');
      const salesCount = approvedSales.length;
      const totalEarnedUsd = salesCount * 87;
      const totalVolumeUsd = salesCount * 97;
      const clicks = clicksObj[u.id] || 0;

      let tierName = '🥉 Rookie';
      let tierBadge = 'tier-bronze';
      if (salesCount >= 25) {
        tierName = '💎 Legend';
        tierBadge = 'tier-diamond';
      } else if (salesCount >= 10) {
        tierName = '🥇 Master';
        tierBadge = 'tier-gold';
      } else if (salesCount >= 3) {
        tierName = '🥈 Pro';
        tierBadge = 'tier-silver';
      }

      return {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        salesCount: salesCount,
        pendingCount: pendingSales.length,
        totalReferrals: referrals.length,
        clicks: clicks,
        totalEarnedUsd: totalEarnedUsd,
        totalVolumeUsd: totalVolumeUsd,
        tierName: tierName,
        tierBadge: tierBadge,
        registeredAt: u.registeredAt
      };
    });

    leaderboard.sort((a, b) => {
      if (b.salesCount !== a.salesCount) return b.salesCount - a.salesCount;
      if (b.totalReferrals !== a.totalReferrals) return b.totalReferrals - a.totalReferrals;
      return b.clicks - a.clicks;
    });

    return leaderboard.slice(0, limit);
  }

  async registerUser(userData) {
    if (!this.supabase) this.initSupabaseClient();

    const cleanEmail = userData.email.trim().toLowerCase();
    const refCode = userData.referredBy || localStorage.getItem('rumbopro_ref_code') || null;

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
      try {
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
      } catch (err) {
        if (err.message && err.message.includes('ya se encuentra')) throw err;
      }
    }

    // 2. Local Cache Update with referral attribution
    const users = this.getUsers();
    users.push({
      id: newUser.id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      status: newUser.status,
      referredBy: refCode,
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

    const session = {
      userId: user.id,
      loginAt: new Date().toISOString(),
      sessionId: 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9)
    };
    localStorage.setItem(DB_KEY_SESSION, JSON.stringify(session));
    return user;
  }

  getCurrentSession() {
    return JSON.parse(localStorage.getItem(DB_KEY_SESSION) || 'null');
  }

  getCurrentUser() {
    const session = this.getCurrentSession();
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
    return INITIAL_COURSES;
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

    const user = this.getUsers().find(u => u.id === userId) || this.getCurrentUser() || {};
    const course = this.getCourses().find(c => c.id === courseId) || {};
    
    let studentName = '';
    if (user.firstName || user.first_name) {
      studentName = `${user.firstName || user.first_name} ${user.lastName || user.last_name || ''}`.trim();
    } else if (user.email) {
      studentName = user.email.split('@')[0];
    } else {
      studentName = 'Estudiante RUMBO PRO';
    }

    const courseTitle = course.title || 'Formación Profesional RUMBO PRO';
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const formattedDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

    const newCert = {
      id: 'RP-CERT-' + randomHash,
      userId: userId || user.id || 'user-default',
      userName: studentName,
      courseId: courseId,
      courseTitle: courseTitle,
      issueDate: formattedDate,
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
