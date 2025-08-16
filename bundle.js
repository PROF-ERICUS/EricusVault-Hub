document.addEventListener("DOMContentLoaded", function() {
  const payBtn = document.getElementById("payBtn");
  const bundleSelect = document.getElementById("bundleSelect");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const footer = document.getElementById("footer");

  // Footer glow if content taller than viewport
  if (document.body.scrollHeight > window.innerHeight) {
    footer.style.boxShadow = "0 0 20px rgba(0,255,100,0.7)";
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  payBtn.addEventListener("click", function() {
    const bundleValue = bundleSelect.value;
    const bundleName = bundleSelect.options[bundleSelect.selectedIndex].dataset.name;
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!bundleValue || !phone ) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Initialize Paystack payment
    let handler = PaystackPop.setup({
      key: 'pk_live_a041630bf628bdf36bca3d2dcae2c309ce6216c1', // <-- Replace with your Paystack Public Key
       email: email || 'no-email@example.com', // fallback if empty
      amount: bundleValue * 100, // Amount in pesewas
      currency: 'GHS',
      ref: 'MTN-BND-' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          { display_name: "MTN Number", variable_name: "mtn_number", value: phone },
          { display_name: "Bundle", variable_name: "bundle_name", value: bundleName }
        ]
      },
      callback: function(response) {
        alert(`Payment successful!\nReference: ${response.reference}\nBundle: ${bundleName}\nMTN: ${phone}`);

        // WhatsApp redirect
        // -----------------
        // Replace the number below with your WhatsApp number in international format (without + or 00)
        const whatsappNumber = '233542044490'; 
        const message = `Hello! I purchased the ${bundleName} bundle. Payment Ref: ${response.reference}. MTN Number: ${phone}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Redirect user to WhatsApp
        window.location.href = whatsappURL; 
      },
      onClose: function() {
        alert("Transaction was cancelled.");
      }
    });

    handler.openIframe();
  });
});

