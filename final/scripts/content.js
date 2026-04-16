const container = document.querySelector("#musicContainer");

async function loadContent() {
    try {
        const response = await fetch("../data/content.json");
        const data = await response.json();

        container.innerHTML = data.map(item => {
            
            if (item.type === "song") {
                return `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>Year: ${item.year}</p>
                    <p>Genre: ${item.genre}</p>
                    <p>Length: ${item.length}</p>
                </div>`;
            }

            if (item.type === "show") {
                return `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>Date: ${item.date}</p>
                    <p>Location: ${item.location}</p>
                    <p>Venue: ${item.venue}</p>
                </div>`;
            }

            if (item.type === "member") {
                return `
                <div class="card">
                    <h3>${item.name}</h3>
                    <p>Role: ${item.role}</p>
                    <p>Influences: ${item.influences}</p>
                    <p>Years Active: ${item.yearsActive}</p>
                </div>`;
            }

        }).join("");

    } catch (error) {
        console.error(error);
    }
}

loadContent();