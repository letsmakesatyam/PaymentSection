document.querySelectorAll('.choose-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedPlan = btn.getAttribute('data-plan');
    document.getElementById('plan-select').value = selectedPlan;
    document.getElementById('planType').value = selectedPlan;

    document.getElementById('plan-form-section').classList.remove('hidden');
    document.getElementById('confirmation-section').classList.add('hidden');
    document.getElementById('plan-form-section').scrollIntoView({ behavior: 'smooth' });
  });
});

function isMobileDevice() {
  return /android|iphone|ipad|mobile/i.test(navigator.userAgent);
}

function startPayment() {
  const plan = document.getElementById("planType").value;
  let amount = 999;
  if (plan === "Standard") amount = 1499;
  if (plan === "Premium") amount = 1999;
  const halfAmount = Math.round(amount / 2);

  const paymentUI = document.getElementById("paymentUI");
  paymentUI.innerHTML = "";

  if (isMobileDevice()) {
    const upiLink = `upi://pay?pa=satyamrevgade2-1@okhdfcbank&pn=Satyam%20Revgade&am=${halfAmount}&cu=INR&tn=50%25%20Advance%20for%20${plan}`;
    const btn = document.createElement("a");
    btn.href = upiLink;
    btn.innerText = `Pay ₹${halfAmount} via UPI`;
    btn.className = "cta-button";
    btn.style.display = "block";
    btn.target = "_blank";
    paymentUI.appendChild(btn);
  } else {
    const qr = document.createElement("img");
    qr.src = "https://res.cloudinary.com/dodaz2baz/image/upload/v1752388057/payment_qr_code_zesdce.jpg"; // Your static QR code image
    qr.alt = "Scan to Pay";
    qr.style.width = "250px";
    qr.style.margin = "20px auto";
    paymentUI.appendChild(qr);
  }

  paymentUI.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById('plan-form-section').classList.add('hidden');
    document.getElementById('confirmation-section').classList.remove('hidden');
    document.getElementById('confirmation-section').scrollIntoView({ behavior: 'smooth' });
  }, 6000); // Simulate payment completion
}
