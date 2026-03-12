import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface TripleGateInfographicProps {
  className?: string;
}

const TripleGateInfographic: React.FC<TripleGateInfographicProps> = ({ className = '' }) => {
  const gates = [
    {
      step: 1,
      name: 'The Shield',
      subtitle: 'Sanitize the Intent',
      icon: Shield,
      quote: 'Stop the malicious prompt.',
      description: 'We act as the hyper-vigilant bouncer for your LLM. By inspecting payloads in real-time, we strip out toxic content and sensitive data (PII) before the model even processes a single token.',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-700',
      blocks: ['Prompt injections', 'Jailbreaks', 'PII leaks', 'Toxic content'],
      iconColor: 'text-blue-600'
    },
    {
      step: 2,
      name: 'The Checkpoint',
      subtitle: 'Govern the Action',
      icon: Lock,
      quote: 'Authorize the tool use.',
      description: 'This is the missing link in modern AI security. Thuriyam validates that your agent has the specific permission to use a tool (like "Delete File" vs "Read File") ensuring scoped autonomy and preventing logic abuse.',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-600',
      textColor: 'text-purple-700',
      blocks: ['Unauthorized tool calls', 'Logic abuse', 'Over-privileged actions'],
      iconColor: 'text-purple-600'
    },
    {
      step: 3,
      name: 'The Vault',
      subtitle: 'Harden the Resource',
      icon: Database,
      quote: 'Protect the database.',
      description: 'Even if a rogue agent gets past the first two gates, our infrastructure layer holds the line. We enforce traditional, fine-grained identity checks to protect your core systems of record from unauthorized access.',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      textColor: 'text-green-700',
      blocks: ['Unauthorized access', 'Data breaches', 'System overload'],
      iconColor: 'text-green-600',
      customerOwned: true
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Main Flow */}
      <div className="relative">
        {/* Flow Container */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 relative">
          {/* Connection Arrows - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 transform -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <ArrowRight className="w-8 h-8 text-gray-400 mx-auto" />
            </motion.div>
          </div>
          <div className="hidden md:block absolute top-1/2 left-2/3 right-1/3 transform -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <ArrowRight className="w-8 h-8 text-gray-400 mx-auto" />
            </motion.div>
          </div>

          {/* Gate Cards */}
          {gates.map((gate, index) => (
            <motion.div
              key={gate.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative z-10 ${gate.bgColor} border-2 ${gate.borderColor} rounded-2xl p-6 md:p-8`}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-lg">
                <span className={`text-lg font-bold ${gate.textColor}`}>{gate.step}</span>
              </div>

              {/* Icon */}
              <div className={`mb-6 p-4 ${gate.iconBg} rounded-xl w-fit mx-auto md:mx-0`}>
                <gate.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{gate.name}</h3>
                <p className={`text-sm font-semibold ${gate.textColor} mb-3`}>{gate.subtitle}</p>
                
                {/* Quote */}
                <div className={`mb-4 p-3 bg-white rounded-lg border-l-4 ${gate.borderColor}`}>
                  <p className={`text-sm font-semibold ${gate.textColor} italic`}>"{gate.quote}"</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{gate.description}</p>

                {/* Blocks Section */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Blocks:</p>
                  <div className="flex flex-wrap gap-2">
                    {gate.blocks.map((block, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md border border-gray-200"
                      >
                        <XCircle className={`w-3 h-3 ${gate.iconColor}`} />
                        <span className="text-xs text-gray-700">{block}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer-Owned Badge for The Vault */}
                {gate.customerOwned && (
                  <div className="mt-4 p-2 bg-white rounded-lg border border-green-300">
                    <p className="text-xs font-semibold text-green-800">Customer-Owned Infrastructure</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Connection Lines */}
        <div className="md:hidden flex justify-center items-center gap-2 my-6">
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Bottom Flow Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-full border-2 border-gray-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">
            Protected from Intent → Action → Data
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TripleGateInfographic;

