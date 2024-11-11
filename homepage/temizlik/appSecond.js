const nav = document.querySelector("#nav");
const button = document.querySelector("#btn");
const overlay = document.querySelector("#overlay");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modalHeader = document.getElementById("modal-header");

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

let allData = [];

const serviceInputs = document.querySelectorAll(".input");

serviceInputs.forEach((input) => {
  const serviceContainer = document.createElement("div");
  serviceContainer.classList.add("service-container");
  input.parentNode.insertBefore(serviceContainer, input.nextSibling);

  const districtContainer = document.createElement("div");
  districtContainer.classList.add("district-container");
  input.parentNode.insertBefore(districtContainer, input.nextSibling);

  input.addEventListener("input", (event) =>
    handleInput(event, serviceContainer, districtContainer)
  );
});

async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Network response was not ok");
    allData = await response.json();
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

function handleInput(event, serviceContainer, districtContainer) {
  const inputText = normalizeText(event.target.value);
  serviceContainer.innerHTML = "";

  const filteredData = allData.filter((ilData) =>
    normalizeText(ilData.il).startsWith(inputText)
  );

  if (inputText) {
    if (filteredData.length > 0) {
      serviceContainer.style.display = "block";
      filteredData.forEach((ilData) => {
        const ilDiv = document.createElement("div");
        ilDiv.textContent = ilData.il;
        ilDiv.classList.add("il-option");

        ilDiv.addEventListener("click", function () {
          event.target.value = ilData.il;
          serviceContainer.style.display = "none";
          showDistricts(ilData.ilceler, districtContainer, event.target);
        });

        serviceContainer.appendChild(ilDiv);
      });
    } else {
      serviceContainer.style.display = "none";
    }
  } else {
    serviceContainer.style.display = "none";
  }
}

function showDistricts(districts, districtContainer, inputField) {
  districtContainer.innerHTML = "";

  districts.forEach((district) => {
    const districtDiv = document.createElement("div");
    districtDiv.textContent = district;
    districtDiv.classList.add("ilce-option");

    districtDiv.addEventListener("click", function () {
      inputField.value = `${inputField.value} - ${district}`;
      districtContainer.style.display = "none";
    });

    districtContainer.appendChild(districtDiv);
  });

  districtContainer.style.display = "block";
}

function normalizeText(text) {
  return text.trim().toLowerCase();
}

fetchData();
