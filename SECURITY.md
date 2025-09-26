# Security Configuration

## GitHub API Token Setup

### Repository Secret Configuration ✅
- **Secret Name**: `GH_API_TOKEN`
- **Status**: Configured and secure
- **Usage**: Automatically injected during GitHub Actions build
- **Scope**: Read access to public repositories and workflow data

### Security Benefits
- Token is stored securely in GitHub repository secrets
- Never exposed in source code or client-side JavaScript
- Automatically available during build process
- Follows GitHub security best practices

### Token Permissions
The configured token has the following permissions:
- `repo` (if accessing private repos)
- `workflow` (to read workflow runs)
- `actions:read` (to access GitHub Actions data)

### Local Development
For local development, you can:
1. Copy `.env.local.example` to `.env.local`
2. Add your personal token there
3. The `.env.local` file is gitignored for security

### Rate Limits
- **Without Token**: 60 requests/hour
- **With Token**: 5,000 requests/hour
- **Current Setup**: Token configured, full rate limit available

## Default Repository
- **Owner**: rhodge-hash
- **Repository**: github-dashboard
- **Monitoring**: This repository's own build metrics

The dashboard will automatically monitor the rhodge-hash/github-dashboard repository and display real build metrics, success rates, and workflow data.