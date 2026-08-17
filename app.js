/* ==========================================================================
   RUMBO PRO - Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header Scroll Effect ---
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(3, 7, 18, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(3, 7, 18, 0.75)';
            header.style.boxShadow = 'none';
        }
    });

    // --- 2. Mobile Drawer Navigation ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function toggleDrawer() {
        hamburgerBtn.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        drawerOverlay.classList.toggle('active');
        document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', toggleDrawer);
    drawerCloseBtn.addEventListener('click', toggleDrawer);
    drawerOverlay.addEventListener('click', toggleDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('active')) {
                toggleDrawer();
            }
        });
    });

    // --- 3. Catalog Search and Filters ---
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const filterTags = document.querySelectorAll('.filter-tag');
    const catalogCards = document.querySelectorAll('.catalog-card');
    let activeFilter = 'all';

    // Search input handler
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        applyFilters();
    });

    // Clear search handler
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        applyFilters();
    });

    // Filter tags handler
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            activeFilter = tag.getAttribute('data-filter');
            applyFilters();
        });
    });

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();

        catalogCards.forEach(card => {
            // Ignore the last "Expandable Extra" card in basic filtering, just hide it if a filter or search query is active
            if (card.classList.contains('extra-card')) {
                if (activeFilter !== 'all' || query.length > 0) {
                    card.classList.add('is-hidden');
                } else {
                    card.classList.remove('is-hidden');
                }
                return;
            }

            const tagsStr = card.getAttribute('data-tags') || '';
            const tags = tagsStr.split(',');
            const cardName = card.getAttribute('data-name') || '';
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardDesc = card.querySelector('.card-description').textContent.toLowerCase();

            // Match query
            const matchesQuery = query.length === 0 || 
                                 cardTitle.includes(query) || 
                                 cardDesc.includes(query) || 
                                 cardName.includes(query);

            // Match filter
            const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

            if (matchesQuery && matchesFilter) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    // --- 4. Interactive Calculators Logic ---
    const calcTabBtns = document.querySelectorAll('.calc-tab-btn');
    const calcPanels = document.querySelectorAll('.calc-panel');

    // Calculator tabs toggle
    calcTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            calcTabBtns.forEach(b => b.classList.remove('active'));
            calcPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetCalcId = 'calc-' + btn.getAttribute('data-calc');
            document.getElementById(targetCalcId).classList.add('active');
        });
    });

    // Inputs listeners for auto-calculation
    // Affiliate inputs
    const afPrice = document.getElementById('af-price');
    const afSales = document.getElementById('af-sales');
    if(afPrice && afSales) {
        afPrice.addEventListener('input', calculateAffiliate);
        afSales.addEventListener('input', calculateAffiliate);
    }

    // Closer inputs
    const clComision = document.getElementById('cl-comision');
    const clCloses = document.getElementById('cl-closes');
    if(clComision && clCloses) {
        clComision.addEventListener('input', calculateCloser);
        clCloses.addEventListener('input', calculateCloser);
    }

    // Community Manager inputs
    const cmRate = document.getElementById('cm-rate');
    const cmClients = document.getElementById('cm-clients');
    if(cmRate && cmClients) {
        cmRate.addEventListener('input', calculateCommunity);
        cmClients.addEventListener('input', calculateCommunity);
    }

    // E-commerce inputs
    const ecMargin = document.getElementById('ec-margin');
    const ecSales = document.getElementById('ec-sales');
    if(ecMargin && ecSales) {
        ecMargin.addEventListener('input', calculateEcommerce);
        ecSales.addEventListener('input', calculateEcommerce);
    }

    // Services inputs
    const svPrice = document.getElementById('sv-price');
    const svClients = document.getElementById('sv-clients');
    if(svPrice && svClients) {
        svPrice.addEventListener('input', calculateServices);
        svClients.addEventListener('input', calculateServices);
    }

    // Contenido inputs
    const coType = document.getElementById('co-type');
    const coUnit = document.getElementById('co-unit');
    const coQty = document.getElementById('co-qty');
    if(coType && coUnit && coQty) {
        coType.addEventListener('change', handleContenidoScenarioChange);
        coUnit.addEventListener('input', calculateContenido);
        coQty.addEventListener('input', calculateContenido);
    }

    // Initialize all calculations
    calculateAffiliate();
    calculateCloser();
    calculateCommunity();
    calculateEcommerce();
    calculateServices();
    calculateContenido();

    // Specific calculation functions
    function calculateAffiliate() {
        const price = parseFloat(afPrice.value) || 0;
        const sales = parseInt(afSales.value) || 0;
        const total = price * sales;
        const userComision = Math.round(total * 0.9);
        const platformCut = Math.round(total * 0.1);

        document.getElementById('af-result').textContent = `USD $${userComision.toLocaleString()}`;
        document.getElementById('af-calc-tuyo').textContent = `$${userComision.toLocaleString()}`;
        document.getElementById('af-calc-rumbo').textContent = `$${platformCut.toLocaleString()}`;
    }

    window.setAfSales = function(salesVal) {
        afSales.value = salesVal;
        
        // Update active class on selector buttons
        const container = afSales.closest('.calc-inputs-col');
        const buttons = container.querySelectorAll('.qs-buttons .qs-btn');
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === salesVal) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        calculateAffiliate();
    };

    function calculateCloser() {
        const comision = parseFloat(clComision.value) || 0;
        const closes = parseInt(clCloses.value) || 0;
        const result = comision * closes;

        document.getElementById('cl-result').textContent = `USD $${result.toLocaleString()}`;
        
        // Dynamically update scenarios list based on input commission
        const scenarioBox = document.getElementById('cl-scenarios');
        if(scenarioBox) {
            scenarioBox.innerHTML = `
                <div class="scenario-item"><span>5 cierres:</span> <strong>$${(comision * 5).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>10 cierres:</span> <strong>$${(comision * 10).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>25 cierres:</span> <strong>$${(comision * 25).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>50 cierres:</span> <strong>$${(comision * 50).toLocaleString()} USD</strong></div>
            `;
        }
    }

    window.setClCloses = function(closesVal) {
        clCloses.value = closesVal;
        
        // Highlight active button
        const container = clCloses.closest('.calc-inputs-col');
        const buttons = container.querySelectorAll('.qs-buttons .qs-btn');
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === closesVal) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        calculateCloser();
    };

    function calculateCommunity() {
        const rate = parseFloat(cmRate.value) || 0;
        const clients = parseInt(cmClients.value) || 0;
        const result = rate * clients;

        document.getElementById('cm-result').textContent = `USD $${result.toLocaleString()}`;
        
        // Dynamically update scenarios
        const scenarioBox = document.getElementById('cm-scenarios');
        if(scenarioBox) {
            scenarioBox.innerHTML = `
                <div class="scenario-item"><span>1 cliente × $150:</span> <strong>$150 USD</strong></div>
                <div class="scenario-item"><span>3 clientes × $150:</span> <strong>$450 USD</strong></div>
                <div class="scenario-item"><span>5 clientes × $250:</span> <strong>$1,250 USD</strong></div>
                <div class="scenario-item"><span>10 clientes × $300:</span> <strong>$3,000 USD</strong></div>
            `;
        }
    }

    window.setCmClients = function(clientsVal, rateVal) {
        cmClients.value = clientsVal;
        cmRate.value = rateVal;

        // Highlight active button
        const container = cmClients.closest('.calc-inputs-col');
        const buttons = container.querySelectorAll('.qs-buttons .qs-btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes(clientsVal.toString())) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        calculateCommunity();
    };

    function calculateEcommerce() {
        const margin = parseFloat(ecMargin.value) || 0;
        const sales = parseInt(ecSales.value) || 0;
        const result = margin * sales;

        document.getElementById('ec-result').textContent = `USD $${result.toLocaleString()}`;
        
        // Dynamically update scenarios
        const scenarioBox = document.getElementById('ec-scenarios');
        if(scenarioBox) {
            scenarioBox.innerHTML = `
                <div class="scenario-item"><span>10 ventas × $${margin}:</span> <strong>$${(margin * 10).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>50 ventas × $${margin}:</span> <strong>$${(margin * 50).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>100 ventas × $${margin}:</span> <strong>$${(margin * 100).toLocaleString()} USD</strong></div>
                <div class="scenario-item"><span>500 ventas × $${margin}:</span> <strong>$${(margin * 500).toLocaleString()} USD</strong></div>
            `;
        }
    }

    window.setEcSales = function(salesVal) {
        ecSales.value = salesVal;

        // Highlight active button
        const container = ecSales.closest('.calc-inputs-col');
        const buttons = container.querySelectorAll('.qs-buttons .qs-btn');
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === salesVal) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        calculateEcommerce();
    };

    function calculateServices() {
        const price = parseFloat(svPrice.value) || 0;
        const clients = parseInt(svClients.value) || 0;
        const result = price * clients;

        document.getElementById('sv-result').textContent = `USD $${result.toLocaleString()}`;
    }

    function handleContenidoScenarioChange() {
        const scenario = coType.value;
        const unitLabel = document.getElementById('co-unit-label');
        const qtyLabel = document.getElementById('co-qty-label');
        const expText = document.getElementById('co-explanation-text');

        if(scenario === 'sponsors') {
            unitLabel.textContent = 'Tarifa por Patrocinio (USD)';
            qtyLabel.textContent = 'Cantidad de Sponsors al mes';
            coUnit.value = 150;
            coQty.value = 4;
            expText.textContent = 'Las marcas pagan a creadores con audiencias nicho calificadas para promocionar sus productos. Los sponsors suelen pagar tarifas fijas por mención en videos o posts.';
        } else if (scenario === 'edicion') {
            unitLabel.textContent = 'Cobro mensual por cliente (USD)';
            qtyLabel.textContent = 'Cantidad de Clientes';
            coUnit.value = 200;
            coQty.value = 3;
            expText.textContent = 'Ofrece edición de video profesional para otros creadores o marcas que necesitan mantener un ritmo diario de contenido para crecer en redes.';
        } else if (scenario === 'productos') {
            unitLabel.textContent = 'Precio de tu infoproducto (USD)';
            qtyLabel.textContent = 'Unidades vendidas al mes';
            coUnit.value = 29;
            coQty.value = 30;
            expText.textContent = 'Crea y comercializa plantillas, guías, ebooks o formaciones cortas y véndelas de forma masiva a tu comunidad digital.';
        }

        calculateContenido();
    }

    function calculateContenido() {
        const unit = parseFloat(coUnit.value) || 0;
        const qty = parseInt(coQty.value) || 0;
        const result = unit * qty;

        document.getElementById('co-result').textContent = `USD $${result.toLocaleString()}`;
    }

    // --- 5. Interactive Path Quiz Logic ---
    const quizInterestRadios = document.querySelectorAll('input[name="interest"]');
    const quizResourceRadios = document.querySelectorAll('input[name="resource"]');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    let quizData = {
        interest: '',
        resource: ''
    };

    // Quiz Step 1 radio check
    quizInterestRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Remove active style from cards
            radio.closest('.quiz-options-grid').querySelectorAll('.quiz-option-card').forEach(card => {
                card.classList.remove('selected');
            });
            // Add style to checked
            radio.closest('.quiz-option-card').classList.add('selected');
            
            quizData.interest = radio.value;
            nextBtn.disabled = false;
        });
    });

    // Quiz Step 2 radio check
    quizResourceRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            radio.closest('.quiz-options-grid').querySelectorAll('.quiz-option-card').forEach(card => {
                card.classList.remove('selected');
            });
            radio.closest('.quiz-option-card').classList.add('selected');
            
            quizData.resource = radio.value;
            submitBtn.disabled = false;
        });
    });

    // Navigation Quiz steps
    window.goToStep2 = function() {
        document.getElementById('step-1').classList.remove('active');
        document.getElementById('step-2').classList.add('active');
    };

    window.backToStep1 = function() {
        document.getElementById('step-2').classList.remove('active');
        document.getElementById('step-1').classList.add('active');
    };

    window.generateQuizResult = function() {
        document.getElementById('step-2').classList.remove('active');
        document.getElementById('step-result').classList.add('active');

        const recList = document.getElementById('recommendationList');
        recList.innerHTML = '';

        let suggestions = [];

        // Logic to construct orientative suggestions based on quiz answers
        const interest = quizData.interest;
        const resource = quizData.resource;

        if (interest === 'vender' || interest === 'comunicar') {
            if (resource === 'personas') {
                suggestions = ['Closer de Ventas', 'Servicios Digitales', 'Marketing de Afiliados'];
            } else if (resource === 'productos') {
                suggestions = ['Marketing de Afiliados', 'E-commerce', 'Info Productos'];
            } else {
                suggestions = ['Closer de Ventas', 'Marketing de Afiliados', 'Servicios Digitales'];
            }
        } 
        else if (interest === 'crear' || interest === 'gestionar') {
            if (resource === 'contenido') {
                suggestions = ['Creación de Contenido', 'Edición de Video', 'Community Manager', 'YouTube'];
            } else if (resource === 'productos') {
                suggestions = ['Info Productos', 'E-commerce', 'Diseño Digital'];
            } else {
                suggestions = ['Community Manager', 'Diseño Digital', 'Edición de Video'];
            }
        }
        else if (interest === 'emprender') {
            if (resource === 'productos') {
                suggestions = ['E-commerce', 'Info Productos', 'Marketing de Afiliados'];
            } else if (resource === 'tecnologia') {
                suggestions = ['Automatización', 'Inteligencia Artificial', 'Publicidad Digital'];
            } else {
                suggestions = ['E-commerce', 'Servicios Digitales', 'Marketing de Afiliados'];
            }
        }
        else if (interest === 'tecnologia') {
            suggestions = ['Automatización', 'Inteligencia Artificial', 'Publicidad Digital', 'Generación de Leads'];
        }
        else {
            // Catch-all fallbacks
            suggestions = ['Marketing de Afiliados', 'Community Manager', 'Servicios Digitales'];
        }

        // Add to result container
        suggestions.forEach(item => {
            const li = document.createElement('li');
            li.className = 'rec-item';
            li.textContent = item;
            recList.appendChild(li);
        });

        // Set contextual WhatsApp CTA button message
        const waBtn = document.getElementById('quizResultBtn');
        const formattedSuggestions = suggestions.join(', ');
        const waText = encodeURIComponent(`Hola, hice el test orientativo de Rumbo Pro y me sugirió explorar: ${formattedSuggestions}. Me gustaría recibir más información.`);
        waBtn.href = `https://wa.me/59892707489?text=${waText}`;
    };

    window.resetQuiz = function() {
        // Reset selections
        quizData.interest = '';
        quizData.resource = '';
        
        quizInterestRadios.forEach(radio => {
            radio.checked = false;
            radio.closest('.quiz-option-card').classList.remove('selected');
        });
        quizResourceRadios.forEach(radio => {
            radio.checked = false;
            radio.closest('.quiz-option-card').classList.remove('selected');
        });

        nextBtn.disabled = true;
        submitBtn.disabled = true;

        document.getElementById('step-result').classList.remove('active');
        document.getElementById('step-1').classList.add('active');
    };

    // --- 6. FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle active status
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
