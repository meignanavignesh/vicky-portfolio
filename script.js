// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => io.observe(el));

// Cursor glow (desktop hover only)
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover)').matches && glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// Local spotlight glow for the dark contact + footer zone
const darkZone = document.querySelector('.dark-zone');
if (window.matchMedia('(hover: hover)').matches && darkZone) {
  darkZone.addEventListener('pointermove', (e) => {
    const rect = darkZone.getBoundingClientRect();
    darkZone.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    darkZone.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

// Smooth-scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
