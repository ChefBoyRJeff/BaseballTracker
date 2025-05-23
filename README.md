# ⚾ MLB Stats Tracker

A complete stats tracker and prediction system for MLB betting and analysis. Built with a Node.js + Python backend, React dashboard frontend, and automated scrapers to populate structured JSON data.

---

## 🚀 Features

- ✅ Daily updated player stats
- ✅ Team matchups and schedule
- ✅ Injury reports and standings
- ✅ Historical data archive (2005–present)
- ✅ HR prediction & performance modeling
- ✅ JSON-based backend and dynamic dashboard

---

## 🧱 Prerequisites

Install dependencies before anything else:

```bash
npm install
```

If using Linux or WSL:

```bash
sudo apt install nodejs npm
```

---

## 💻 Getting Started in VS Code (PowerShell Terminal)

This project works best when run from **Visual Studio Code** using a **PowerShell terminal**.

### 📁 Directory Structure

```plaintext
BaseballProject/
├── BaseballScraper/           # Python scrapers for live/statistical data
├── BaseballTracker/           # Node.js + React dashboard app
│   ├── public/data            # Final JSON output per day
│   ├── src/services           # Stat generators and matchup analyzers
```

---

## 🧪 Daily Workflow

### 1️⃣ Scrape MLB Data

Run Python scrapers from the root PowerShell terminal:

```powershell
./run_scrapers.ps1
```

This pulls the latest:
- Player info
- Season stats
- Schedule & scores
- Injuries & standings
- Historical datasets

---

### 2️⃣ Process CSVs → JSON

Convert scraped CSVs to game-day JSON files:

```powershell
./process_all_stats.sh
```

---

### 3️⃣ Generate Calculated Stats

Add advanced stats & matchups:

```bash
node src/services/generateAdditionalStats.js
node src/services/generatePitcherMatchups.js
```

---

### 4️⃣ Daily Update Predictions

Generate predictions and prep files for dashboard:

```bash
./daily_update.sh
```

---

### 5️⃣ Start Local Server

Run the React frontend dashboard:

```bash
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🧼 Linting Warnings

You may see ESLint `no-unused-vars` warnings like:

```bash
'Link' is defined but never used
'yesterdayDateStr' is assigned a value but never used
```

📌 Fix: Remove unused imports or variables in the affected files:
- `src/App.js`
- `src/components/Dashboard.js`
- `src/components/MatchupAnalyzer.js`

---

## 🧠 Data Output Locations

- ✅ JSON Files: `public/data/YYYY/month/`
- ✅ HR Predictions: `public/data/predictions/hr_predictions_*.json`
- ✅ Player Performance: `public/data/predictions/player_performance_*.json`

---

## 📦 Deployment (Optional)

To build for production:

```bash
npm run build
```

This will export a static version of the site into `build/`.

---

## 🤝 Acknowledgments

Built by @ChefBoyRJeff, inspired by @futurepr0n's original repo, with custom logic, bots, and predictive modeling.

---

## 📅 Future Enhancements

- Betting recommendation engine
- Prop line predictors
- Deep player trends over seasons
- Model tuning and training