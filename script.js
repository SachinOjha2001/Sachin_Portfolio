/* script.js - interactions: mobile menu, typing loop, fade-in observer */

/* Mobile menu toggle */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

/* Typing animation (looping) */
const typedLine = document.getElementById('typed-line');
const phrases = [
  "Full Stack Developer | MERN Stack | Java Enthusiast",
  "Building Scalable Web Experiences",
  "React • Node • MongoDB • Java"
];

let tIndex = 0, charIndex = 0, typing = true;
function loopTyping() {
  const current = phrases[tIndex];
  if (typing) {
    charIndex++;
    typedLine.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typing = false;
      setTimeout(loopTyping, 1400); // pause at full phrase
      return;
    }
  } else {
    charIndex--;
    typedLine.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typing = true;
      tIndex = (tIndex + 1) % phrases.length;
    }
  }
  setTimeout(loopTyping, typing ? 80 : 40);
}
if (typedLine) loopTyping();

/* IntersectionObserver -> fade-in sections */
const fades = document.querySelectorAll('.fade-section');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // keep observed (no unobserve) so animation stays
    }
  });
}, { threshold: 0.18 });

fades.forEach(f => obs.observe(f));

/* Smooth scroll offset fix for fixed nav */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70; // 70px offset for fixed nav
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile menu after click
      if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    }
  });
});
