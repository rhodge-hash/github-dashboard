export interface WorkflowRun {
  id: number;
  name: string;
  conclusion: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  run_started_at: string;
  workflow_id: number;
  head_branch: string;
  head_sha: string;
}

export interface GitHubMetrics {
  buildSuccessRate: number;
  averageBuildDuration: number;
  failedBuilds: number;
  testPassRate: number;
  totalBuilds: number;
}

export interface Repository {
  owner: string;
  repo: string;
}