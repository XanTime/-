// Прокрутка вниз до наступного розділу
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
  scrollDownBtn.addEventListener('click', () => {
    document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
  });
}

// Анімація появи секцій при скролі
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appeared');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));

// Анімація зірок на фоні
const starCanvas = document.createElement('canvas');
starCanvas.id = 'starCanvas';
document.body.appendChild(starCanvas);

const starCtx = starCanvas.getContext('2d');
let starWidth = starCanvas.width = window.innerWidth;
let starHeight = starCanvas.height = window.innerHeight;

let stars = [];

// Створення зірок
function createStars() {
    stars = [];
    const starCount = 200; // Кількість зірок
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starWidth,
            y: Math.random() * starHeight,
            radius: Math.random() * 1.5,
            brightness: Math.random() * 0.5 + 0.5, // Яскравість зірки
            speed: Math.random() * 0.05 // Швидкість миготіння
        });
    }
}

function drawStars() {
    starCtx.clearRect(0, 0, starWidth, starHeight);
    starCtx.fillStyle = '#000';
    starCtx.fillRect(0, 0, starWidth, starHeight);

    stars.forEach(star => {
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        starCtx.fill();

        // Анімація миготіння
        star.brightness += star.speed;
        if (star.brightness > 1 || star.brightness < 0.5) {
            star.speed = -star.speed;
        }
    });

    requestAnimationFrame(drawStars);
}

// Малювання та анімація зірок
window.addEventListener('resize', () => {
    starWidth = starCanvas.width = window.innerWidth;
    starHeight = starCanvas.height = window.innerHeight;
    createStars();
});

createStars();
drawStars();

// Таймер від дня знайомства
const startDate = new Date(2023, 7, 5);
function updateRelationshipTime() {
  const now = new Date();
  let diffMs = now - startDate;

  const yearMs   = 365.25 * 24 * 60 * 60 * 1000;
  const weekMs   = 7 * 24 * 60 * 60 * 1000;
  const dayMs    = 24 * 60 * 60 * 1000;
  const hourMs   = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;
  const secondMs = 1000;

  const years   = Math.floor(diffMs / yearMs);
  diffMs       %= yearMs;

  const weeks   = Math.floor(diffMs / weekMs);
  diffMs       %= weekMs;

  const days    = Math.floor(diffMs / dayMs);
  diffMs       %= dayMs;

  const hours   = Math.floor(diffMs / hourMs);
  diffMs       %= hourMs;

  const minutes = Math.floor(diffMs / minuteMs);
  diffMs       %= minuteMs;

  const seconds = Math.floor(diffMs / secondMs);

  const timerEl = document.getElementById('relationshipTimer');
  if (timerEl) {
    timerEl.textContent =
      `${years} рік, ${weeks} тижнів, ${days} днів, ` +
      `${hours} год, ${minutes} хв, ${seconds} сек`;
  }
}
setInterval(updateRelationshipTime, 1000);
updateRelationshipTime();

// Музичний плеєр
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  // Плейлист
  {
    title: "Залежність",
    name: "Nikow",
    source: "song-list/Залежність - Nikow.mp3",
  },
  {
    title: "Tongue",
    name: "Maribou State",
    source: "song-list/tongue_-_maribou_state_feat_holly_walker_sped_up.mp3",
  },
  {
    title: "HONEST",
    name: "Baby Keem",
    source: "song-list/Baby_keem_honest_tiktok_version_full.mp3",
  },
  {
    title: "сліди",
    name: "хейтспіч",
    source: "song-list/сліди_feat_Shmiska_prod_by_fimamaru.mp3",
  },
  {
    title: "Mr. Rager",
    name: "Kid Cudi",
    source: "song-list/mr_rager_-_kid_cudi_sped_uppitched.mp3",
  },
  {
    title: "Мало слів",
    name: "5 vymir",
    source: "song-list/Мало слів - 5 vymir.mp3",
  },
  {
    title: "дом",
    name: "Cold Carti",
    source: "song-list/дом - Cold Carti.mp3",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  playSong();
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}
playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});
progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: currentSongIndex, 
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  playPause();
});

// Оновлений код для таймера аудіоплеєра
const audio = document.querySelector('audio');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const progressContainer = document.querySelector('.progress-container');

// Оновлення таймера
function updateTimer() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Оновлення значення прогрес-бару
    progressBar.style.width = (currentTime / duration) * 100 + '%';

    // Форматування часу
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

// Форматування часу у хвилини:секунди
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Додаємо подію оновлення таймера при відтворенні треку
audio.addEventListener('timeupdate', updateTimer);
audio.addEventListener('loadedmetadata', updateTimer);
