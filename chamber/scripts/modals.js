document.querySelectorAll("[data-modal]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});
document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.close();
  });
});