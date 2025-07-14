document.querySelectorAll('.choose-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedPlan = btn.getAttribute('data-plan');
    document.getElementById('plan-select').value = selectedPlan;
    document.getElementById('planType').value = selectedPlan;

    document.getElementById('plan-form-section').classList.remove('hidden');
    document.getElementById('plan-form-section').scrollIntoView({ behavior: 'smooth' });
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

  const halfAmount = Math.floor(amount / 2);
  const upiLink = `upi://pay?pa=satyamrevgade2-1@okhdfcbank&pn=Satyam%20Revgade&am=${halfAmount}&cu=INR&tn=${plan}%20Plan%20Advance%2050%25`;

  const paymentUI = document.getElementById('paymentUI');
  paymentUI.classList.remove('hidden');
  paymentUI.innerHTML = `
    <div class="payment-instruction">
      <h3>📌 Prefer Scanning the QR Code</h3>
      <p>Some UPI apps may block link-based payments for security. Please <strong>scan the QR below and pay 50% amount of your selected Plan</strong> for guaranteed success.</p>
      <p>OR tap the button to try UPI app link (may not work on all devices).</p>
      <img src="https://res.cloudinary.com/dodaz2baz/image/upload/v1752388057/payment_qr_code_zesdce.jpg" alt="UPI QR Code" style="width: 250px; margin: 20px auto; display: block;" />
      <button id="upiLinkBtn" class="cta-button">💰 Pay via UPI App</button>
      <button type="button" id="confirmPaidBtn" class="cta-button" style="margin-top: 15px; background: #28a745;">✅ I Have Paid</button>
    </div>
  `;

  // Attach UPI button event
  setTimeout(() => {
    document.getElementById('upiLinkBtn').addEventListener('click', () => {
      window.location.href = upiLink;
    });
  }, 100);

  // Attach Confirm Paid event with fetch() form submission
  setTimeout(() => {
    document.getElementById('confirmPaidBtn').addEventListener('click', async () => {
      sessionStorage.setItem('portfolio_payment_done', 'yes');

      const form = document.getElementById('plan-form');
      const formData = new FormData(form);

      // Send form to Formspree via fetch()
      try {
        const response = await fetch('https://formspree.io/f/xrblzdln', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          document.getElementById('plan-form-section').classList.add('hidden');
          document.getElementById('confirmation-section').classList.remove('hidden');
          document.getElementById('confirmation-section').scrollIntoView({ behavior: 'smooth' });
        } else {
          alert("There was a problem submitting the form. Try again.");
        }
      } catch (error) {
        alert("Something went wrong. Try again later.");
      }
    });
  }, 100);
});

// Show confirmation section only if sessionStorage says so
window.addEventListener('DOMContentLoaded', () => {
  const isPaid = sessionStorage.getItem('portfolio_payment_done');
  if (isPaid === 'yes') {
    document.getElementById('plan-form-section')?.classList.add('hidden');
    document.getElementById('confirmation-section')?.classList.remove('hidden');
  }
});
