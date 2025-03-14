// Отслеживание времени
let isWorking = false;
let startTime;
const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("startStopBtn");
const timeLog = document.getElementById("timeLog");

function updateTimer() {
    if (isWorking) {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
        const seconds = String(diff % 60).padStart(2, "0");
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

startStopBtn.addEventListener("click", () => {
    if (!isWorking) {
        startTime = new Date();
        isWorking = true;
        startStopBtn.textContent = "Закончить работу";
        setInterval(updateTimer, 1000);
    } else {
        isWorking = false;
        startStopBtn.textContent = "Начать работу";
        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const logEntry = document.createElement("li");
        logEntry.textContent = `Работа: ${hours}ч ${minutes}м (${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()})`;
        timeLog.appendChild(logEntry);
        timerDisplay.textContent = "00:00:00";
    }
});

// Учет отпусков
const vacationForm = document.getElementById("vacationForm");
const vacationList = document.getElementById("vacationList");

vacationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("employeeName").value;
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    const vacationEntry = document.createElement("li");
    vacationEntry.textContent = `${name}: ${start} - ${end}`;
    vacationList.appendChild(vacationEntry);

    vacationForm.reset();
});

// Графики работы
const scheduleForm = document.getElementById("scheduleForm");
const scheduleList = document.getElementById("scheduleList");

scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const employee = document.getElementById("shiftEmployee").value;
    const date = document.getElementById("shiftDate").value;
    const start = document.getElementById("shiftStart").value;
    const end = document.getElementById("shiftEnd").value;

    const scheduleEntry = document.createElement("li");
    scheduleEntry.textContent = `${employee}: ${date}, ${start} - ${end}`;
    scheduleList.appendChild(scheduleEntry);

    scheduleForm.reset();
});

// Параллакс и анимации (из прошлого ответа)
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    let scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
            }
        });
    }, { threshold: 0.3 });

    elements.forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", animateOnScroll);s
