// Handle plan selection → Prefill form + show section
document.querySelectorAll('.choose-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedPlan = btn.getAttribute('data-plan');
    document.getElementById('plan-select').value = selectedPlan;
    document.getElementById('planType').value = selectedPlan;

    const formSection = document.getElementById('plan-form-section');
    formSection.classList.remove('hidden');
    formSection.scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('payBtn').addEventListener('click', () => {
  const plan = document.getElementById("plan-select").value;
  if (!plan) {
    alert("Please select a plan before proceeding.");
    return;
  }

  let amount = 999;
  if (plan === "Standard") amount = 1499;
  else if (plan === "Premium") amount = 1999;

  const halfAmount = Math.floor(amount / 2); // Round down for simplicity

  const upiLink = `upi://pay?pa=satyamrevgade2-1@okhdfcbank&pn=Satyam%20Revgade&am=${halfAmount}&cu=INR&tn=${plan}%20Plan%20Advance%2050%25`;

  // Show payment UI with QR and buttons
  const paymentUI = document.getElementById('paymentUI');
  paymentUI.classList.remove('hidden');
  paymentUI.innerHTML = `
    <div class="payment-instruction">
      <h3>📌 Prefer Scanning the QR Code</h3>
      <p>Some UPI apps may block link-based payments for security. Please <strong>scan the QR below</strong> for guaranteed success.</p>
      <p>OR tap the button to try UPI app link (may not work on all devices).</p>

      <img src="https://res.cloudinary.com/dodaz2baz/image/upload/v1752388057/payment_qr_code_zesdce.jpg" alt="UPI QR Code" class="qr-image" style="width: 250px; height: auto; margin: 20px auto; display: block;" />

      <button id="upiLinkBtn" class="cta-button">💰 Pay via UPI App</button>
      <button id="confirmPaidBtn" class="cta-button" style="margin-top: 15px; background: #28a745;">✅ I Have Paid</button>
    </div>
  `;

  // UPI button → open app link
  setTimeout(() => {
    const upiBtn = document.getElementById('upiLinkBtn');
    if (upiBtn) {
      upiBtn.addEventListener('click', () => {
        window.location.href = upiLink;
      });
    }
  }, 100); // Slight delay to ensure DOM is ready

  // "I Have Paid" → show confirmation section
  setTimeout(() => {
    const confirmBtn = document.getElementById('confirmPaidBtn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        document.getElementById('plan-form-section').classList.add('hidden');
        document.getElementById('confirmation-section').classList.remove('hidden');
        document.getElementById('confirmation-section').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, 100);
});
