const spotlightUrl = "data/members.json";

async function getSpotlights() {
  const response = await fetch(spotlightUrl);
  const data = await response.json();


  const filtered = data.filter(m => m.level >= 2);


  const shuffled = filtered.sort(() => 0.5 - Math.random());


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