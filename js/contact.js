/* Contact form — prepares an email in the visitor's email application.
   It does not send or store messages on a server. */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const formMessage = document.getElementById("formMessage");
    const recipient = "nanaaisha780@gmail.com"; // Replace with your real inbox.

    function showMessage(message, isError = false) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.style.color = isError ? "#B42318" : "#173B3F";
        formMessage.setAttribute("role", "status");
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const name = document.getElementById("name")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const subject = document.getElementById("subject")?.value || "Website enquiry";
        const message = document.getElementById("message")?.value.trim() || "";

        if (!name || !email || !message) {
            showMessage("Please complete all required fields.", true);
            return;
        }

        if (recipient === "nanaaisha780@gmail.com") {
            showMessage("Before using this form, replace the placeholder email address in js/contact.js with your real contact email.", true);
            return;
        }

        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        showMessage("Your email application is opening with your message prepared. Please review and send it there.");
        window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
    });
});
