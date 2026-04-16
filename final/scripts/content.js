const musicContainer = document.querySelector("#musicContainer");
const showsList = document.querySelector("#showsList");

async function loadContent() {
    try {
        const response = await fetch("data/content.json");
        const data = await response.json();

        // =========================
        // MUSIC PAGE
        // =========================
        if (musicContainer) {
            const songs = data.filter(item => item.type === "song");

            musicContainer.innerHTML = songs.map(song => `
                <div class="card">
                    <img src="${song.image}" alt="${song.title}" loading="lazy">
                    <h3>${song.title}</h3>
                    <p>Year: ${song.year}</p>
                    <p>Genre: ${song.genre}</p>
                    <p>Length: ${song.length}</p>
                </div>
            `).join("");
        }

        // =========================
        // HOME PAGE (SHOWS)
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
                    <img src="${show.image}" alt="${show.title}" loading="lazy" width="150">
                    <div>
                        <strong>${show.title}</strong><br>
                        ${new Date(show.date).toLocaleDateString()}<br>
                        ${show.location} @ ${show.venue}
                    </div>
                </li>
            `).join("");
        }

    } catch (error) {
        console.error("Error loading content:", error);
    }
}

loadContent();