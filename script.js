// Частицы
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00ddeb" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#00ddeb", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// БД
let db = JSON.parse(localStorage.getItem("timeFlowDB")) || {
    users: [{ username: "admin", password: "admin123", isAdmin: true }],
    timeLogs: [],
    requests: []
};
function saveDB() { localStorage.setItem("timeFlowDB", JSON.stringify(db)); }

// Авторизация
let currentUser = null;

function updateUI() {
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const adminLink = document.getElementById("adminLink");

    if (currentUser) {
        loginLink.style.display = "none";
        logoutLink.style.display = "inline";
        if (currentUser.isAdmin) adminLink.style.display = "inline";
        if (document.getElementById("currentUser")) {
            document.getElementById("currentUser").textContent = currentUser.username;
            document.getElementById("userGreeting").style.display = "block";
            document.getElementById("startStopBtn").disabled = false;
        }
        if (document.getElementById("requestForm")) {
            document.getElementById("requestForm").style.display = "block";
            document.getElementById("loginPrompt").style.display = "none";
            document.getElementById("employeeName").value = currentUser.username;
        }
        if (document.getElementById("adminPanel") && currentUser.isAdmin) {
            document.getElementById("adminPanel").style.display = "block";
            document.getElementById("adminPrompt").style.display = "none";
        }
    } else {
        loginLink.style.display = "inline";
        logoutLink.style.display = "none";
        adminLink.style.display = "none";
        if (document.getElementById("userGreeting")) document.getElementById("userGreeting").style.display = "none";
        if (document.getElementById("requestForm")) document.getElementById("requestForm").style.display = "none";
        if (document.getElementById("adminPanel")) document.getElementById("adminPanel").style.display = "none";
    }
}

// Учет времени
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
            startStopBtn.textContent = "Закончить";
            setInterval(updateTimer, 1000);
        } else {
            isWorking = false;
            startStopBtn.textContent = "Начать работу";
            const endTime = new Date();
            const log = `${currentUser.username}: Работа ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`;
            db.timeLogs.push(log);
            saveDB();
            const li = document.createElement("li");
            li.textContent = log;
            timeLog.appendChild(li);
            document.getElementById("timer").textContent = "00:00:00";
        }
    });
}

// Авторизация/Регистрация
if (document.getElementById("authForm")) {
    const authForm = document.getElementById("authForm");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const authMessage = document.getElementById("authMessage");

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const user = db.users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            authMessage.textContent = "Успешный вход!";
            setTimeout(() => window.location.href = "index.html", 1000);
        } else {
            authMessage.textContent = "Неверный логин или пароль!";
        }
    });

    registerBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (db.users.find(u => u.username === username)) {
            authMessage.textContent = "Пользователь уже существует!";
        } else {
            db.users.push({ username, password, isAdmin: false });
            saveDB();
            authMessage.textContent = "Регистрация успешна! Теперь войдите.";
        }
    });
}

// Заявки
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
            requestText = `${name}: Отпуск с ${startDate.value} по ${endDate.value} (Ожидает подтверждения)`;
        } else {
            requestText = `${name}: Смена ${startDate.value}, ${shiftStart.value} - ${shiftEnd.value} (Ожидает подтверждения)`;
        }

        db.requests.push(requestText);
        saveDB();
        document.getElementById("requestMessage").textContent = "Заявка отправлена на подтверждение!";
        requestForm.reset();
        setTimeout(() => document.getElementById("requestMessage").textContent = "", 3000);
    });
}

// Админ
if (document.getElementById("adminPanel")) {
    const adminPanel = document.getElementById("adminPanel");
    const requestList = document.getElementById("requestList");
    const adminTimeLog = document.getElementById("adminTimeLog");
    const userList = document.getElementById("userList");

    if (currentUser && currentUser.isAdmin) {
        adminPanel.style.display = "block";
        document.getElementById("adminPrompt").style.display = "none";

        db.requests.forEach((req, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${req} <button class="btn neon-btn approve-btn" data-index="${index}">Подтвердить</button>`;
            requestList.appendChild(li);
        });

        db.timeLogs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = log;
            adminTimeLog.appendChild(li);
        });

        db.users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.username} ${user.isAdmin ? "(Админ)" : ""}`;
            userList.appendChild(li);
        });

        document.querySelectorAll(".approve-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                db.requests[index] = db.requests[index].replace("Ожидает подтверждения", "Подтверждено");
                saveDB();
                window.location.reload();
            });
        });
    }
}

// Выход
if (document.getElementById("logoutLink")) {
    document.getElementById("logoutLink").addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    updateUI();

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
    animateOnScroll();
});
