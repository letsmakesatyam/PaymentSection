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
  return /android|iphone|ipad|mobile/i.test(navigator.userAgent.toLowerCase());
}

document.getElementById('payBtn').addEventListener('click', () => {
  const plan = document.getElementById("planType").value;
  if (!plan) return alert("Please select a plan.");

  const paymentUI = document.getElementById("paymentUI");
  paymentUI.innerHTML = ""; // Clear

  let half = 499;
  if (plan === "Standard") half = 750;
  else if (plan === "Premium") half = 1000;

  if (isMobileDevice()) {
    const upiLink = `upi://pay?pa=satyamrevgade2-1@okhdfcbank&pn=Satyam%20Revgade&am=${half}&cu=INR&tn=Advance%2050%25%20for%20${plan}`;
    const btn = document.createElement("a");
    btn.href = upiLink;
    btn.innerText = `Pay ₹${half} via UPI`;
    btn.className = "cta-button";
    btn.target = "_blank";
    paymentUI.appendChild(btn);
  } else {
    const qr = document.createElement("img");
    qr.src = "https://res.cloudinary.com/dodaz2baz/image/upload/v1752388057/payment_qr_code_zesdce.jpg"; // Replace if needed
    qr.alt = "Scan to Pay";
    paymentUI.appendChild(qr);

    const note = document.createElement("p");
    note.innerHTML = `Scan this QR to pay <strong>₹${half}</strong> (50% of ${plan})`;
    paymentUI.appendChild(note);
  }

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
  paymentUI.classList.remove("hidden");
});
