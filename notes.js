// מערכת ההערות לכל השירים
export function initNoteSystem() {

    const userNameInput = document.getElementById("userName");
    const userNoteInput = document.getElementById("userNote");
    const saveBtn = document.getElementById("saveBtn");
    const notesContainer = document.getElementById("notes");
    const waLink = document.getElementById("waLink");

    // לוקחים את שם השיר מהעמוד
    const songTitle = document.querySelector(".song-title").innerText;

    // טוענים הערות קיימות
    const savedNotes = JSON.parse(localStorage.getItem(songId)) || [];
    renderNotes();

    // שמירת הערה
    saveBtn.addEventListener("click", () => {
        const name = userNameInput.value.trim();
        const note = userNoteInput.value.trim();

        if (!name || !note) {
            alert("נא למלא שם והערה");
            return;
        }

        const newNote = { name, note };
        savedNotes.push(newNote);

        localStorage.setItem(songId, JSON.stringify(savedNotes));

        userNameInput.value = "";
        userNoteInput.value = "";

        renderNotes();
        updateWhatsAppLink();
    });

    // יצירת קישור וואטסאפ
    function updateWhatsAppLink() {
        const name = userNameInput.value.trim();
        const note = userNoteInput.value.trim();

        const message =
            "שם הכותב: " + name + "\n" +
            "שיר: " + songTitle + "\n" +
            "הערה: " + note;

        waLink.href =
            "https://wa.me/972545305123?text=" + encodeURIComponent(message);
    }

    // הצגת הערות
    function renderNotes() {
        notesContainer.innerHTML = "";

        savedNotes.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("note-item");

            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>${item.name}:</strong><br>
                        ${item.note}
                    </div>

                    <button class="delete-btn" data-index="${index}">
                        ✖
                    </button>
                </div>
                <hr>
            `;

            notesContainer.appendChild(div);
        });

        // כפתורי מחיקה
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                savedNotes.splice(index, 1);
                localStorage.setItem(songId, JSON.stringify(savedNotes));
                renderNotes();
            });
        });
    }

    // עדכון קישור וואטסאפ בזמן כתיבה
    userNameInput.addEventListener("input", updateWhatsAppLink);
    userNoteInput.addEventListener("input", updateWhatsAppLink);

    updateWhatsAppLink();
}




