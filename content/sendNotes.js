import * as emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

import "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

// הפעלה עם ה‑Public Key שלך
emailjs.init("FX0qVdNcYKk7MpMQ-");

document.addEventListener("DOMContentLoaded", () => {

    const saveLink = document.getElementById("saveLink");
    const waLink = document.getElementById("waLink");

    // אם הדף לא כולל מערכת הערות — לא לעשות כלום
    if (!saveLink || !waLink) return;

    saveLink.addEventListener("click", function() {

        const name = document.getElementById("userName")?.value.trim() || "";
        const song = document.getElementById("userSong")?.value.trim() || "";
        const note = document.getElementById("userNote")?.value.trim() || "";

        // ⭐ זיהוי אוטומטי של הדף
        const page = window.location.pathname;

        // ⭐ שליחת מייל דרך EmailJS
        emailjs.send("service_xnifjk9", "template_ij47s89", {
            user_name: name,
            user_song: song || page,   // אם אין שם שיר/תקשור — נשלח את כתובת הדף
            user_note: note,
            user_email: "ruthy1954@gmail.com"
        })
        .then(() => {
            console.log("Email sent successfully!");
        })
        .catch(() => {
            console.error("Email sending failed");
        });

        // ⭐ שליחת הודעה לווצאפ
        const phone = "972545305123";
        const message =
            `שם הכותב: ${name}\n` +
            `שם הדף: ${song || page}\n` +
            `הערה: ${note}`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    });

});
