// storage.js — simple localStorage wrapper for FitPulse

const Store = {
  get(key) {
    try {
      const val = localStorage.getItem('fitpulse_' + key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },
  set(key, value) {
    try {
      localStorage.setItem('fitpulse_' + key, JSON.stringify(value));
    } catch (e) { console.warn('Storage error:', e); }
  },
  remove(key) {
    localStorage.removeItem('fitpulse_' + key);
  }
};

// Load user profile into sidebar on every page
document.addEventListener('DOMContentLoaded', () => {
  const profile = Store.get('profile');
  const nameEl = document.getElementById('userNameDisplay');
  const avatarEl = document.getElementById('userAvatar');
  if (profile && profile.name && nameEl && avatarEl) {
    nameEl.textContent = profile.name;
    avatarEl.textContent = profile.name.charAt(0).toUpperCase();
  }
});
