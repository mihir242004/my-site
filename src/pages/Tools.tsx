import React, { useState } from 'react';
import { Github, Terminal, Play, Plus, Trash2 } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  repo: string;
  description: string;
  installType: 'git' | 'go';
  status: 'pending' | 'installing' | 'ready' | 'error';
}

function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [repo, setRepo] = useState('');
  const [installType, setInstallType] = useState<'git' | 'go'>('git');

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    const newTool: Tool = {
      id: Date.now().toString(),
      name: repo.split('/').pop() || '',
      repo,
      description: '',
      installType,
      status: 'pending'
    };
    setTools([...tools, newTool]);
    setRepo('');
  };

  const handleRemoveTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const handleInstallTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, status: 'installing' } : tool
    ));
    // Simulated installation process
    setTimeout(() => {
      setTools(tools.map(tool =>
        tool.id === id ? { ...tool, status: 'ready' } : tool
      ));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Add Security Tool</h2>
        <form onSubmit={handleAddTool} className="space-y-4">
          <div>
            <label htmlFor="repo" className="block text-sm font-medium text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                id="repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="username/repository"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                required
              />
              <select
                value={installType}
                onChange={(e) => setInstallType(e.target.value as 'git' | 'go')}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              >
                <option value="git">Git Install</option>
                <option value="go">Go Install</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Tool
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 p-6 relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleRemoveTool(tool.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-start gap-4">
              <Github className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tool.repo}</p>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{tool.installType.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleInstallTool(tool.id)}
                disabled={tool.status === 'installing' || tool.status === 'ready'}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  tool.status === 'ready'
                    ? 'bg-green-500/20 text-green-400 cursor-default'
                    : tool.status === 'installing'
                    ? 'bg-gray-700 text-gray-300 cursor-wait'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                {tool.status === 'ready'
                  ? 'Installed'
                  : tool.status === 'installing'
                  ? 'Installing...'
                  : 'Install Tool'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tools;