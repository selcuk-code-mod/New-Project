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

const serviceInputs = document.querySelectorAll(".input");
const serviceContainers = document.querySelectorAll(".service-container");
const districtContainers = document.querySelectorAll(".district-container");

let allData = [];

async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Network response was not ok");
    allData = await response.json();

    serviceInputs.forEach((input, index) => {
      input.addEventListener("input", (event) => handleInput(event, index));
    });
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

function normalizeText(text) {
  return text
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function handleInput(event, index) {
  const inputText = normalizeText(event.target.value);
  const serviceContainer = serviceContainers[index];
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
          serviceInputs[index].value = ilData.il;
          serviceContainer.style.display = "none";
          showDistricts(ilData.ilceler, index);
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

function showDistricts(districts, index) {
  const districtContainer = districtContainers[index];
  districtContainer.innerHTML = "";

  districts.forEach((district) => {
    const districtDiv = document.createElement("div");
    districtDiv.textContent = district;
    districtDiv.classList.add("ilce-option");

    districtDiv.addEventListener("click", function () {
      serviceInputs[
        index
      ].value = `${serviceInputs[index].value} - ${district}`;
      districtContainer.style.display = "none";
    });

    districtContainer.appendChild(districtDiv);
  });

  districtContainer.style.display = "block";
}

fetchData();
