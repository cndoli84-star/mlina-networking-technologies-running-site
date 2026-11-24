
/* ==========================================
   MLINA NETWORKING TECHNOLOGIES LTD.
   EMAILJS PROJECT ENQUIRY INTEGRATION

   EmailJS recipient:
   internetworkingsolutions.cc@gmail.com

   Form ID: lead-form
   ========================================== */

"use strict";

const EMAILJS_CONFIG = {
    publicKey: "F-ZxZ2fcCY3y-HoG3",
    serviceID: "service_brfkkne",
    templateID: "template_rlfwfqo"
};

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("lead-form");

    // Do nothing on pages without the enquiry form.
    if (!form) return;

    const submitButton = document.getElementById("submit-enquiry");
    const statusMessage = document.getElementById("form-status");

    let isSubmitting = false;

    // Display form feedback.
    function showStatus(message, type) {

        if (!statusMessage) {
            console.warn("Form status element was not found.");
            return;
        }

        statusMessage.textContent = message;
        statusMessage.className = "form-status " + type;
    }

    // Restore the submit button.
    function restoreButton() {

        if (!submitButton) return;

        submitButton.disabled = false;
        submitButton.textContent = "Submit Project Request →";
    }

    // Validate EmailJS configuration.
    if (
        !EMAILJS_CONFIG.publicKey ||
        !EMAILJS_CONFIG.serviceID ||
        !EMAILJS_CONFIG.templateID
    ) {

        showStatus(
            "Our email service is not configured correctly. Please contact our team directly.",
            "error"
        );

        console.error("EmailJS configuration is incomplete.");
        return;
    }

    // Verify that the EmailJS SDK loaded successfully.
    if (
        typeof emailjs === "undefined" ||
        typeof emailjs.sendForm !== "function"
    ) {

        showStatus(
            "Our email service is temporarily unavailable. Please try again later or contact our team directly.",
            "error"
        );

        console.error("EmailJS SDK was not loaded correctly.");
        return;
    }

    // Initialise EmailJS.
    try {

        emailjs.init({
            publicKey: EMAILJS_CONFIG.publicKey
        });

    } catch (error) {

        showStatus(
            "We could not initialise the email service. Please contact our team directly.",
            "error"
        );

        console.error("EmailJS initialisation error:", error);
        return;
    }

    // Handle project enquiry submission.
    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Prevent accidental multiple submissions.
        if (isSubmitting) return;

        // Validate required fields.
        if (!form.checkValidity()) {

            form.reportValidity();
            return;
        }

        // Honeypot spam protection.
        const honeypot = form.querySelector('[name="website"]');

        if (honeypot && honeypot.value.trim() !== "") {

            form.reset();

            showStatus(
                "Your request could not be processed. Please try again.",
                "error"
            );

            return;
        }

        // Confirm browser connectivity.
        if (!navigator.onLine) {

            showStatus(
                "You appear to be offline. Please check your internet connection and try again.",
                "error"
            );

            return;
        }

        isSubmitting = true;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting Project Request...";
        }

        showStatus(
            "Sending your project request. Please wait...",
            "loading"
        );

        try {

            // Send the complete form to the configured EmailJS template.
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                form
            );

            console.log("EmailJS response:", response);

            if (response && response.status === 200) {

                showStatus(
                    "Thank you for contacting Mlina Networking Technologies! Your project request has been successfully submitted. Our team will contact you shortly.",
                    "success"
                );

                // Clear submitted fields after successful delivery.
                form.reset();

            } else {

                throw new Error(
                    "Unexpected EmailJS response: " +
                    (response ? response.status : "No response")
                );

            }

        } catch (error) {

            console.error("EmailJS submission error:", {
                status: error.status || "Unavailable",
                text: error.text || "No additional error details",
                message: error.message || "Unknown error"
            });

            showStatus(
                "We could not submit your project request. Please try again or email internetworkingsolutions.cc@gmail.com directly.",
                "error"
            );

        } finally {

            isSubmitting = false;
            restoreButton();

        }

    });

});
