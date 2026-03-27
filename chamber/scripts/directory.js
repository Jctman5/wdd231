const directoryURL = "data/members.json";

const container = document.querySelector("#members");


if (container) {

  async function getMembers() {
    const response = await fetch(directoryURL);
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

  
  const gridBtn = document.querySelector("#grid");
  const listBtn = document.querySelector("#list");

  if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
      container.classList.add("grid");
      container.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
      container.classList.add("list");
      container.classList.remove("grid");
    });
  }
}