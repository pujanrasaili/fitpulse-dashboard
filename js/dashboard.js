// dashboard.js

const weekData = [
  { label: 'May 5 – 11', cal: 11900, workouts: 5, dist: 34.2, sleep: 6.8,
    daily: [1600,1800,1700,1950,1500,1800,1550],
    activities: [
      { name: 'Running', icon: 'ti-run', color: '#1D9E75', stat: '19 km · 3 sessions', pct: 63 },
      { name: 'Strength', icon: 'ti-barbell', color: '#378ADD', stat: '1 session · 45 min', pct: 50 },
      { name: 'Cycling', icon: 'ti-bike', color: '#EF9F27', stat: '1 session · 15 km', pct: 75 },
    ]
  },
  { label: 'May 12 – 18', cal: 12840, workouts: 6, dist: 38.4, sleep: 7.2,
    daily: [1720,1950,1830,2100,1680,1920,1640],
    activities: [
      { name: 'Running', icon: 'ti-run', color: '#1D9E75', stat: '22 km · 3 sessions', pct: 73 },
      { name: 'Strength', icon: 'ti-barbell', color: '#378ADD', stat: '2 sessions · 90 min', pct: 100 },
      { name: 'Swimming', icon: 'ti-swimming', color: '#7F77DD', stat: '1 session · 1.5 km', pct: 50 },
    ]
  },
  { label: 'May 19 – 25', cal: 13200, workouts: 6, dist: 40.1, sleep: 7.5,
    daily: [1800,2050,1900,2200,1750,1980,1520],
    activities: [
      { name: 'Running', icon: 'ti-run', color: '#1D9E75', stat: '24 km · 3 sessions', pct: 80 },
      { name: 'Strength', icon: 'ti-barbell', color: '#378ADD', stat: '2 sessions · 100 min', pct: 100 },
      { name: 'Yoga', icon: 'ti-yoga', color: '#D4537E', stat: '1 session · 60 min', pct: 100 },
    ]
  },
];

const sleepData = [
  [6.5, 7.1, 6.8, 7.4, 6.6, 7.2, 6.9],
  [6.5, 7.8, 7.2, 8.1, 6.9, 7.5, 7.0],
  [7.0, 7.6, 7.8, 8.2, 7.1, 7.9, 7.0],
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const GOAL = 1850;
let currentWeek = 1;

let calChart, hrChart, sleepChart;

function buildCharts(data, sleep) {
  const gridColor = 'rgba(0,0,0,0.05)';
  const textColor = '#9ca3af';

  if (calChart) calChart.destroy();
  calChart = new Chart(document.getElementById('calChart'), {
    data: {
      labels: DAYS,
      datasets: [
        {
          type: 'bar',
          label: 'Calories',
          data: data.daily,
          backgroundColor: data.daily.map(v => v >= GOAL ? '#1D9E75' : '#85B7EB'),
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          type: 'line',
          label: 'Goal',
          data: Array(7).fill(GOAL),
          borderColor: '#D85A30',
          borderDash: [5, 3],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } }, min: 1300, max: 2400 }
      }
    }
  });

  if (hrChart) hrChart.destroy();
  hrChart = new Chart(document.getElementById('hrChart'), {
    type: 'doughnut',
    data: {
      labels: ['Rest','Fat burn','Cardio','Peak'],
      datasets: [{ data: [30,25,30,15], backgroundColor: ['#85B7EB','#1D9E75','#EF9F27','#D85A30'], borderWidth: 0, hoverOffset: 6 }]
    },
    options: { responsive: true, cutout: '65%', plugins: { legend: { display: false } } }
  });

  if (sleepChart) sleepChart.destroy();
  sleepChart = new Chart(document.getElementById('sleepChart'), {
    type: 'line',
    data: {
      labels: DAYS,
      datasets: [{
        label: 'Sleep (hrs)',
        data: sleep,
        borderColor: '#7F77DD',
        backgroundColor: 'rgba(127,119,221,0.08)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#7F77DD',
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } }, min: 5, max: 10, stepSize: 1 }
      }
    }
  });
}

function buildActivities(activities) {
  const grid = document.getElementById('activityGrid');
  grid.innerHTML = activities.map(a => `
    <div class="activity-card">
      <div class="activity-icon"><i class="ti ${a.icon}" style="color:${a.color};"></i></div>
      <div class="activity-name">${a.name}</div>
      <div class="activity-stat">${a.stat}</div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${a.pct}%;background:${a.color};"></div>
      </div>
      <div class="progress-label">${a.pct === 100 ? 'Goal reached!' : a.pct + '% of weekly goal'}</div>
    </div>
  `).join('');
}

function updateMetrics(data) {
  document.getElementById('mCal').textContent = data.cal.toLocaleString();
  document.getElementById('mWorkouts').textContent = data.workouts;
  document.getElementById('mDist').textContent = data.dist;
  document.getElementById('mSleep').textContent = data.sleep;
  document.getElementById('weekDisplay').textContent = currentWeek === 1 ? 'This week' : data.label;
  document.getElementById('weekLabel').textContent = 'Week of ' + data.label;
}

function renderWeek() {
  const data = weekData[currentWeek];
  updateMetrics(data);
  buildCharts(data, sleepData[currentWeek]);
  buildActivities(data.activities);
}

// Week navigation
document.getElementById('prevWeek').addEventListener('click', () => {
  if (currentWeek > 0) { currentWeek--; renderWeek(); }
});
document.getElementById('nextWeek').addEventListener('click', () => {
  if (currentWeek < weekData.length - 1) { currentWeek++; renderWeek(); }
});

// Greeting
function setGreeting() {
  const h = new Date().getHours();
  const profile = Store.get('profile');
  const name = profile?.name ? ', ' + profile.name.split(' ')[0] : '';
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  document.getElementById('welcomeMsg').textContent = greet + name + '!';
}

document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  renderWeek();
});
