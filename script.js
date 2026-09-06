// ============================================================
// PERSONAL SETTINGS — EDIT THESE IF YOU WANT TO CUSTOMIZE
// ============================================================

// Ulang tahun Bbee: 8 September.
// Tahun otomatis mengikuti tahun sekarang.
// Jika ingin countdown ke tahun tertentu, ganti angka di bawah.
const birthdayMonth = 8; // September = 8 (0 = January)
const birthdayDay = 8;

// Nama/panggilan
const girlfriendName = "Mira Aulia Safitri";
const nickname = "Bbee";

// ============================================================
// OPENING + MUSIC
// ============================================================
const opening = document.getElementById("opening");
const mainContent = document.getElementById("main-content");
const openBtn = document.getElementById("open-btn");
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

openBtn.addEventListener("click", () => {
  opening.classList.add("hide");
  mainContent.classList.remove("hidden");
  document.body.style.overflow = "auto";
  startMusic();
  launchConfetti(80);
  setTimeout(() => opening.remove(), 900);
});

function startMusic() {
  music.play().then(() => {
    musicBtn.classList.add("playing");
    musicBtn.textContent = "❚❚";
  }).catch(() => {
    // Browser mungkin memblokir audio. User bisa menekan tombol musik.
  });
}

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add("playing");
    musicBtn.textContent = "❚❚";
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♫";
  }
});

// ============================================================
// COUNTDOWN
// ============================================================
function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, birthdayMonth, birthdayDay, 0, 0, 0);

  // Jika ulang tahun tahun ini sudah lewat, target tahun depan.
  if (now > target) target = new Date(year + 1, birthdayMonth, birthdayDay, 0, 0, 0);
  return target;
}

let birthdayTarget = getNextBirthday();

function updateCountdown() {
  const now = new Date();
  const diff = birthdayTarget - now;

  if (diff <= 0) {
    document.getElementById("countdown-grid").classList.add("hidden");
    document.getElementById("birthday-message").classList.remove("hidden");
    launchConfetti(150);
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// SCROLL REVEAL
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ============================================================
// FLOATING HEARTS
// ============================================================
const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (7 + Math.random() * 8) + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 16000);
}
setInterval(createHeart, 1300);

// ============================================================
// LOVE CARDS
// ============================================================
document.querySelectorAll(".love-card").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("active"));
});

// ============================================================
// PHOTO LIGHTBOX
// ============================================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    lightboxImg.src = img.src;
    lightbox.classList.remove("hidden");
  });
});

document.getElementById("lightbox-close").addEventListener("click", () => {
  lightbox.classList.add("hidden");
});
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.classList.add("hidden");
});

// ============================================================
// MINI QUIZ — EDIT QUESTIONS/ANSWERS HERE
// ============================================================
const questions = [
  {
    question: "Siapa yang biasanya lebih banyak cerita ketika kita ketemu?",
    answers: ["Aku", "Bbee 😆", "Dua-duanya", "Tergantung mood"],
    correct: 1
  },
  {
    question: "Kalau aku lebih sering melakukan apa ketika kamu sedang cerita?",
    answers: ["Main HP", "Tidur", "Mendengarkan kamu", "Kabur 😂"],
    correct: 2
  },
  {
    question: "Apa yang paling sering aku hargai dari kamu?",
    answers: ["Kamu suka makan", "Kamu selalu care dan pengertian", "Kamu suka tidur", "Kamu suka marah"],
    correct: 1
  },
  {
    question: "Kita resmi menjadi pasangan sekitar...",
    answers: ["2 hari", "2 minggu", "2 bulan", "2 tahun"],
    correct: 2
  },
  {
    question: "Pertanyaan paling penting: apakah kamu mau bikin lebih banyak memories sama aku?",
    answers: ["YES ❤️", "YES BANGET ❤️❤️", "Of course!", "Semua jawaban benar 😌"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("quiz-progress-bar");
const feedback = document.getElementById("quiz-feedback");
const quiz = document.getElementById("quiz");
const result = document.getElementById("quiz-result");

function renderQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionNumber.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  feedback.textContent = "";
  answersContainer.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    btn.addEventListener("click", () => chooseAnswer(index));
    answersContainer.appendChild(btn);
  });
}

function chooseAnswer(index) {
  const q = questions[currentQuestion];
  const buttons = [...document.querySelectorAll(".answer")];

  buttons.forEach(b => b.disabled = true);

  if (index === q.correct) {
    score++;
    buttons[index].classList.add("correct");
    feedback.textContent = "Correct! 😌❤️";
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    feedback.textContent = "Hmm... 😆 but I still love you.";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 900);
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  document.getElementById("score-text").textContent =
    `You got ${score} / ${questions.length} ❤️`;

  let message;
  if (score === questions.length) {
    message = "Okay, you definitely know us. Now you owe me more memories. 😌";
  } else if (score >= 3) {
    message = "Not bad, Bbee. I think you know me pretty well. 🫶";
  } else {
    message = "Looks like we need more time together so you can study me. 😂❤️";
  }
  document.getElementById("result-message").textContent = message;
}

document.getElementById("restart-quiz").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});
renderQuestion();

// ============================================================
// FINAL SURPRISE
// ============================================================
const finalLetter = document.getElementById("final-letter");

document.getElementById("final-btn").addEventListener("click", () => {
  finalLetter.classList.remove("hidden");
  launchConfetti(100);
});

document.getElementById("close-letter").addEventListener("click", () => {
  finalLetter.classList.add("hidden");
});

document.getElementById("yes-btn").addEventListener("click", () => {
  launchConfetti(250);

  const card = document.querySelector(".final-card");
  card.innerHTML = `
    <div style="text-align:center;padding:35px 10px;">
      <div style="font-size:5rem;animation:pulse 1.5s infinite;">❤️</div>
      <p class="eyebrow">Then it's a promise.</p>
      <h2>Let's make them. <em>Together.</em></h2>
      <p style="margin-top:20px;">More stories. More laughs. More random conversations. More little moments.</p>
      <p style="margin-top:15px;color:#a94f68;font-family:'Cormorant Garamond';font-size:1.6rem;">Happy Birthday, Bbee. ♡</p>
    </div>
  `;
});

// ============================================================
// SIMPLE CONFETTI — NO LIBRARY NEEDED
// ============================================================
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let confettiAnimation = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti(amount = 100) {
  const shapes = ["rect", "circle"];
  for (let i = 0; i < amount; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 250,
      size: 5 + Math.random() * 7,
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      rotation: Math.random() * Math.PI,
      rotationSpeed: -.1 + Math.random() * .2,
      life: 180 + Math.random() * 100,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    });
  }
  if (!confettiAnimation) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.speedY += .025;
    p.rotation += p.rotationSpeed;
    p.life--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 60));
    ctx.fillStyle = ["#d97991", "#f2b6c4", "#c96f87", "#f7d6de", "#b65d77"][Math.floor(Math.random() * 5)];

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .65);
    }
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(p => p.life > 0 && p.y < canvas.height + 30);

  if (confettiPieces.length) {
    confettiAnimation = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimation = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
