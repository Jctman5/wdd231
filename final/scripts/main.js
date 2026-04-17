const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// Modal
const modal = document.querySelector("#musicModal");

document.querySelector("#openModal").onclick = () => {
    modal.showModal();
    localStorage.setItem("openedModal", "true");
};

document.querySelector("#closeModal").onclick = () => {
    modal.close();
};

// LocalStorage example
if (localStorage.getItem("openedModal")) {
    console.log("User has opened modal before");
}
const showsList = document.querySelector("#showsList");

async function loadShows() {
    try {
        const response = await fetch("data/content.json");
        const data = await response.json();

        const shows = data
            .filter(item => item.type === "show")

            // Convert string date → real Date object and sort
            .sort((a, b) => new Date(a.date) - new Date(b.date))

            // Limit to next 3 shows
            .slice(0, 3);

        showsList.innerHTML = shows.map(show => `
            <li>
                <strong>${show.title}</strong> - 
                ${show.date} | ${show.location} @ ${show.venue}
            </li>
        `).join("");

    } catch (error) {
        console.error("Error loading shows:", error);
        showsList.innerHTML = "<li>Unable to load shows</li>";
    }
}

loadShows();