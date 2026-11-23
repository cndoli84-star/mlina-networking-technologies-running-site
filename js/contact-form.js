
/* ==========================================
   MLINA NETWORKING TECHNOLOGIES LTD.
   EMAILJS PROJECT ENQUIRY INTEGRATION
   Recipient: internetworkingsolutions.cc@gmail.com
   ========================================== */

const EMAILJS_CONFIG = {
    publicKey: "F-ZxZ2fcCY3y-HoG3",
    serviceID: "service_brfkkne",
    templateID: "template_rlfwfqo"
};

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("lead-form");

    if (!form) return;

    const submitButton = document.getElementById("submit-enquiry");
    const statusMessage = document.getElementById("form-status");

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = "form-status " + type;
    }

    // Verify EmailJS SDK
    if (typeof emailjs === "undefined") {
        showStatus(
            "Email service unavailable. Please contact internetworkingsolutions.cc@gmail.com.",
            "error"
        );

        console.error("EmailJS SDK was not loaded.");
        return;
    }

    // Initialise EmailJS
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
    });

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Honeypot spam protection
        const honeypot = form.querySelector('[name="website"]');

        if (honeypot && honeypot.value.trim() !== "") {
            form.reset();
            showStatus("Your request could not be processed.", "error");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting Project Request...";

        showStatus(
            "Sending your project request. Please wait...",
            "loading"
        );

        try {

            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                form
            );

            console.log("EmailJS response:", response);

            if (response.status === 200) {

                showStatus(
                    "Thank you for contacting Mlina Networking Technologies! Your project request has been successfully submitted. Our team will contact you shortly.",
                    "success"
                );

                form.reset();

            } else {

                throw new Error(
                    "EmailJS returned status: " + response.status
                );

            }

        } catch (error) {

            console.error("EmailJS error details:", {
    status: error.status,
    text: error.text,
    message: error.message
});

            showStatus(
                "We could not submit your request. Please try again or email internetworkingsolutions.cc@gmail.com directly.",
                "error"
            );

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Submit Project Request →";

        }

    });

});

