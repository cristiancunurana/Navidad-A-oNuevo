// ===========================
// Variables globales
// ===========================
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const startBtn = document.getElementById('start-btn');
const christmasAudio = document.getElementById('christmas-audio');
const newYearAudio = document.getElementById('newyear-audio');
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const modalMonth = document.getElementById('modal-month');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const ornaments = document.querySelectorAll('.ornament');
const appBody = document.getElementById('app-body');

// Elementos de los contadores
const countdownTitle = document.getElementById('countdown-title');
const countdownChristmas = document.getElementById('countdown-christmas');
const countdownNewYear = document.getElementById('countdown-newyear');
const christmasMessage = document.getElementById('christmas-message');
const newYearMessage = document.getElementById('newyear-message');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const nyDaysEl = document.getElementById('ny-days');
const nyHoursEl = document.getElementById('ny-hours');
const nyMinutesEl = document.getElementById('ny-minutes');
const nySecondsEl = document.getElementById('ny-seconds');

const daysPassedEl = document.getElementById('days-passed');

// Elemento del círculo de progreso
const progressCircle = document.querySelector('.progress-ring-circle');

// Variables de control
let countdownInterval;
let yearCounterInterval;
let currentAudio = null;

// Configuración del círculo de progreso
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Meses en español
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// ===========================
// Init
// ===========================
function init() {
    updateThemeAndState(); // Set initial state immediately

    startBtn.addEventListener('click', () => {
        // Ocultar pantalla de bienvenida
        welcomeScreen.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 500);

        playContextualMusic();

        // Iniciar bucles de tiempo
        startCountdowns();
        startYearCounter();
    });
}

// Check state on load
init();


// ===========================
// Lógica de Estado (Navidad vs Año Nuevo)
// ===========================
function updateThemeAndState() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25, 0, 0, 0); // Dec 25

    // Si YA ES o YA PASÓ dia 25 de diciembre, cambiamos a modo Año Nuevo
    if (now >= christmas) {
        setNewYearMode();
    } else {
        setChristmasMode();
    }
}

function setChristmasMode() {
    appBody.classList.remove('theme-newyear');
    appBody.classList.add('theme-christmas');

    // Solo manejamos el tema visual y audio aqui
}

function setNewYearMode() {
    appBody.classList.remove('theme-christmas');
    appBody.classList.add('theme-newyear');

    // Solo manejamos el tema visual y audio aqui
}


// ===========================
// Audio Logic
// ===========================
function playContextualMusic() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25, 0, 0, 0);

    // Stop currrent if playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    if (now < christmas) {
        // Antes de Navidad -> Musica Navidad
        currentAudio = christmasAudio;
    } else {
        // Despues de Navidad -> Musica Año Nuevo
        currentAudio = newYearAudio;
    }

    currentAudio.volume = 0.3;
    currentAudio.play().catch(console.error);
}

function switchMusicSmoothly(toAudio) {
    if (currentAudio === toAudio) return;

    // Fade out current
    let fadeOut = setInterval(() => {
        if (currentAudio.volume > 0.05) {
            currentAudio.volume -= 0.05;
        } else {
            clearInterval(fadeOut);
            currentAudio.pause();
            currentAudio.currentTime = 0;

            // Start new one
            currentAudio = toAudio;
            currentAudio.volume = 0;
            currentAudio.play().catch(console.error);

            // Fade in
            let fadeIn = setInterval(() => {
                if (currentAudio.volume < 0.3) {
                    currentAudio.volume += 0.05;
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
        }
    }, 200);
}


// ===========================
// Contadores
// ===========================
function startCountdowns() {
    updateCountdowns();
    countdownInterval = setInterval(updateCountdowns, 1000);
}

function getChristmasDate() {
    const now = new Date();
    const y = now.getFullYear();
    let d = new Date(y, 11, 25, 0, 0, 0);
    if (now > d) d = new Date(y + 1, 11, 25, 0, 0, 0); // Si ya paso, next year
    return d;
}

function getNewYearDate() {
    const now = new Date();
    const y = now.getFullYear();
    // Siempre buscamos el proximo 1 de Enero
    let d = new Date(y + 1, 0, 1, 0, 0, 0);
    return d;
}

function updateCountdowns() {
    const now = new Date();

    // --- Lógica de Transición en Tiempo Real ---
    const currentYear = now.getFullYear();
    const christmasDate = new Date(currentYear, 11, 25, 0, 0, 0);

    if (now >= christmasDate && appBody.classList.contains('theme-christmas')) {
        // Transición LIVE de Navidad a Año Nuevo
        setNewYearMode();
        switchMusicSmoothly(newYearAudio);
        return; // UI updated in next tick
    }

    // --- Calcular Tiempos ---

    // --- Calcular Tiempos ---

    // 1. Christmas Timer
    const xmasTarget = getChristmasDate();
    const xmasDiff = xmasTarget - now;

    if (xmasDiff <= 0) {
        // Ya es Navidad
        countdownChristmas.classList.add('hidden');
        christmasMessage.classList.remove('hidden');
    } else {
        countdownChristmas.classList.remove('hidden');
        christmasMessage.classList.add('hidden');
        const t = getTimeParts(xmasDiff);
        daysEl.textContent = t.days;
        hoursEl.textContent = t.hours;
        minutesEl.textContent = t.minutes;
        secondsEl.textContent = t.seconds;
    }

    // 2. New Year Timer
    // Siempre calculamos el timer de Año Nuevo
    const nyTarget = getNewYearDate();
    const nyDiff = nyTarget - now;

    if (nyDiff <= 0) {
        // Feliz año nuevo!
        countdownNewYear.classList.add('hidden');
        newYearMessage.classList.remove('hidden');
    } else {
        countdownNewYear.classList.remove('hidden');
        newYearMessage.classList.add('hidden');
        const t = getTimeParts(nyDiff);
        nyDaysEl.textContent = t.days;
        nyHoursEl.textContent = t.hours;
        nyMinutesEl.textContent = t.minutes;
        nySecondsEl.textContent = t.seconds;
    }
}

function getTimeParts(ms) {
    if (ms <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}


// ===========================
// Contador de días del año + Círculo de Progreso
// ===========================
function startYearCounter() {
    updateYearCounter();
    yearCounterInterval = setInterval(updateYearCounter, 1000 * 60 * 60);
}

function updateYearCounter() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

    const diff = now - startOfYear;
    const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

    // Actualizar número de días
    daysPassedEl.textContent = daysPassed;

    // Calcular porcentaje del año completado
    const totalDays = 366; // 2024 es año bisiesto
    const percentage = (daysPassed / totalDays) * 100;

    // Actualizar círculo de progreso
    updateProgressCircle(percentage);
}

function updateProgressCircle(percent) {
    // Calcular offset para el círculo (100% = 0 offset, 0% = circumference offset)
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Cambiar color según el progreso
    if (percent < 33) {
        progressCircle.style.stroke = '#FFD700'; // Dorado al inicio
    } else if (percent < 66) {
        progressCircle.style.stroke = '#FFA500'; // Naranja en medio
    } else {
        progressCircle.style.stroke = '#FF6347'; // Rojo al final del año
    }
}

// ===========================
// Interacción con las bolitas
// ===========================
ornaments.forEach(ornament => {
    ornament.addEventListener('click', () => {
        const month = ornament.getAttribute('data-month');
        const imgSrc = ornament.querySelector('img').src;
        const monthName = monthNames[parseInt(month) - 1];

        modalImg.src = imgSrc;
        modalMonth.textContent = monthName;
        modal.classList.remove('hidden');
    });
});

function closeModal() {
    modal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});