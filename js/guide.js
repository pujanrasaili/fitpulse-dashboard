// guide.js
let currentStep = 0;
const TOTAL = 4;

function updateStepper() {
  for (let i = 0; i < TOTAL; i++) {
    const sc = document.getElementById('sc' + i);
    const sl = document.getElementById('sl' + i);
    sc.className = 'step-circle' + (i === currentStep ? ' active' : i < currentStep ? ' done' : '');
    sl.className = 'step-label' + (i === currentStep ? ' active' : '');
    document.getElementById('panel' + i).className = 'panel' + (i === currentStep ? ' active' : '');
    if (i < TOTAL - 1) {
      document.getElementById('con' + i).className = 'step-connector' + (i < currentStep ? ' done' : '');
    }
  }
  document.getElementById('topProgress').style.width = (((currentStep + 1) / TOTAL) * 100) + '%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goStep(i) { currentStep = i; updateStepper(); }
function nextStep() { if (currentStep < TOTAL - 1) { currentStep++; updateStepper(); } }
function prevStep() { if (currentStep > 0) { currentStep--; updateStepper(); } }

function selectGoal(el) {
  document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}
function toggleExercise(el) { el.classList.toggle('selected'); }
function toggleDay(el) { el.classList.toggle('selected'); }

function saveStep0() {
  const name = document.getElementById('userName').value.trim();
  const level = document.getElementById('fitnessLevel').value;
  const goal = document.querySelector('.goal-btn.selected')?.dataset.goal || 'health';
  Store.set('profile', { name, level, goal });
  // Update sidebar immediately
  if (name) {
    document.getElementById('userNameDisplay').textContent = name;
    document.getElementById('userAvatar').textContent = name.charAt(0).toUpperCase();
  }
  nextStep();
}

function saveStep1() {
  const exercises = [...document.querySelectorAll('.exercise-item.selected')].map(el => el.dataset.ex);
  const days = [...document.querySelectorAll('.day-btn.selected')].map(el => el.dataset.day);
  const duration = document.querySelector('input[type="range"]').value;
  Store.set('workout', { exercises, days, duration: parseInt(duration) });
  nextStep();
}

function updateNutrition(cal) {
  cal = parseInt(cal);
  document.getElementById('calOut').textContent = cal.toLocaleString() + ' kcal';
  document.getElementById('protVal').textContent = Math.round(cal * 0.30 / 4) + 'g';
  document.getElementById('carbVal').textContent = Math.round(cal * 0.50 / 4) + 'g';
  document.getElementById('fatVal').textContent = Math.round(cal * 0.20 / 9) + 'g';
  const r = cal / 1850;
  document.getElementById('m1').textContent = Math.round(420 * r) + ' kcal';
  document.getElementById('m2').textContent = Math.round(550 * r) + ' kcal';
  document.getElementById('m3').textContent = Math.round(180 * r) + ' kcal';
  document.getElementById('m4').textContent = Math.round(620 * r) + ' kcal';
}

function finishSetup() {
  const cal = parseInt(document.getElementById('calSlider').value);
  Store.set('nutrition', {
    calories: cal,
    protein: Math.round(cal * 0.30 / 4),
    carbs: Math.round(cal * 0.50 / 4),
    fat: Math.round(cal * 0.20 / 9),
  });
  Store.set('setupDone', true);
  window.location.href = '../index.html';
}

// Restore saved values on load
document.addEventListener('DOMContentLoaded', () => {
  const profile = Store.get('profile');
  if (profile) {
    if (profile.name) document.getElementById('userName').value = profile.name;
    if (profile.level) document.getElementById('fitnessLevel').value = profile.level;
    if (profile.goal) {
      document.querySelectorAll('.goal-btn').forEach(b => {
        b.classList.toggle('selected', b.dataset.goal === profile.goal);
      });
    }
  }
});
