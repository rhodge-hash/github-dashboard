# GitHub Dashboard

A beautiful, modern dashboard to track your GitHub project's build success rate, average build duration, number of failed builds, and automated test pass rate.

![GitHub Dashboard](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- **📊 Real-time Metrics**: Track build success rate, average duration, failed builds, and test pass rate
- **📈 Visual Charts**: Interactive line charts and pie charts for build trends and status distribution
- **🔄 Recent Builds**: View the latest build runs with status, duration, and branch information
- **⚙️ Configurable**: Change repository and add GitHub token through settings
- **🌙 Dark Mode**: Built-in dark mode support
- **📱 Responsive**: Works perfectly on desktop and mobile devices
- **🚀 Fast**: Built with Next.js 15 and Turbopack for optimal performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment** (optional):
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` to add your GitHub token and default repository:
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   NEXT_PUBLIC_DEFAULT_OWNER=facebook
   NEXT_PUBLIC_DEFAULT_REPO=react
   ```

   > **Note**: The GitHub token is optional but recommended to avoid rate limits. You can create one at [GitHub Settings > Tokens](https://github.com/settings/tokens).

### Running the Application

#### Development Mode

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

#### Production Mode

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

The production app will be available at **http://localhost:3000**

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Fork or clone this repository**
2. **Push to the `main` branch**
3. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Set Source to "GitHub Actions"
4. **The workflow will automatically build and deploy**

The deployment workflow:
- Triggers on push to `main` branch
- Builds the Next.js application with static export
- Deploys to GitHub Pages
- Your site will be available at: `https://yourusername.github.io/github-dashboard/`

### Manual Deployment

To deploy manually:

```bash
npm run build
# The static files will be in the 'out' directory
# Upload the contents of 'out' to your hosting provider
```

### Viewing in Your Browser

1. Open your browser and navigate to **http://localhost:3000**
2. You'll see the GitHub Dashboard with demo data initially
3. Click the settings icon (⚙️) in the top-right corner to:
   - Change the repository owner and name
   - Add your GitHub token (optional but recommended)
4. Click "Refresh" to fetch real data from the GitHub API

## Usage

### Default Setup
- The dashboard starts with demo data showing sample metrics
- Default repository is set to `rhodge-hash/github-dashboard` (configurable)
- GitHub API token is automatically configured via repository secrets for deployed version

### Configuring Your Repository
1. Click the settings icon in the top-right corner
2. Enter the repository owner (e.g., `microsoft`)
3. Enter the repository name (e.g., `vscode`)
4. The GitHub token is pre-configured for the deployed version
5. Click "Save" and then "Refresh"

### GitHub Token Configuration
For the **deployed version** on GitHub Pages:
- The token is automatically configured via GitHub repository secrets
- No additional configuration needed

For **local development**:
- Copy `.env.local.example` to `.env.local`
- Add your GitHub token to avoid rate limits
- Or use the settings panel in the application

### Understanding the Metrics

- **Build Success Rate**: Percentage of successful builds out of total completed builds
- **Average Build Duration**: Mean time taken for builds to complete (in minutes)
- **Failed Builds**: Total number of failed builds in the dataset
- **Test Pass Rate**: Percentage of builds with successful test outcomes

### Charts

- **Build Trends**: Line chart showing successful vs failed builds over time
- **Build Status Distribution**: Pie chart showing the proportion of different build outcomes

## API Integration

The dashboard uses the GitHub API to fetch workflow run data:

- **Endpoint**: `/repos/{owner}/{repo}/actions/runs`
- **Rate Limits**: 60 requests/hour without token, 5000 requests/hour with token
- **Data**: Fetches the last 100 workflow runs for analysis

## Customization

### Adding New Metrics
1. Update the `GitHubMetrics` type in `src/types/github.ts`
2. Modify the calculation logic in `src/lib/github-service.ts`
3. Add new metric cards in `src/app/page.tsx`

### Styling
- The app uses Tailwind CSS 4 for styling
- Dark mode is automatically supported
- Modify styles in component files or `src/app/globals.css`

### Charts
- Charts are built with Recharts
- Customize in `src/components/Charts.tsx`
- Add new chart types as needed

## Troubleshooting

### Common Issues

1. **Rate Limit Errors**: Add a GitHub token to increase rate limits
2. **Repository Not Found**: Ensure the repository is public or you have access
3. **No Workflow Data**: Repository needs to have GitHub Actions workflows

### Demo Data
If the GitHub API is unavailable, the app falls back to demo data automatically.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to ensure it builds successfully
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Enjoy tracking your GitHub project metrics! 🚀**
