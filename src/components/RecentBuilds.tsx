'use client';

import { WorkflowRun } from '@/types/github';
import { CheckCircle, XCircle, Clock, GitBranch } from 'lucide-react';

interface RecentBuildsProps {
  runs: WorkflowRun[];
}

export function RecentBuilds({ runs }: RecentBuildsProps) {
  const getStatusIcon = (conclusion: string | null, status: string) => {
    if (status === 'in_progress') {
      return <Clock className="w-4 h-4 text-blue-500" />;
    }
    
    switch (conclusion) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (conclusion: string | null, status: string) => {
    if (status === 'in_progress') return 'In Progress';
    
    switch (conclusion) {
      case 'success': return 'Success';
      case 'failure': return 'Failed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    const durationMin = Math.round(durationMs / (1000 * 60));
    
    if (durationMin < 1) return '< 1m';
    if (durationMin < 60) return `${durationMin}m`;
    
    const hours = Math.floor(durationMin / 60);
    const minutes = durationMin % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes}m ago` : 'Just now';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Builds</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {runs.slice(0, 10).map((run) => (
          <div key={run.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(run.conclusion, run.status)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {run.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      #{run.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <GitBranch className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {run.head_branch}
                    </span>
                    <span className="text-xs text-gray-400">
                      {run.head_sha?.substring(0, 7)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {getStatusText(run.conclusion, run.status)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(run.created_at)}
                </div>
                {run.status === 'completed' && run.run_started_at && (
                  <div className="text-xs text-gray-400">
                    {formatDuration(run.run_started_at, run.updated_at)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {runs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No recent builds found
          </div>
        )}
      </div>
    </div>
  );
}