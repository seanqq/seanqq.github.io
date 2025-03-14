// Инициализация БД (имитация через localStorage)
let db = JSON.parse(localStorage.getItem("timeFlowDB")) || {
    timeLogs: [],
    requests: []
};

// Сохранение в "БД"
function saveDB() {
    localStorage.setItem("timeFlowDB", JSON.stringify(db));
}

// Учет времени (index.html)
let isWorking = false;
let startTime;

function updateTimer() {
    if (isWorking) {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
        const seconds = String(diff % 60).padStart(2, "0");
        document.getElementById("timer").textContent = `${hours}:${minutes}:${seconds}`;
    }
}

if (document.getElementById("startStopBtn")) {
    const startStopBtn = document.getElementById("startStopBtn");
    const timeLog = document.getElementById("timeLog");

    db.timeLogs.forEach(log => {
        const li = document.createElement("li");
        li.textContent = log;
        timeLog.appendChild(li);
    });

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
            const log = `Работа: ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`;
            db.timeLogs.push(log);
            saveDB();
            const li = document.createElement("li");
            li.textContent = log;
            timeLog.appendChild(li);
            document.getElementById("timer").textContent = "00:00:00";
        }
    });
}

// Подача заявок (request.html)
if (document.getElementById("requestForm")) {
    const requestForm = document.getElementById("requestForm");
    const requestType = document.getElementById("requestType");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const shiftStart = document.getElementById("shiftStart");
    const shiftEnd = document.getElementById("shiftEnd");

    requestType.addEventListener("change", () => {
        if (requestType.value === "shift") {
            endDate.style.display = "none";
            shiftStart.style.display = "block";
            shiftEnd.style.display = "block";
        } else {
            endDate.style.display = "block";
            shiftStart.style.display = "none";
            shiftEnd.style.display = "none";
        }
    });

    requestForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("employeeName").value;
        const type = requestType.value;
        let requestText;

        if (type === "vacation") {
            requestText = `${name}: Отпуск с ${startDate.value} по ${endDate.value}`;
        } else {
            requestText = `${name}: Смена ${startDate.value}, ${shiftStart.value} - ${shiftEnd.value}`;
        }

        db.requests.push(requestText);
        saveDB();
        document.getElementById("requestMessage").textContent = "Заявка отправлена!";
        requestForm.reset();
        setTimeout(() => document.getElementById("requestMessage").textContent = "", 3000);
    });
}

// Админ-панель (admin.html)
if (document.getElementById("loginForm")) {
    const loginForm = document.getElementById("loginForm");
    const adminPanel = document.getElementById("adminPanel");
    const requestList = document.getElementById("requestList");
    const adminTimeLog = document.getElementById("adminTimeLog");
    const adminPass = "admin123"; // Пароль для админа

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (document.getElementById("adminPass").value === adminPass) {
            loginForm.style.display = "none";
            adminPanel.style.display = "block";

            db.requests.forEach(req => {
                const li = document.createElement("li");
                li.textContent = req;
                requestList.appendChild(li);
            });

            db.timeLogs.forEach(log => {
                const li = document.createElement("li");
                li.textContent = log;
                adminTimeLog.appendChild(li);
            });
        } else {
            alert("Неверный пароль!");
        }
    });
}

// Параллакс и анимации
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        let scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
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

document.addEventListener("DOMContentLoaded", animateOnScroll);
