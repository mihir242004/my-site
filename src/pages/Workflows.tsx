import React, { useState } from 'react';
import { Play, Plus, Save, Trash2, Settings } from 'lucide-react';

interface WorkflowStep {
  id: string;
  tool: string;
  command: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleCreateWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      description: '',
      steps: []
    };
    setCurrentWorkflow(newWorkflow);
    setShowEditor(true);
  };

  const handleSaveWorkflow = () => {
    if (currentWorkflow) {
      const existingIndex = workflows.findIndex(w => w.id === currentWorkflow.id);
      if (existingIndex >= 0) {
        setWorkflows(workflows.map((w, i) => i === existingIndex ? currentWorkflow : w));
      } else {
        setWorkflows([...workflows, currentWorkflow]);
      }
      setShowEditor(false);
      setCurrentWorkflow(null);
    }
  };

  const handleAddStep = () => {
    if (currentWorkflow) {
      const newStep: WorkflowStep = {
        id: Date.now().toString(),
        tool: '',
        command: ''
      };
      setCurrentWorkflow({
        ...currentWorkflow,
        steps: [...currentWorkflow.steps, newStep]
      });
    }
  };

  const handleRemoveStep = (stepId: string) => {
    if (currentWorkflow) {
      setCurrentWorkflow({
        ...currentWorkflow,
        steps: currentWorkflow.steps.filter(step => step.id !== stepId)
      });
    }
  };

  const handleUpdateStep = (stepId: string, field: keyof WorkflowStep, value: string) => {
    if (currentWorkflow) {
      setCurrentWorkflow({
        ...currentWorkflow,
        steps: currentWorkflow.steps.map(step =>
          step.id === stepId ? { ...step, [field]: value } : step
        )
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Security Workflows</h2>
        <button
          onClick={handleCreateWorkflow}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Workflow
        </button>
      </div>

      {showEditor ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={currentWorkflow?.name || ''}
                onChange={(e) => setCurrentWorkflow(curr => curr ? { ...curr, name: e.target.value } : null)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={currentWorkflow?.description || ''}
                onChange={(e) => setCurrentWorkflow(curr => curr ? { ...curr, description: e.target.value } : null)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-24"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Workflow Steps</h3>
                <button
                  onClick={handleAddStep}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-1 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>

              <div className="space-y-4">
                {currentWorkflow?.steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={step.tool}
                        onChange={(e) => handleUpdateStep(step.id, 'tool', e.target.value)}
                        placeholder="Tool name"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      />
                      <input
                        type="text"
                        value={step.command}
                        onChange={(e) => handleUpdateStep(step.id, 'command', e.target.value)}
                        placeholder="Command"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveStep(step.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWorkflow}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Workflow
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                  <p className="text-gray-400 text-sm">{workflow.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentWorkflow(workflow);
                      setShowEditor(true);
                    }}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setWorkflows(workflows.filter(w => w.id !== workflow.id))}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {workflow.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full text-white">
                      {index + 1}
                    </span>
                    <span>{step.tool}</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-mono bg-gray-900 px-2 py-1 rounded">{step.command}</span>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Run Workflow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workflows;