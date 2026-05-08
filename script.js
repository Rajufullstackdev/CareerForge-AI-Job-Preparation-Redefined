// ── Cursor ──
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = -100,
  my = -100,
  rx = -100,
  ry = -100;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
function animateCursor() {
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── Nav scroll ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// ── Mobile menu ──
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () =>
    document.getElementById("navLinks").classList.remove("open"),
  );
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 60);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((r) => io.observe(r));

// ── How it works steps ──
const stepData = [
  {
    emoji: "👤",
    title: "Build Your Profile",
    desc: "Upload your resume. AI extracts everything instantly.",
    progress: 25,
  },
  {
    emoji: "🎯",
    title: "Get Matched to Roles",
    desc: "See your fit score for thousands of open positions.",
    progress: 50,
  },
  {
    emoji: "🎙️",
    title: "Practice with AI Coach",
    desc: "Drill real interview questions, get real feedback.",
    progress: 75,
  },
  {
    emoji: "🏆",
    title: "Negotiate & Land Offer",
    desc: "Walk in confident. Walk out with a better package.",
    progress: 100,
  },
];

let currentStep = 0;
function setStep(idx) {
  currentStep = idx;
  document.querySelectorAll(".step").forEach((s, i) => {
    s.classList.toggle("active", i === idx);
  });
  const d = stepData[idx];
  document.getElementById("visualEmoji").textContent = d.emoji;
  document.getElementById("visualTitle").textContent = d.title;
  document.getElementById("visualDesc").textContent = d.desc;
  const bar = document.getElementById("barFill");
  bar.style.width = "0";
  setTimeout(() => {
    bar.style.width = d.progress + "%";
  }, 50);
}

// Auto-rotate steps
setStep(0);
setInterval(() => {
  setStep((currentStep + 1) % 4);
}, 3500);
