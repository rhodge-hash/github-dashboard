'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

interface RepositorySettingsProps {
  repository: {
    owner: string;
    repo: string;
  };
  onRepositoryChange: (owner: string, repo: string) => void;
  githubToken: string;
  onTokenChange: (token: string) => void;
}

export function RepositorySettings({ 
  repository, 
  onRepositoryChange, 
  githubToken, 
  onTokenChange 
}: RepositorySettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempOwner, setTempOwner] = useState(repository.owner);
  const [tempRepo, setTempRepo] = useState(repository.repo);
  const [tempToken, setTempToken] = useState(githubToken);

  const handleSave = () => {
    onRepositoryChange(tempOwner, tempRepo);
    onTokenChange(tempToken);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempOwner(repository.owner);
    setTempRepo(repository.repo);
    setTempToken(githubToken);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title="Repository Settings"
      >
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Repository Settings
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Repository Owner
            </label>
            <input
              type="text"
              value={tempOwner}
              onChange={(e) => setTempOwner(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., facebook"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              value={tempRepo}
              onChange={(e) => setTempRepo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., react"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub Token (Optional)
            </label>
            <input
              type="password"
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="ghp_..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Provide a GitHub token to avoid rate limits
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}