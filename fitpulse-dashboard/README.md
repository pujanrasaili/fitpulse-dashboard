# FitPulse Dashboard

A fitness & health analytics dashboard — track workouts, calories, sleep, and progress over time with beautiful interactive charts.

---

## Project structure

```
fitpulse-dashboard/
├── index.html              ← Main dashboard
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── storage.js          ← localStorage helper (runs on every page)
│   ├── dashboard.js        ← Charts, week navigation, metrics
│   └── guide.js            ← Step-by-step setup guide logic
└── pages/
    ├── guide.html          ← Setup guide (4 steps)
    ├── workout.html        ← Workout logger & schedule
    └── nutrition.html      ← Meal tracker & macros
```

---

## Step 1 — Open in VSCode

```bash
# Clone or move the folder, then open it
code fitpulse-dashboard
```

---

## Step 2 — Install Live Server extension

1. In VSCode press `Ctrl+Shift+X` (Extensions panel)
2. Search **Live Server** by Ritwick Dey
3. Click **Install**

> Live Server lets you open HTML files in the browser with auto-reload on save — no build step needed.

---

## Step 3 — Run the project

1. Right-click `index.html` in the file explorer
2. Select **Open with Live Server**
3. Your browser opens at `http://127.0.0.1:5500`

---

## Step 4 — Push to GitHub

```bash
# Inside the project folder:
git init
git add .
git commit -m "feat: initial FitPulse dashboard"

# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/fitpulse-dashboard.git
git branch -M main
git push -u origin main
```

---

## Pages

| Page | URL | What it does |
|------|-----|--------------|
| Dashboard | `/index.html` | Charts, metrics, week navigation |
| Setup Guide | `/pages/guide.html` | 4-step onboarding flow |
| Workouts | `/pages/workout.html` | Log sessions, view schedule |
| Nutrition | `/pages/nutrition.html` | Log meals, track macros |

---

## How data is saved

Everything is saved in **localStorage** — no backend needed. The `Store` helper in `js/storage.js` wraps `localStorage` with JSON serialisation.

Keys used:
- `fitpulse_profile` — name, fitness level, goal
- `fitpulse_workout` — exercises, days, duration
- `fitpulse_nutrition` — calorie target, macros
- `fitpulse_sessions` — logged workout sessions (array)
- `fitpulse_meals` — logged meals (array)
- `fitpulse_setupDone` — whether guide was completed

To reset all data:
```javascript
// Open browser console and run:
Object.keys(localStorage).filter(k => k.startsWith('fitpulse_')).forEach(k => localStorage.removeItem(k));
```

---

## Recommended VSCode extensions

| Extension | Purpose |
|-----------|---------|
| Live Server | Auto-reload on save |
| Prettier | Code formatting |
| ESLint | JS linting |
| GitLens | Git history inline |

---

## Next steps to build

- [ ] Export weekly PDF summary
- [ ] Dark mode toggle
- [ ] Sync with real fitness APIs (Strava, Apple Health)
- [ ] PWA — install as mobile app
- [ ] Charts drill-down on click
