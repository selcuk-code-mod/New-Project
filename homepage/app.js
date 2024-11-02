const country = document.getElementById("country");
const serviceInput = document.getElementById("service");
const serviceContainer = document.getElementById("serviceContainer");
const openModalBtn = document.getElementById("open");
const closeModalBtn = document.getElementById("close");
const modalHeader = document.getElementById("modal-header");
const menuButton = document.querySelector(".menu-header");
const navMenu = document.querySelector("#nav");
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

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
});

openModalBtn.addEventListener("click", () => {
  modalHeader.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  modalHeader.classList.remove("show");
});

modalHeader.addEventListener("click", (e) => {
  if (e.target === modalHeader) {
    modalHeader.classList.remove("show");
  }
});

// let serviceData = [];

// async function fetchServices() {
//   try {
//     const response = await fetch("service.json");
//     const data = await response.json();
//     const serviceData = data[0].hizmetler;

//     serviceInput.addEventListener("input", function () {
//       const inputText = serviceInput.value.toLowerCase();
//       serviceContainer.innerHTML = "";

//       const filteredServices = serviceData.filter((hizmet) =>
//         hizmet.toLowerCase().startsWith(inputText)
//       );

//       if (inputText) {
//         serviceContainer.style.display = "block";

//         filteredServices.forEach((hizmet) => {
//           const hizmetDiv = document.createElement("div");
//           hizmetDiv.textContent = hizmet;
//           hizmetDiv.classList.add("service-option");

//           hizmetDiv.addEventListener("click", function () {
//             serviceInput.value = hizmet;
//             serviceContainer.style.display = "none";
//           });

//           serviceContainer.appendChild(hizmetDiv);
//         });
//       } else {
//         serviceContainer.style.display = "none";
//       }
//     });
//   } catch (error) {
//     console.error("Error loading service data:", error);
//   }
// }

// fetchServices();
