const nav = document.querySelector("#nav");
const button = document.querySelector("#btn");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modalHeader = document.getElementById("modal-header");
const openModalBtn = document.getElementById("open");
const closeModalBtn = document.getElementById("close");
const menuButton = document.querySelector(".menu-header");
const overlay = document.querySelector(".overlay");
const servicesDrawer = document.getElementById("services-drawer");
const drawer = document.querySelector(".service-open");

drawer.addEventListener("click", (event) => {
  event.preventDefault();
  servicesDrawer.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (
    !servicesDrawer.contains(event.target) &&
    !drawer.contains(event.target)
  ) {
    servicesDrawer.classList.remove("show");
  }
});

button.addEventListener("click", () => {
  nav.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
});

open.addEventListener("click", () => {
  modalHeader.classList.add("show");
});

close.addEventListener("click", () => {
  modalHeader.classList.remove("show");
});
