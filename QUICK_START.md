# Quick Start Guide

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd github-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (Recommended for testing)
```bash
npm run dev
```
Then open: http://localhost:3000

### Production Mode
```bash
npm run build
npm start
```
Then open: http://localhost:3000

## Using the Dashboard

1. **Initial View**: You'll see demo data by default
2. **Configure Repository**: Click the settings icon (⚙️) in the top-right
3. **Enter Repository**: Example - Owner: `microsoft`, Repo: `vscode`
4. **Add Token** (optional): For higher API rate limits
5. **Refresh**: Click the refresh button to fetch real data

## Default Repository
- Owner: facebook
- Repo: react

## Features
- Build success rate tracking
- Average build duration metrics
- Failed builds count
- Test pass rate monitoring
- Interactive charts
- Recent builds list
- Dark mode support
- Mobile responsive