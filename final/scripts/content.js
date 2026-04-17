const musicContainer = document.querySelector("#musicContainer");
const showsList = document.querySelector("#showsList");
const membersContainer = document.querySelector("#membersContainer");
const gearContainer = document.querySelector("#gearContainer");

// =========================
// MODALS
// =========================
const memberModal = document.querySelector("#memberModal");
const memberModalContent = document.querySelector("#memberModalContent");
const closeMemberModal = document.querySelector("#closeMemberModal");

const songModal = document.querySelector("#songModal");
const songModalContent = document.querySelector("#modalContent");
const closeSongModal = document.querySelector("#closeSongModal");

// =========================
// MAIN FUNCTION
// =========================
async function loadContent() {
    try {
        const response = await fetch("./data/content.json");
        const data = await response.json();

        // =========================
        // 🎵 MUSIC PAGE
        // =========================
        if (musicContainer) {
            const songs = data.filter(item => item.type === "song");

            musicContainer.innerHTML = songs.map((song, index) => `
                <div class="card song-card" data-index="${index}">
                    <img src="${song.image}" alt="${song.title}" loading="lazy">
                    <h3>${song.title}</h3>
                    <p>${song.genre}</p>
                </div>
            `).join("");

            const cards = document.querySelectorAll(".song-card");

            cards.forEach(card => {
                card.addEventListener("click", () => {
                    const song = songs[card.dataset.index];

                    songModalContent.innerHTML = `
                        <h2>${song.title}</h2>
                        <img src="${song.image}" alt="${song.title}" width="250">
                        <p><strong>Year:</strong> ${song.year}</p>
                        <p><strong>Genre:</strong> ${song.genre}</p>
                        <p><strong>Length:</strong> ${song.length}</p>
                    `;

                    songModal.showModal();
                });
            });

            closeSongModal?.addEventListener("click", () => {
                songModal.close();
            });
        }

        // =========================
        // 📍 HOME PAGE (SHOWS)
        // =========================
        if (showsList) {
            const today = new Date();

            const shows = data
                .filter(item => item.type === "show")
                .filter(show => new Date(show.date) >= today)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 3);

            showsList.innerHTML = shows.map(show => `
                <li>
                    <div>
                        <strong>${show.title}</strong><br>
                        ${new Date(show.date).toLocaleDateString()}<br>
                        ${show.location} @ ${show.venue}
                    </div>
                </li>
            `).join("");
        }

        // =========================
        // 👥 MEMBERS PAGE
        // =========================
        if (membersContainer && gearContainer) {

            const members = data.filter(item => item.type === "member");

            // MEMBER CARDS (clickable)
            membersContainer.innerHTML = members.map((member, index) => `
                <div class="card member-card" data-index="${index}">
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            `).join("");

            // GEAR CARDS
            gearContainer.innerHTML = members.map(member => `
                <div class="card">
                    <img src="${member.gear.image}" alt="${member.gear.name}" loading="lazy">
                    <h3>${member.gear.name}</h3>
                    <p>${member.gear.type}</p>
                    <p>${member.gear.description}</p>
                    <p><em>${member.name}'s gear</em></p>
                </div>
            `).join("");

            // =========================
            // MEMBER MODAL LOGIC
            // =========================
            const cards = document.querySelectorAll(".member-card");

            cards.forEach(card => {
                card.addEventListener("click", () => {
                    const member = members[card.dataset.index];

                    memberModalContent.innerHTML = `
                        <h2>${member.name}</h2>
                        <img src="${member.image}" alt="${member.name}" width="250">
                        <p><strong>Role:</strong> ${member.role}</p>
                        <p><strong>Experience:</strong> ${member.yearsActive} years</p>
                        <p><strong>Influences:</strong> ${member.influences}</p>
                        <h3>Favorite Gear</h3>
                        <img src="${member.gear.image}" alt="${member.gear.name}" width="200">
                        <p><strong>${member.gear.name}</strong></p>
                        <p>${member.gear.description}</p>
                    `;

                    memberModal.showModal();
                });
            });

            closeMemberModal?.addEventListener("click", () => {
                memberModal.close();
            });

            memberModal?.addEventListener("click", (e) => {
                if (e.target === memberModal) {
                    memberModal.close();
                }
            });
        }

    } catch (error) {
        console.error("Error loading content:", error);
    }
}

loadContent();