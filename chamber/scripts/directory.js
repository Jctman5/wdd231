const url = "data/members.json";

const container = document.querySelector("#members");

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name}">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit</a>
    `;

    container.appendChild(card);
  });
}

getMembers();


// Toggle view
document.querySelector("#grid").addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});