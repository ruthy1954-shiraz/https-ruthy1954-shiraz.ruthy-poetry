// sendNotes.js — שליחת מייל + ווצאפ לכל הערה חדשה באתר

// טעינה גלובלית של EmailJS
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
document.head.appendChild(script);

script.onload = () => {
 console.log("EmailJS loaded successfully!");
    emailjs.init("FX0qVdNcYKk7MpMQ-");

    document.addEventListener("DOMContentLoaded", () => {
        const saveLink = document.getElementById("saveLink");
        const waLink = document.getElementById("waLink");
        if (!saveLink || !waLink) return;

        saveLink.addEventListener("click", function() {
            const name = document.getElementById("userName")?.value.trim() || "";
            const song = document.getElementById("userSong")?.value.trim() || "";
            const note = document.getElementById("userNote")?.value.trim() || "";
            const page = window.location.pathname;
            console.log("Trying to send email...");
            emailjs.send("service_xnifjk9", "template_ij47s89", {
                user_name: name,
                user_song: song || page,
                user_note: note,
                user_email: "ruthy1954@gmail.com"
            })
            .then(() => console.log("Email sent successfully!"))
            .catch(() => console.error("Email sending failed"));

            const phone = "972545305123";
            const message =
                `שם הכותב: ${name}\n` +
                `שם הדף: ${song || page}\n` +
                `הערה: ${note}`;
            const encoded = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
        });
    });
};



