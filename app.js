/* ==========================================================================
   RUMBO PRO — INTERACTIVE APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Interactive Afiliados Calculator (90% Comisión)
  const calcPriceInput = document.getElementById('calc-price');
  const calcSalesInput = document.getElementById('calc-sales');
  const calcResultAmount = document.getElementById('calc-result-amount');

  function calculateCommission() {
    if (!calcPriceInput || !calcSalesInput || !calcResultAmount) return;

    let price = parseFloat(calcPriceInput.value) || 0;
    let sales = parseInt(calcSalesInput.value) || 0;

    // Safety checks
    if (price < 0) price = 0;
    if (sales < 0) sales = 0;

    // Calculation formula: PRECIO × VENTAS × 90%
    const totalCommission = price * sales * 0.90;

    // Format output as currency in US Dollars (US$)
    const formattedNumber = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(totalCommission);

    calcResultAmount.textContent = `US$ ${formattedNumber}`;
  }

  if (calcPriceInput && calcSalesInput) {
    calcPriceInput.addEventListener('input', calculateCommission);
    calcSalesInput.addEventListener('input', calculateCommission);
    
    // Initial calculation trigger
    calculateCommission();
  }

  // 3. Smooth scroll handling for internal anchor triggers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 4. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');
        // Close other open FAQs
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('faq-open');
        });
        item.classList.toggle('faq-open', !isOpen);
      });
    }
  });

  // 5. Live Social Proof Toast Ticker
  const toastEl = document.getElementById('social-proof-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastText = document.getElementById('toast-text');

  const notifications = [
    { name: 'Lucas de Argentina 🇦🇷', action: 'Comenzó el curso de E-Commerce' },
    { name: 'Camila de Uruguay 🇺🇾', action: 'Completó el curso de Closer de Ventas' },
    { name: 'Mateo de Chile 🇨🇱', action: 'Accedió al Método Fukuda de Hotmart' },
    { name: 'Valentina de Colombia 🇨🇴', action: 'Obtuvo su Certificado Oficial' },
    { name: 'Agustín de México 🇲🇽', action: 'Se unió a la comunidad de Rumbo Pro' }
  ];

  let notifIdx = 0;
  function showNextNotification() {
    if (!toastEl || !toastTitle || !toastText) return;
    const notif = notifications[notifIdx];
    toastTitle.textContent = notif.name;
    toastText.textContent = notif.action;
    toastEl.classList.add('toast-active');

    setTimeout(() => {
      toastEl.classList.remove('toast-active');
    }, 4500);

    notifIdx = (notifIdx + 1) % notifications.length;
  }

  // First trigger after 4s, then repeat every 14s
  setTimeout(() => {
    showNextNotification();
    setInterval(showNextNotification, 14000);
  }, 4000);

  // ==========================================================================
  // 6. INTERACTIVE BUSINESS QUIZ ENGINE (7 DEEP DIAGNOSTIC QUESTIONS)
  // ==========================================================================
  const quizContainer = document.getElementById('quiz-interactive-body');
  const quizProgressBar = document.getElementById('quiz-progress-bar');

  if (quizContainer && quizProgressBar) {
    let currentStep = 0;
    const userAnswers = [];

    const questions = [
      {
        title: 'Pregunta 1 de 7: ¿Cuál es tu nivel de experiencia en negocios o ventas por internet?',
        desc: 'Esto nos permite calibrar la curva de aprendizaje ideal para ti.',
        options: [
          { icon: '🐣', text: 'Principiante Total — Nunca he vendido nada por internet y busco algo simple para empezar.', weights: { hotmart: 3, closer: 2, ecom: 1, cm: 1 } },
          { icon: '📱', text: 'Nivel Medio — Ya manejo redes sociales o edición pero aún no genero ingresos constantes.', weights: { hotmart: 2, cm: 3, closer: 2, ecom: 2 } },
          { icon: '💼', text: 'Con Experiencia — He intentado otros modelos y busco una habilidad de alto valor para escalar rápido.', weights: { closer: 3, ecom: 3, cm: 2, hotmart: 1 } }
        ]
      },
      {
        title: 'Pregunta 2 de 7: ¿Cuánto tiempo tienes disponible al día para dedicarle?',
        desc: 'Selecciona tu disponibilidad real para aprender y aplicar las clases.',
        options: [
          { icon: '⏰', text: '1 hora al día (después de mi trabajo o estudio)', weights: { hotmart: 3, closer: 2, cm: 1, ecom: 1 } },
          { icon: '⏳', text: '2 a 4 horas al día (dedicación media enfocada)', weights: { hotmart: 2, closer: 3, cm: 3, ecom: 2 } },
          { icon: '🚀', text: 'Más de 4 horas / Tiempo completo', weights: { ecom: 3, closer: 3, cm: 3, hotmart: 2 } }
        ]
      },
      {
        title: 'Pregunta 3 de 7: ¿Con cuánto presupuesto quieres arrancar tu proyecto?',
        desc: 'Todos los modelos se pueden iniciar sin deudas ni riesgos innecesarios.',
        options: [
          { icon: '💸', text: '$0 USD — Quiero arrancar 100% en orgánico sin gastar en inventario ni anuncios', weights: { hotmart: 4, closer: 3, cm: 2, ecom: -2 } },
          { icon: '💵', text: '$30 a $80 USD — Puedo costear herramientas básicas o dominios web', weights: { cm: 3, hotmart: 2, closer: 2, ecom: 2 } },
          { icon: '💳', text: '$150+ USD — Quiero montar una estructura con tienda propia o marca formal', weights: { ecom: 4, cm: 2, closer: 2, hotmart: 1 } }
        ]
      },
      {
        title: 'Pregunta 4 de 7: ¿Cómo te sientes respecto a salir en cámara y mostrar tu cara?',
        desc: 'Hay modelos 100% anónimos y otros basados en comunicación directa.',
        options: [
          { icon: '🙈', text: 'Prefiero NO mostrar mi cara (Formato Faceless con clips temáticos o servicios técnicos tras bambalinas)', weights: { hotmart: 4, cm: 2, ecom: 3, closer: -1 } },
          { icon: '🎙️', text: 'Me siento cómodo hablando por notas de voz, chat o llamadas uno a uno', weights: { closer: 4, cm: 3, hotmart: 2, ecom: 1 } },
          { icon: '🎬', text: 'No tengo problema en grabarme y ser la voz visible de mis videos', weights: { closer: 3, hotmart: 3, cm: 3, ecom: 2 } }
        ]
      },
      {
        title: 'Pregunta 5 de 7: ¿Qué tipo de actividad disfrutas más o te llama más la atención?',
        desc: 'Elige la forma en la que te sientes más cómodo generando ingresos.',
        options: [
          { icon: '🔥', text: 'Crear videos virales de alta retención en TikTok para ganar comisiones en dólares como afiliado', weights: { hotmart: 5, cm: 1, closer: 1, ecom: 1 } },
          { icon: '🎯', text: 'Conversar con personas, romper objeciones y cerrar ventas de $500 a $2,000 USD por llamada o chat', weights: { closer: 5, hotmart: 1, cm: 1, ecom: 1 } },
          { icon: '🛒', text: 'Buscar productos físicos ganadores y montar una tienda online escalable con Dropshipping', weights: { ecom: 5, cm: 1, hotmart: 1, closer: 1 } },
          { icon: '📱', text: 'Manejar redes sociales y crear calendarios de contenido con Inteligencia Artificial para negocios', weights: { cm: 5, hotmart: 1, closer: 1, ecom: 1 } }
        ]
      },
      {
        title: 'Pregunta 6 de 7: ¿Cuál es tu meta financiera principal para los próximos 90 días?',
        desc: 'Tu objetivo económico define la velocidad y estrategia a seguir.',
        options: [
          { icon: '💵', text: 'Ganar mis primeros $300 a $600 USD extras al mes para tener un alivio económico', weights: { hotmart: 3, cm: 2, closer: 2, ecom: 1 } },
          { icon: '🚀', text: 'Superar los $1,000 - $2,500 USD al mes para vivir 100% de mis ingresos digitales', weights: { closer: 4, ecom: 3, hotmart: 2, cm: 2 } },
          { icon: '🏢', text: 'Crear una cartera fija de 2 a 4 clientes recurrentes que me paguen todos los meses', weights: { cm: 4, closer: 2, ecom: 1, hotmart: 1 } }
        ]
      },
      {
        title: 'Pregunta 7 de 7: ¿Qué dispositivo utilizarás principalmente para formarte y trabajar?',
        desc: 'Toda la plataforma de Rumbo Pro está optimizada para cualquier dispositivo.',
        options: [
          { icon: '📱', text: '100% desde mi teléfono celular (Smartphone Android o iPhone)', weights: { hotmart: 3, closer: 3, cm: 2, ecom: 1 } },
          { icon: '💻', text: 'Computadora / Laptop (o combinación de celular y laptop)', weights: { ecom: 3, cm: 3, closer: 2, hotmart: 2 } }
        ]
      }
    ];

    const results = {
      hotmart: {
        badge: '🎯 TU RUTA RECOMENDADA (COINCIDENCIA 98%)',
        title: '🔥 Hotmart (Método Fukuda)',
        desc: 'El modelo perfecto para iniciar desde cero, sin mostrar tu cara y sin comprar stock. Aprendes a viralizar clips en TikTok y llevar a las personas directo a tu WhatsApp para generar comisiones en dólares del 60% al 80%.',
        perks: ['💸 Inversión inicial $0', '👤 Formato Faceless (sin mostrar cara)', '📱 100% desde tu celular', '📈 Potencial: $300 a $1,200 USD/mes'],
        courseHash: '#/curso/course-hotmart'
      },
      closer: {
        badge: '🎯 TU RUTA RECOMENDADA (COINCIDENCIA 98%)',
        title: '🎯 Closer de Ventas de Alto Valor',
        desc: 'La habilidad mejor pagada y de retorno más rápido. Aprendes psicología de persuasión ética y cómo cerrar ventas de $500 a $2,000 USD mediante llamadas o notas de voz de WhatsApp cobrando comisiones directas del 10% al 20%.',
        perks: ['⚡ Retorno más rápido en días', '🎙️ Solo necesitas WhatsApp', '📈 Potencial: $500 a $2,500 USD/mes', '🏆 Sin crear contenido complejo'],
        courseHash: '#/curso/course-closer'
      },
      ecom: {
        badge: '🎯 TU RUTA RECOMENDADA (COINCIDENCIA 98%)',
        title: '🛒 E-Commerce & Dropshipping',
        desc: 'Crea tu propia tienda online profesional y vende productos ganadores a nivel nacional o internacional sin comprar stock por adelantado mediante TikTok Orgánico y proveedores rápidos.',
        perks: ['📦 Sin inventario previo', '🌐 Tienda vendiendo en piloto automático', '📈 Potencial: $600 a $3,000 USD/mes', '🛍️ Marca propia escalable'],
        courseHash: '#/curso/course-ecommerce'
      },
      cm: {
        badge: '🎯 TU RUTA RECOMENDADA (COINCIDENCIA 98%)',
        title: '📱 Community Manager & Agencia de IA',
        desc: 'Ofrece el servicio digital que todo negocio local necesita con urgencia: gestión de redes, calendarios con ChatGPT y edición de Reels con CapCut cobrando cuotas mensuales fijas de $200 a $500 USD por cliente.',
        perks: ['🏢 Clientes recurrentes cada mes', '🤖 80% automatizado con IA', '📈 Potencial: $400 a $1,800 USD/mes', '💼 Servicios de alta demanda'],
        courseHash: '#/curso/course-cm'
      }
    };

    function renderQuizStep() {
      if (currentStep < questions.length) {
        const q = questions[currentStep];
        quizProgressBar.style.width = `${((currentStep + 1) / questions.length) * 100}%`;

        quizContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-size:0.75rem; color:#38bdf8; font-weight:800; letter-spacing:0.05em;">PASO ${currentStep + 1} DE ${questions.length}</span>
            <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">${Math.round(((currentStep + 1) / questions.length) * 100)}% Completado</span>
          </div>
          <div class="quiz-step-title">${q.title}</div>
          <p class="quiz-step-desc">${q.desc}</p>
          <div class="quiz-options-grid">
            ${q.options.map((opt, idx) => `
              <button class="quiz-opt-btn" onclick="handleQuizAnswer(${currentStep}, ${idx})">
                <span class="quiz-opt-icon">${opt.icon}</span>
                <span>${opt.text}</span>
              </button>
            `).join('')}
          </div>
          ${currentStep > 0 ? `
            <div style="text-align:left; margin-top:1rem;">
              <button class="btn-prev-lesson" onclick="handleQuizBack()" style="padding:0.4rem 0.8rem; font-size:0.8rem; background:transparent; border:1px solid rgba(255,255,255,0.1); color:#94a3b8; border-radius:6px; cursor:pointer;">
                ← Pregunta anterior
              </button>
            </div>
          ` : ''}
        `;
      } else {
        // Calculate smart weighted score
        quizProgressBar.style.width = '100%';
        const finalScores = { hotmart: 0, closer: 0, ecom: 0, cm: 0 };

        userAnswers.forEach((optIdx, qIdx) => {
          const opt = questions[qIdx].options[optIdx];
          if (opt && opt.weights) {
            for (let k in opt.weights) {
              finalScores[k] = (finalScores[k] || 0) + opt.weights[k];
            }
          }
        });

        // Determine winner
        let highestKey = 'hotmart';
        let highestVal = -999;
        for (let k in finalScores) {
          if (finalScores[k] > highestVal) {
            highestVal = finalScores[k];
            highestKey = k;
          }
        }

        const res = results[highestKey] || results.hotmart;

        quizContainer.innerHTML = `
          <div class="quiz-result-card">
            <span class="quiz-result-badge">${res.badge}</span>
            <h3 class="quiz-result-title">${res.title}</h3>
            <p class="quiz-result-desc">${res.desc}</p>
            
            <div class="quiz-result-perks">
              ${res.perks.map(p => `<div class="quiz-perk-item">${p}</div>`).join('')}
            </div>

            <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
              <a href="app-platform.html#/registro" class="btn-primary" style="padding:1rem 2rem; font-size:1rem;">
                EMPEZAR EN RUMBO PRO CON ESTA RUTA 🚀
              </a>
              <button class="btn-secondary" onclick="resetQuiz()" style="padding:0.9rem 1.4rem;">
                🔄 Repetir Test
              </button>
            </div>
          </div>
        `;
      }
    }

    window.handleQuizAnswer = (step, optionIndex) => {
      userAnswers[step] = optionIndex;
      currentStep++;
      renderQuizStep();
    };

    window.handleQuizBack = () => {
      if (currentStep > 0) {
        currentStep--;
        renderQuizStep();
      }
    };

    window.resetQuiz = () => {
      currentStep = 0;
      userAnswers.length = 0;
      renderQuizStep();
    };

    // Initial Render of Quiz
    renderQuizStep();
  }
});
