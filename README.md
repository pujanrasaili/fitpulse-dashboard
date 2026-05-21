# 🏃 FitPulse Dashboard

> A sleek fitness & health analytics dashboard — track workouts, calories, sleep, and progress over time with beautiful interactive charts.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)

---

## ✨ Features

- **Dashboard** — weekly metrics (calories, workouts, distance, sleep) with week-by-week navigation
- **Interactive charts** — daily calories bar chart, heart rate zones donut, sleep quality line chart
- **Setup guide** — 4-step onboarding: profile → workout builder → dashboard tour → nutrition plan
- **Workout logger** — log sessions, view your weekly schedule, track estimated calories burned
- **Nutrition tracker** — log meals, set calorie targets, auto-calculated macro split
- **Persistent storage** — all data saved to localStorage, no backend needed
- **Responsive** — works on desktop and mobile

---

## 📁 Project Structure

```
fitpulse-dashboard/
├── index.html              ← Main dashboard
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── storage.js          ← localStorage helper
│   ├── dashboard.js        ← Charts, week navigation, metrics
│   └── guide.js            ← Setup guide logic
└── pages/
    ├── guide.html          ← 4-step setup guide
    ├── workout.html        ← Workout logger & schedule
    └── nutrition.html      ← Meal tracker & macro charts
```

---

## 🚀 Getting Started

### Option 1 — Live Server (recommended)

1. Open the folder in [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

### Option 2 — Just open in browser

Double-click `index.html` — it works without any server.

---

## 🛠️ Built With

| Tool | Purpose |
|------|---------|
| [Chart.js](https://www.chartjs.org/) | Interactive charts |
| [Tabler Icons](https://tabler-icons.io/) | Icon set |
| localStorage API | Data persistence |
| Vanilla JS | No frameworks, no build step |

---

## 📦 Data Storage

All data is saved in your browser's **localStorage** — nothing leaves your device.

| Key | What it stores |
|-----|---------------|
| `fitpulse_profile` | Name, fitness level, goal |
| `fitpulse_workout` | Exercises, schedule days, duration |
| `fitpulse_nutrition` | Calorie target & macros |
| `fitpulse_sessions` | Logged workout sessions |
| `fitpulse_meals` | Logged meals |

**To reset all data**, open the browser console and run:
```js
Object.keys(localStorage)
  .filter(k => k.startsWith('fitpulse_'))
  .forEach(k => localStorage.removeItem(k));
```

---

## 🗺️ Pages

| Page | File | Description |
|------|------|-------------|
| Dashboard | `index.html` | Charts, metrics, week navigation |
| Setup Guide | `pages/guide.html` | 4-step personalisation flow |
| Workouts | `pages/workout.html` | Log & view sessions |
| Nutrition | `pages/nutrition.html` | Meals & macro tracking |

---

## 🔮 Roadmap

- [ ] Dark mode toggle
- [ ] Export weekly summary as PDF
- [ ] Progressive Web App (installable on mobile)
- [ ] Strava / Apple Health integration
- [ ] Drill-down on chart clicks
- [ ] Streak tracking & badges

---

## 👤 Author

**Pujan Rasaili**
- GitHub: [@pujanrasaili](https://github.com/pujanrasaili)

---

## 📄 License

MIT — free to use and modify.