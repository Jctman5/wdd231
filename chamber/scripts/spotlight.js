const url = "data/members.json";

async function getSpotlights() {
  const response = await fetch(url);
  const data = await response.json();

  // Filter gold (3) and silver (2)
  const filtered = data.filter(m => m.level >= 2);

  // Shuffle
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  // Pick 3
  const selected = shuffled.slice(0, 3);

  displaySpotlights(selected);
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlights");

  members.forEach(member => {
    const card = document.createElement("section");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name}">
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <a href="${member.website}" target="_blank">Visit</a>
      <p>Level: ${member.level}</p>
    `;

    container.appendChild(card);
  });
}

getSpotlights();