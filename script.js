const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark');
    themeToggle.querySelector('span').textContent = 'Light';
  } else {
    document.body.classList.remove('dark');
    themeToggle.querySelector('span').textContent = 'Dark';
  }
  localStorage.setItem('theme', mode);
}

const initialTheme = savedTheme || (preferDark ? 'dark' : 'light');
setTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));
