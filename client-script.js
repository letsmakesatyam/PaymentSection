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

function getHalfAmount(plan) {
  if (plan === "Basic") return 499;
  if (plan === "Standard") return 750;
  if (plan === "Premium") return 1000;
  return 0;
}

function isMobileDevice() {
  return /android|iphone|ipad|mobile/i.test(navigator.userAgent.toLowerCase());
}

document.getElementById('payBtn').addEventListener('click', () => {
  const plan = document.getElementById("planType").value;
  if (!plan) return alert("Please select a plan.");

  const amount = getHalfAmount(plan);
  const upiLink = `upi://pay?pa=satyamrevgade2-1@okhdfcbank&pn=Satyam%20Revgade&am=${amount}&cu=INR&tn=50%%20Advance%20for%20${plan}%20Plan`;

  const paymentUI = document.getElementById("paymentUI");
  paymentUI.innerHTML = ""; // Clear UI
  paymentUI.classList.remove("hidden");

  // QR Image (visible to all)
  const qr = document.createElement("img");
  qr.src = "https://res.cloudinary.com/dodaz2baz/image/upload/v1752388057/payment_qr_code_zesdce.jpg"; // your QR URL
  qr.alt = "Scan to Pay";
  paymentUI.appendChild(qr);

  // Amount Info
  const info = document.createElement("p");
  info.innerHTML = `Pay <strong>₹${amount}</strong> (50% of ${plan}) using the QR or UPI app.`;
  paymentUI.appendChild(info);

  // Mobile-only UPI button
  if (isMobileDevice()) {
    const mobileBtn = document.createElement("a");
    mobileBtn.href = upiLink;
    mobileBtn.innerText = `Pay ₹${amount} in UPI App`;
    mobileBtn.className = "cta-button";
    mobileBtn.style.marginTop = "10px";
    mobileBtn.target = "_blank";
    paymentUI.appendChild(mobileBtn);
  }

  // Confirm Button
  const confirmBtn = document.createElement("button");
  confirmBtn.innerText = "I Have Paid";
  confirmBtn.className = "cta-button";
  confirmBtn.style.marginTop = "20px";
  confirmBtn.addEventListener("click", () => {
    document.getElementById('plan-form-section').classList.add('hidden');
    document.getElementById('confirmation-section').classList.remove('hidden');
    document.getElementById('confirmation-section').scrollIntoView({ behavior: 'smooth' });
  });

  paymentUI.appendChild(confirmBtn);
});
