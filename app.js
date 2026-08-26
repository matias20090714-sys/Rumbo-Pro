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
});

// Interactive Diagnostic Quiz Global Logic
const userQuizAnswers = {};

window.handleQuizAnswer = function(step, answerKey) {
  userQuizAnswers[`step_${step}`] = answerKey;

  const currentStepEl = document.getElementById(`quiz-step-${step}`);
  if (currentStepEl) currentStepEl.style.display = 'none';

  if (step < 3) {
    const nextStepEl = document.getElementById(`quiz-step-${step + 1}`);
    if (nextStepEl) {
      nextStepEl.style.display = 'block';
      nextStepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } else {
    // Show Calculated Result
    const resultView = document.getElementById('quiz-result-view');
    const resultTitle = document.getElementById('quiz-result-title');
    const resultDesc = document.getElementById('quiz-result-desc');

    let title = 'Marketing de Afiliados + Closer de Ventas';
    let desc = 'Tu perfil es perfecto para monetizar recomendando formaciones con guiones listos y cerrando ventas por WhatsApp para generar de $87 a $174+ USD por día.';

    if (userQuizAnswers.step_2 === 'style_store') {
      title = 'E-Commerce & Dropshipping con TikTok';
      desc = 'Tu ruta ideal es crear y gestionar tiendas online sin stock físico, aprovechando la viralidad orgánica de TikTok para vender productos.';
    } else if (userQuizAnswers.step_2 === 'style_anon') {
      title = 'Marketing de Afiliados (Marca Incógnita) + Hotmart';
      desc = 'Ideal para ganar comisiones altas ($87 USD por venta) creando cuentas de contenido temático sin mostrar tu cara ni tu voz.';
    } else if (userQuizAnswers.step_2 === 'style_talk') {
      title = 'Closer de Ventas Profesional Remoto';
      desc = 'Tu habilidad de comunicación te permitirá cerrar llamadas y prospectos de alto valor para agencias cobrando comisiones de $100 a $500 USD por cliente.';
    }

    if (resultTitle) resultTitle.textContent = title;
    if (resultDesc) resultDesc.textContent = desc;

    if (resultView) {
      resultView.style.display = 'block';
      resultView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};

window.restartQuiz = function() {
  document.getElementById('quiz-step-1').style.display = 'block';
  document.getElementById('quiz-step-2').style.display = 'none';
  document.getElementById('quiz-step-3').style.display = 'none';
  document.getElementById('quiz-result-view').style.display = 'none';
};

