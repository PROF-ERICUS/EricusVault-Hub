document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("payBtn").addEventListener("click", function () {
    const bundle = document.getElementById("bundleSelect");
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!bundle.value || !phone || !email) {
        alert("Please fill all fields.");
        return;
    }

    let amountGHS = parseFloat(bundle.value);
    let bundleName = bundle.options[bundle.selectedIndex].dataset.name;

    // ✅ Replace with your own Paystack public key
    let paystackPublicKey = "pk_live_a041630bf628bdf36bca3d2dcae2c309ce6216c1";

    let handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: email,
        amount: amountGHS * 100, // amount in pesewas
        currency: "GHS",
        ref: "MTNBUNDLE-" + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                { display_name: "Phone Number", variable_name: "phone_number", value: phone },
                { display_name: "Bundle", variable_name: "bundle", value: bundleName }
            ]
        },
        callback: function (response) {
            alert("Payment complete! Transaction Ref: " + response.reference);
            // Here you can manually deliver the bundle after verifying payment
        },
        onClose: function () {
            alert("Payment window closed.");
        }
    });
    handler.openIframe();
});
