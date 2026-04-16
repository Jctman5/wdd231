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