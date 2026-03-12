import React from 'react';
import { CheckCircle, Target, Zap, Shield } from 'lucide-react';

interface AgentConfig {
  name: string;
  goal: string;
  capabilities: string[];
  integrations?: string[];
  useCase: string;
}

interface AgentBuilderPreviewProps {
  agentName: string;
  agentType: string;
  previewMessage?: string;
  className?: string;
  agentConfig?: AgentConfig;
  solutionId?: string;
}

// Generate agent config based on solution type
const getAgentConfig = (solutionId: string, agentName: string): AgentConfig => {
  const configs: Record<string, AgentConfig> = {
    'lead-qualification': {
      name: 'Lead Qualification Agent',
      goal: 'Qualify leads, score prospects, and route high-value opportunities to sales teams',
      capabilities: [
        'Lead scoring and prioritization',
        'BANT qualification',
        'CRM integration',
        'Automated follow-ups'
      ],
      integrations: ['CRM', 'Calendar', 'Email'],
      useCase: 'Sales & Marketing'
    },
    'campaign-tracker': {
      name: 'Campaign Tracker Agent',
      goal: 'Monitor and optimize marketing campaigns in real-time, tracking performance metrics and ROI',
      capabilities: [
        'Real-time campaign monitoring',
        'Performance analytics',
        'ROI tracking',
        'Multi-channel optimization'
      ],
      integrations: ['Marketing Platforms', 'Analytics', 'CRM'],
      useCase: 'Marketing Operations'
    },
    'voice-sdr': {
      name: 'Voice-SDR Agent',
      goal: 'Optimize sales conversations and drive conversions through intelligent dialogue management',
      capabilities: [
        'Conversation optimization',
        'Real-time coaching',
        'Call analytics',
        'Conversion tracking'
      ],
      integrations: ['Phone Systems', 'CRM', 'Analytics'],
      useCase: 'Sales Operations'
    },
    'meeting-scheduler': {
      name: 'Sales Meeting-Scheduler Agent',
      goal: 'Automatically schedule meetings with clients and coordinate calendars',
      capabilities: [
        'Calendar integration',
        'Availability detection',
        'Automated scheduling',
        'Reminder notifications'
      ],
      integrations: ['Calendar', 'CRM', 'Email'],
      useCase: 'Sales Operations'
    },
    'helpdesk': {
      name: 'AI HelpDesk Agent',
      goal: 'Handle routine queries, card disputes, and transaction clarifications across all channels',
      capabilities: [
        'Multi-channel support',
        'Ticket routing',
        'Knowledge base integration',
        '24/7 availability'
      ],
      integrations: ['Helpdesk', 'CRM', 'Knowledge Base'],
      useCase: 'Customer Support'
    }
  };

  return configs[solutionId] || {
    name: agentName || 'AI Agent',
    goal: 'Automate business processes',
    capabilities: ['Task automation', 'Process optimization'],
    integrations: ['CRM'],
    useCase: 'General'
  };
};

export const AgentBuilderPreview: React.FC<AgentBuilderPreviewProps> = ({
  agentName,
  agentType,
  previewMessage,
  className = '',
  agentConfig,
  solutionId
}) => {
  // Use provided solutionId or extract from agentName
  const id = solutionId || (agentName || '').toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  const config = agentConfig || getAgentConfig(id, agentName || 'Agent');

  return (
    <div className={`w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Agent Configuration Content */}
      <div className="p-2.5 space-y-2.5 bg-gray-50">
        {/* Goal */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-3 h-3 text-blue-600" />
            <span className="text-[10px] font-semibold text-gray-700">Goal</span>
          </div>
          <p className="text-[9px] text-gray-600 pl-4 leading-tight line-clamp-2">{config.goal}</p>
        </div>

        {/* Capabilities */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-gray-700">Capabilities</span>
          </div>
          <ul className="space-y-0.5 pl-4">
            {config.capabilities.slice(0, 3).map((capability, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[9px] text-gray-600">
                <CheckCircle className="w-2.5 h-2.5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="leading-tight">{capability}</span>
              </li>
            ))}
            {config.capabilities.length > 3 && (
              <li className="text-[9px] text-gray-500 pl-4">
                +{config.capabilities.length - 3} more
              </li>
            )}
          </ul>
        </div>

        {/* Integrations */}
        {config.integrations && config.integrations.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="w-3 h-3 text-indigo-600" />
              <span className="text-[10px] font-semibold text-gray-700">Integrations</span>
            </div>
            <div className="flex flex-wrap gap-1 pl-4">
              {config.integrations.slice(0, 3).map((integration, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[8px] text-gray-700"
                >
                  {integration}
                </span>
              ))}
              {config.integrations.length > 3 && (
                <span className="px-1.5 py-0.5 text-[8px] text-gray-500">
                  +{config.integrations.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

