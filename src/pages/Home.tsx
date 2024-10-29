import React, { useState } from 'react';
import { Shield, Search, Database, Network, Lock, AlertTriangle, ChevronRight, Bug, Zap } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-gray-800 hover:border-cyan-500 transition-all">
      <Icon className="w-8 h-8 text-cyan-400 mb-4" />
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function Home() {
  const [url, setUrl] = useState('');
  const [ip, setIp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scanning:', { url, ip });
  };

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="flex items-center justify-center mb-8">
            <Bug className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BugBlitz.io
            </h1>
          </div>
          <h2 className="text-5xl font-bold text-center mb-6">
            Unleash the Power of Advanced<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Vulnerability Scanning
            </span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Don't leave your security to chance. Our cutting-edge system methodically probes every potential vulnerability across your entire digital attack surface.
          </p>

          {/* Scan Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-800">
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">Target URL</label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="ip" className="block text-sm font-medium text-gray-300 mb-2">IP Address</label>
                <input
                  type="text"
                  id="ip"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="192.168.1.1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Zap className="w-5 h-5" />
                <span>Start Scanning</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Comprehensive Security Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Search}
            title="Subdomain Enumeration"
            description="Identify all subdomains associated with your primary domain to reveal hidden assets and potential entry points."
          />
          <FeatureCard
            icon={Database}
            title="DNS & ASN Analysis"
            description="Deep analysis of DNS records and Autonomous System Numbers to uncover additional attack vectors."
          />
          <FeatureCard
            icon={Network}
            title="Network Scanning"
            description="Evaluate the network perimeter for open ports, services, and vulnerabilities using advanced tools."
          />
          <FeatureCard
            icon={Lock}
            title="Penetration Testing"
            description="Simulate real-world attacks on web applications to discover security flaws before attackers do."
          />
          <FeatureCard
            icon={AlertTriangle}
            title="Exploit Detection"
            description="Test your defenses against various exploit techniques and payload injections."
          />
          <FeatureCard
            icon={Shield}
            title="Detailed Reporting"
            description="Receive comprehensive reports with actionable insights and remediation strategies."
          />
        </div>
      </div>
    </div>
  );
}

export default Home;