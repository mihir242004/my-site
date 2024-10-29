import React, { useState } from 'react';
import { Flow, Plus, Play, Trash2, Save } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  command: string;
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [workflowName, setWorkflowName] = useState('');

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: '',
      command: '',
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const updateStep = (id: string, field: keyof WorkflowStep, value: string) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving workflow:', { name: workflowName, steps });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Flow className="w-8 h-8 text-cyan-400" />
          <h2 className="text-2xl font-bold">Workflow Builder</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="My Custom Workflow"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-sm">
                    Step {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="ml-auto text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Step Name"
                    value={step.name}
                    onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Command"
                    value={step.command}
                    onChange={(e) => updateStep(step.id, 'command', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addStep}
            className="w-full py-3 border-2 border-dashed border-gray-700 hover:border-cyan-500 rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Step</span>
          </button>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Save className="w-5 h-5" />
              <span>Save Workflow</span>
            </button>
            <button
              type="button"
              className="flex-1 py-4 px-6 bg-green-500/20 text-green-400 hover:bg-green-500/30 font-bold rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <Play className="w-5 h-5" />
              <span>Run Workflow</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}