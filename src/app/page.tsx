'use client';

import { useState, useEffect, useCallback } from 'react';
import { Activity, Clock, TrendingUp, AlertCircle, Github, RefreshCw } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { BuildTrendsChart, BuildStatusPieChart } from '@/components/Charts';
import { RecentBuilds } from '@/components/RecentBuilds';
import { RepositorySettings } from '@/components/RepositorySettings';
import { GitHubService, generateDemoData, demoWorkflowRuns } from '@/lib/github-service';
import { GitHubMetrics, WorkflowRun, Repository } from '@/types/github';

export default function GitHubDashboard() {
  const [repository, setRepository] = useState<Repository>({ owner: 'rhodge-hash', repo: 'github-dashboard' });
  const [githubToken, setGithubToken] = useState(process.env.NEXT_PUBLIC_GITHUB_TOKEN || '');
  const [metrics, setMetrics] = useState<GitHubMetrics>(generateDemoData());
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>(demoWorkflowRuns);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingDemoData, setUsingDemoData] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const service = new GitHubService(githubToken);
      const runs = await service.getWorkflowRuns(repository);
      const calculatedMetrics = service.calculateMetrics(runs);
      
      setWorkflowRuns(runs);
      setMetrics(calculatedMetrics);
      setUsingDemoData(false);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      // Only fallback to demo data if no token is available or it's a rate limit error
      const isTokenAvailable = githubToken && githubToken.length > 0;
      if (!isTokenAvailable) {
        setError('GitHub token not configured. Showing demo data. Configure token in repository secrets for live data.');
        setUsingDemoData(true);
      } else {
        // Keep existing data on error if we have a token
        setUsingDemoData(false);
      }
    } finally {
      setLoading(false);
    }
  }, [githubToken, repository]);

  // Auto-fetch data on component mount
  useEffect(() => {
    if (!hasAttemptedFetch) {
      setHasAttemptedFetch(true);
      // Set initial loading state if we have a token
      if (githubToken && githubToken.length > 0) {
        setLoading(true);
        setUsingDemoData(false);
      }
      fetchData();
    }
  }, [hasAttemptedFetch, fetchData, githubToken]);

  const handleRepositoryChange = (owner: string, repo: string) => {
    setRepository({ owner, repo });
  };

  const handleTokenChange = (token: string) => {
    setGithubToken(token);
  };

  // Generate demo chart data
  const buildTrendsData = [
    { date: '2024-01-10', successful: 8, failed: 2, total: 10 },
    { date: '2024-01-11', successful: 12, failed: 1, total: 13 },
    { date: '2024-01-12', successful: 7, failed: 3, total: 10 },
    { date: '2024-01-13', successful: 15, failed: 0, total: 15 },
    { date: '2024-01-14', successful: 9, failed: 2, total: 11 },
    { date: '2024-01-15', successful: 11, failed: 1, total: 12 },
    { date: '2024-01-16', successful: 14, failed: 2, total: 16 },
  ];

  const buildStatusData = [
    { name: 'Success', value: Math.round(metrics.totalBuilds * (metrics.buildSuccessRate / 100)) },
    { name: 'Failed', value: metrics.failedBuilds },
    { name: 'Cancelled', value: Math.max(0, metrics.totalBuilds - Math.round(metrics.totalBuilds * (metrics.buildSuccessRate / 100)) - metrics.failedBuilds) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="w-8 h-8 text-gray-900 dark:text-white" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  GitHub Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {repository.owner}/{repository.repo}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {loading && (
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading live data...</span>
                </div>
              )}
              {usingDemoData && !loading && !githubToken && (
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Demo data - configure token for live metrics</span>
                </div>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Loading...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
          <div className="mt-2 text-xs text-gray-500">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${loading ? 'opacity-75' : ''}`}>
          <MetricCard
            title="Build Success Rate"
            value={loading ? "..." : `${metrics.buildSuccessRate.toFixed(1)}`}
            unit={loading ? "" : "%"}
            trend={metrics.buildSuccessRate >= 90 ? 'up' : metrics.buildSuccessRate >= 70 ? 'neutral' : 'down'}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Average Build Duration"
            value={loading ? "..." : `${metrics.averageBuildDuration.toFixed(1)}`}
            unit={loading ? "" : "min"}
            trend={metrics.averageBuildDuration <= 5 ? 'up' : metrics.averageBuildDuration <= 10 ? 'neutral' : 'down'}
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricCard
            title="Failed Builds"
            value={loading ? "..." : metrics.failedBuilds}
            trend={metrics.failedBuilds === 0 ? 'up' : metrics.failedBuilds <= 3 ? 'neutral' : 'down'}
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <MetricCard
            title="Test Pass Rate"
            value={loading ? "..." : `${metrics.testPassRate.toFixed(1)}`}
            unit={loading ? "" : "%"}
            trend={metrics.testPassRate >= 95 ? 'up' : metrics.testPassRate >= 85 ? 'neutral' : 'down'}
            icon={<Activity className="w-5 h-5" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BuildTrendsChart data={buildTrendsData} />
          <BuildStatusPieChart data={buildStatusData} />
        </div>

        {/* Recent Builds */}
        <RecentBuilds runs={workflowRuns} />

        {/* Repository Settings */}
        <RepositorySettings
          repository={repository}
          onRepositoryChange={handleRepositoryChange}
          githubToken={githubToken}
          onTokenChange={handleTokenChange}
        />
      </div>
    </div>
  );
}
