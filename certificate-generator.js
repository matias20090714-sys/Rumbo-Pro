/* ==========================================================================
   RUMBO PRO — CERTIFICATE RENDERER & PDF ENGINE (certificate-generator.js)
   Signature: Pablo Xavier (Director & Fundador de RUMBO PRO)
   ========================================================================== */

async function openCertificateModal(rawCertData) {
  let certData = rawCertData;
  if (rawCertData && typeof rawCertData.then === 'function') {
    certData = await rawCertData;
  }

  // Safe fallbacks to prevent any 'undefined'
  const studentName = certData.userName || certData.user_name || 'Estudiante RUMBO PRO';
  const courseTitle = certData.courseTitle || certData.course_title || 'Formación Profesional Digital';
  const issueDate = certData.issueDate || certData.issue_date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const certId = certData.id || ('RP-CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const signName = certData.signature || 'Pablo Xavier';
  const directorTitle = certData.directorTitle || certData.director_title || 'Director & Fundador — RUMBO PRO';

  let modalContainer = document.getElementById('certificate-modal-overlay');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'certificate-modal-overlay';
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
    <div class="cert-modal-backdrop" onclick="closeCertificateModal(event)">
      <div class="cert-modal-content" onclick="event.stopPropagation()">
        <div class="cert-modal-header">
          <h2>CERTIFICADO OFICIAL DE FINALIZACIÓN</h2>
          <button class="cert-close-btn" onclick="closeCertificateModal()">&times;</button>
        </div>

        <div class="cert-document-frame" id="printable-certificate">
          <div class="cert-corner cert-corner-tl"></div>
          <div class="cert-corner cert-corner-tr"></div>
          <div class="cert-corner cert-corner-bl"></div>
          <div class="cert-corner cert-corner-br"></div>

          <div class="cert-inner-border">
            <div class="cert-watermark">RUMBO PRO</div>

            <!-- Logo Header -->
            <div class="cert-logo-section">
              <img src="assets/logo.jpg" alt="Rumbo Pro Logo" class="cert-logo-img">
              <div class="cert-brand-title">RUMBO <span>PRO</span></div>
              <div class="cert-brand-sub">ACADEMIA DE NEGOCIOS Y HABILIDADES DIGITALES</div>
            </div>

            <!-- Main Text -->
            <div class="cert-body-section">
              <p class="cert-label-grant">OTORGA EL PRESENTE CERTIFICADO DE EXCELENCIA A</p>
              <h1 class="cert-student-name">${studentName}</h1>
              <p class="cert-label-completion">Por haber completado satisfactoriamente el 100% de la formación técnica y práctica en:</p>
              <h2 class="cert-course-title">${courseTitle}</h2>
            </div>

            <!-- Meta & Signatures -->
            <div class="cert-footer-section">
              <div class="cert-meta-item">
                <span class="cert-meta-label">FECHA DE EMISIÓN</span>
                <span class="cert-meta-val">${issueDate}</span>
              </div>

              <div class="cert-signature-box">
                <div class="cert-signature-line">${signName}</div>
                <span class="cert-sign-name">${signName}</span>
                <span class="cert-sign-title">${directorTitle}</span>
              </div>

              <div class="cert-meta-item">
                <span class="cert-meta-label">CÓDIGO DE VERIFICACIÓN</span>
                <span class="cert-meta-val cert-code">${certId}</span>
              </div>
            </div>

            <div class="cert-verify-link-footer">
              Verificable en: www.rumbopro.com/#/verificar (ID: ${certId})
            </div>
          </div>
        </div>

        <div class="cert-actions-bar">
          <button class="btn-primary" onclick="window.print()">
            🖨️ IMPRIMIR / DESCARGAR PDF
          </button>
          <button class="btn-secondary" onclick="closeCertificateModal()">
            CERRAR
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.classList.add('cert-modal-open');
}

function closeCertificateModal() {
  const modalContainer = document.getElementById('certificate-modal-overlay');
  if (modalContainer) {
    modalContainer.innerHTML = '';
  }
  document.body.classList.remove('cert-modal-open');
}
