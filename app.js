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
  // 6. INTERACTIVE BUSINESS QUIZ ENGINE
  // ==========================================================================
  const quizContainer = document.getElementById('quiz-interactive-body');
  const quizProgressBar = document.getElementById('quiz-progress-bar');

  if (quizContainer && quizProgressBar) {
    let currentStep = 0;
    const answers = {};

    const questions = [
      {
        title: 'Pregunta 1 de 3: ¿Cuánto tiempo tienes disponible al día?',
        desc: 'Selecciona tu disponibilidad real para aprender y aplicar.',
        options: [
          { icon: '⏰', text: '1 hora al día (después de mi trabajo o estudio)', value: 'time_low' },
          { icon: '⏳', text: '2 a 4 horas al día (dedicación media enfocada)', value: 'time_mid' },
          { icon: '🚀', text: 'Más de 4 horas / Tiempo completo', value: 'time_high' }
        ]
      },
      {
        title: 'Pregunta 2 de 3: ¿Con cuánto presupuesto quieres arrancar?',
        desc: 'Todos los caminos se pueden iniciar sin deudas ni gastos innecesarios.',
        options: [
          { icon: '💸', text: '$0 USD — Quiero arrancar 100% en orgánico sin gastar', value: 'budget_zero' },
          { icon: '💵', text: '$30 a $80 USD — Dispuesto a invertir en herramientas mínimas', value: 'budget_low' },
          { icon: '💳', text: '$150+ USD — Quiero montar una estructura con tienda propia', value: 'budget_mid' }
        ]
      },
      {
        title: 'Pregunta 3 de 3: ¿Qué estilo de trabajo prefieres?',
        desc: 'Elige la forma en la que te sientes más cómodo generando ingresos.',
        options: [
          { icon: '🎯', text: 'Conversar por chat / notas de voz y cerrar ventas de alto valor', value: 'closer' },
          { icon: '🔥', text: 'Crear videos virales sin mostrar mi cara (cuentas temáticas en TikTok)', value: 'hotmart' },
          { icon: '🛒', text: 'Vender productos físicos en tendencia con mi propia tienda online', value: 'ecom' },
          { icon: '📱', text: 'Manejar redes y crear contenido con Inteligencia Artificial para negocios', value: 'cm' }
        ]
      }
    ];

    const results = {
      hotmart: {
        badge: '🎯 TU CAMINO RECOMENDADO',
        title: '🔥 Hotmart (Método Fukuda)',
        desc: 'El modelo ideal para empezar sin mostrar tu cara y sin inventario. Aprendes a viralizar clips en TikTok y llevar a las personas directo a tu WhatsApp para generar comisiones en dólares del 60% al 80%.',
        perks: ['💸 Inversión inicial $0', '👤 Formato Faceless (sin mostrar cara)', '📈 Potencial: $300 a $1,200 USD/mes'],
        courseHash: '#/curso/course-hotmart'
      },
      closer: {
        badge: '🎯 TU CAMINO RECOMENDADO',
        title: '🎯 Closer de Ventas de Alto Valor',
        desc: 'La habilidad más demandada por infoproductores y agencias digitales. Aprendes psicología de persuasión ética y cómo cerrar ventas de $500 a $2,000 USD mediante llamadas o WhatsApp cobrando comisiones directas.',
        perks: ['📱 Solo necesitas tu celular', '⚡ Resultados más rápidos en días', '📈 Potencial: $500 a $2,500 USD/mes'],
        courseHash: '#/curso/course-closer'
      },
      ecom: {
        badge: '🎯 TU CAMINO RECOMENDADO',
        title: '🛒 E-Commerce & Dropshipping',
        desc: 'Crea tu propia tienda online profesional y vende productos ganadores a nivel nacional o internacional sin comprar stock por adelantado mediante TikTok Orgánico.',
        perks: ['📦 Sin inventario previo', '🌐 Tienda escalable 24/7', '📈 Potencial: $600 a $3,000 USD/mes'],
        courseHash: '#/curso/course-ecommerce'
      },
      cm: {
        badge: '🎯 TU CAMINO RECOMENDADO',
        title: '📱 Community Manager & Agencia de IA',
        desc: 'Ofrece el servicio digital que todo negocio local necesita: gestión de redes, calendarios con ChatGPT y edición de Reels con CapCut cobrando cuotas mensuales fijas.',
        perks: ['🏢 Clientes recurrentes cada mes', '🤖 80% automatizado con IA', '📈 Potencial: $400 a $1,800 USD/mes'],
        courseHash: '#/curso/course-cm'
      }
    };

    function renderQuizStep() {
      if (currentStep < questions.length) {
        const q = questions[currentStep];
        quizProgressBar.style.width = `${((currentStep + 1) / questions.length) * 100}%`;

        quizContainer.innerHTML = `
          <div class="quiz-step-title">${q.title}</div>
          <p class="quiz-step-desc">${q.desc}</p>
          <div class="quiz-options-grid">
            ${q.options.map((opt, idx) => `
              <button class="quiz-opt-btn" onclick="handleQuizAnswer(${currentStep}, '${opt.value}')">
                <span class="quiz-opt-icon">${opt.icon}</span>
                <span>${opt.text}</span>
              </button>
            `).join('')}
          </div>
        `;
      } else {
        // Calculate recommendation based on answers
        quizProgressBar.style.width = '100%';
        let targetKey = answers[2] || 'hotmart';
        if (answers[1] === 'budget_zero' && targetKey === 'ecom') {
          targetKey = 'hotmart';
        }

        const res = results[targetKey] || results.hotmart;

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

    window.handleQuizAnswer = (step, val) => {
      answers[step] = val;
      currentStep++;
      renderQuizStep();
    };

    window.resetQuiz = () => {
      currentStep = 0;
      renderQuizStep();
    };

    // Initial Render of Quiz
    renderQuizStep();
  }
});
