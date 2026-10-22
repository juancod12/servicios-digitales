/* Página puente del QR: qr.html?plan=<id> → registra el evento y abre la demo. */
(function () {
  'use strict';
  const CFG = window.MENUFAST;
  const id = new URLSearchParams(location.search).get('plan');
  const plan = CFG && CFG.planes.find((p) => p.id === id && p.demo);
  const destino = plan ? plan.demo : 'index.html#demo';
  document.getElementById('qr-enlace').href = destino;
  window.menuFastTrack?.('demo_qr_escaneado', { plan: plan ? plan.id : null });
  // Pequeña espera para que la analítica alcance a enviar el evento.
  setTimeout(() => location.replace(destino), 150);
})();
