import React, { useState } from 'react';
import { Github, Terminal, Play, Settings2 } from 'lucide-react';

interface IntegrationFormData {
  repoUrl: string;
  installationType: 'git' | 'go';
  customCommand?: string;
}

export default function GitHubIntegration() {
  const [formData, setFormData] = useState<IntegrationFormData>({
    repoUrl: '',
    installationType: 'git',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    console.log('Processing:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Github className="w-8 h-8 text-cyan-400" />
          <h2 className="text-2xl font-bold">Tool Integration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <input
              type="url"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="https://github.com/username/repo"
              value={formData.repoUrl}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Installation Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={\`flex items-center justify-center gap-2 p-4 rounded-lg border \${
                  formData.installationType === 'git'
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }\`}
                onClick={() => setFormData({ ...formData, installationType: 'git' })}
              >
                <Terminal className="w-5 h-5" />
                <span>Git Commands</span>
              </button>
              <button
                type="button"
                className={\`flex items-center justify-center gap-2 p-4 rounded-lg border \${
                  formData.installationType === 'go'
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }\`}
                onClick={() => setFormData({ ...formData, installationType: 'go' })}
              >
                <Play className="w-5 h-5" />
                <span>Go Commands</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Installation Command (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="make install"
              value={formData.customCommand}
              onChange={(e) => setFormData({ ...formData, customCommand: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Settings2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Terminal className="w-5 h-5" />
                <span>Integrate Tool</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}