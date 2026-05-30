// theme.js — dark mode toggle, works on all pages
(function () {
  const saved = localStorage.getItem('fitpulse_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fitpulse_theme', theme);
    updateToggleBtn(theme);
  }

  function updateToggleBtn(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? '<i class="ti ti-sun"></i> Light mode'
      : '<i class="ti ti-moon"></i> Dark mode';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('fitpulse_theme') || 'light';
    setTheme(theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);
  });
})();