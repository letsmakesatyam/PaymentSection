// Plan button → prefill form + show section
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

function startPayment() {
  const plan = document.getElementById("planType").value;
  let amount = "999";
  if (plan === "Standard") amount = "1499";
  if (plan === "Premium") amount = "1999";

  if (!plan) {
    alert("Please select a plan before proceeding.");
    return;
  }

  // Show payment instructions manually instead of opening UPI link
  document.getElementById("paymentNote").classList.remove("hidden");
  document.getElementById("paymentNote").scrollIntoView({ behavior: "smooth" });

  alert(`Now open your UPI app and send ₹${amount} to:\n\nUPI ID: satyamrevgade2-1@okhdfcbank\n\nAfter payment, click the WhatsApp link below to confirm.`);
}

