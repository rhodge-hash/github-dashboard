import { WorkflowRun, GitHubMetrics, Repository } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  private async fetchFromGitHub(endpoint: string) {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Dashboard/1.0',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getWorkflowRuns(repo: Repository, workflowId?: string): Promise<WorkflowRun[]> {
    const endpoint = workflowId 
      ? `/repos/${repo.owner}/${repo.repo}/actions/workflows/${workflowId}/runs`
      : `/repos/${repo.owner}/${repo.repo}/actions/runs`;
    
    const data = await this.fetchFromGitHub(`${endpoint}?per_page=100`);
    return data.workflow_runs || [];
  }

  async getRepositoryWorkflows(repo: Repository) {
    const data = await this.fetchFromGitHub(`/repos/${repo.owner}/${repo.repo}/actions/workflows`);
    return data.workflows || [];
  }

  calculateMetrics(runs: WorkflowRun[]): GitHubMetrics {
    if (runs.length === 0) {
      return {
        buildSuccessRate: 0,
        averageBuildDuration: 0,
        failedBuilds: 0,
        testPassRate: 0,
        totalBuilds: 0,
      };
    }

    const completedRuns = runs.filter(run => run.status === 'completed');
    const successfulRuns = completedRuns.filter(run => run.conclusion === 'success');
    const failedRuns = completedRuns.filter(run => run.conclusion === 'failure');
    
    // Calculate build durations (in minutes)
    const durations = completedRuns
      .filter(run => run.run_started_at && run.updated_at)
      .map(run => {
        const start = new Date(run.run_started_at).getTime();
        const end = new Date(run.updated_at).getTime();
        return (end - start) / (1000 * 60); // Convert to minutes
      })
      .filter(duration => duration > 0 && duration < 1440); // Filter out unrealistic durations

    const averageDuration = durations.length > 0 
      ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length
      : 0;

    return {
      buildSuccessRate: completedRuns.length > 0 ? (successfulRuns.length / completedRuns.length) * 100 : 0,
      averageBuildDuration: Math.round(averageDuration * 100) / 100,
      failedBuilds: failedRuns.length,
      testPassRate: completedRuns.length > 0 ? (successfulRuns.length / completedRuns.length) * 100 : 0,
      totalBuilds: runs.length,
    };
  }
}

// Demo data for when API is not available or for testing
export const generateDemoData = (): GitHubMetrics => ({
  buildSuccessRate: 87.5,
  averageBuildDuration: 4.2,
  failedBuilds: 3,
  testPassRate: 92.3,
  totalBuilds: 24,
});

export const demoWorkflowRuns: WorkflowRun[] = [
  {
    id: 1,
    name: 'CI/CD Pipeline',
    conclusion: 'success',
    status: 'completed',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:05:30Z',
    run_started_at: '2024-01-15T10:00:30Z',
    workflow_id: 123,
    head_branch: 'main',
    head_sha: 'abc123',
  },
  {
    id: 2,
    name: 'CI/CD Pipeline',
    conclusion: 'failure',
    status: 'completed',
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:37:15Z',
    run_started_at: '2024-01-14T14:30:45Z',
    workflow_id: 123,
    head_branch: 'feature/auth',
    head_sha: 'def456',
  },
  {
    id: 3,
    name: 'CI/CD Pipeline',
    conclusion: 'success',
    status: 'completed',
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T09:18:22Z',
    run_started_at: '2024-01-13T09:15:20Z',
    workflow_id: 123,
    head_branch: 'main',
    head_sha: 'ghi789',
  },
];