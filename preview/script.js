const clock = document.querySelector("#clock");
const period = document.querySelector("#period");
const weekday = document.querySelector("#weekday");
const date = document.querySelector("#date");

function updateDateTime() {
  const now = new Date();
  const timeParts = new Intl.DateTimeFormat("es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).formatToParts(now);

  clock.textContent = `${timeParts.find(part => part.type === "hour").value}:${timeParts.find(part => part.type === "minute").value}`;
  period.textContent = timeParts.find(part => part.type === "dayPeriod")?.value.toUpperCase() ?? "";
  weekday.textContent = new Intl.DateTimeFormat("es", { weekday: "long" }).format(now);
  weekday.textContent = weekday.textContent.charAt(0).toUpperCase() + weekday.textContent.slice(1);
  date.textContent = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);
}

function updateLightsSummary() {
  const enabled = document.querySelectorAll(".device.active").length +
    Number(document.querySelector(".switch").classList.contains("active"));
  document.querySelector("#lights-summary").textContent = `💡 ${enabled} encendidas`;
}

document.querySelectorAll(".device").forEach(device => {
  device.addEventListener("click", () => {
    device.classList.toggle("active");
    device.setAttribute("aria-pressed", String(device.classList.contains("active")));
    updateLightsSummary();
  });
});

const mainSwitch = document.querySelector(".switch");
mainSwitch.addEventListener("click", () => {
  mainSwitch.classList.toggle("active");
  mainSwitch.setAttribute("aria-pressed", String(mainSwitch.classList.contains("active")));
  document.querySelector("#main-light-state").textContent =
    mainSwitch.classList.contains("active") ? "Encendida · 72%" : "Apagada";
  updateLightsSummary();
});

const brightness = document.querySelector(".brightness input");
brightness.addEventListener("input", () => {
  brightness.style.background =
    `linear-gradient(90deg, #f4c542 ${brightness.value}%, rgba(255,255,255,.1) ${brightness.value}%)`;
  document.querySelector("#main-light-state").textContent = `Encendida · ${brightness.value}%`;
  if (!mainSwitch.classList.contains("active")) mainSwitch.click();
});

updateDateTime();
updateLightsSummary();
setInterval(updateDateTime, 30_000);
