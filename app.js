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
});
