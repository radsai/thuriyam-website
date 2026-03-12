/**
 * Agent Builder Demo - Version 6
 *
 * Demonstrates AG-UI's ability to build AI agents on the fly.
 * The agent can create agent configurations based on natural language descriptions.
 * 
 * Version 6 Features:
 * - Sequential feature screens showing capabilities one at a time
 * - Auto-advancing screens with smooth transitions
 * - Visual demonstrations of: Channels, Memory, Quality Check, LLMs, Analytics, BYO Agent
 * - Progress indicator showing current screen
 */

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "./input";
import { Sparkles, Send, Loader2, Bot, Target, Zap, Shield, MessageSquare, CheckCircle, Radio, Brain, Database, BarChart3, Cpu, AlertTriangle, Globe, Code, Upload, Gauge } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agentConfig?: AgentConfig;
  dashboardLink?: boolean;
}

interface AgentConfig {
  id: string;
  name: string;
  goal: string;
  capabilities: string[];
  integrations?: string[];
  useCase: string;
  description: string;
}

const DEMO_COMMANDS = [
  "Build a customer support agent",
  "Create a lead qualification agent",
  "Build a KYC verification agent",
  "Create a sales meeting scheduler",
  "Build a fraud detection agent",
  "Create an interview bot agent",
];

// Parse agent requirements from natural language
const parseAgentRequirements = (command: string): AgentConfig | null => {
  const lowerCommand = command.toLowerCase();

  // Detect agent type and extract requirements
  let agentType = '';
  let goal = '';
  let capabilities: string[] = [];
  let integrations: string[] = [];
  let useCase = '';
  let description = '';

  // Customer Support Agent
  if (lowerCommand.includes('support') || lowerCommand.includes('helpdesk') || lowerCommand.includes('customer service')) {
    agentType = 'Customer Support Agent';
    goal = 'Handle customer inquiries, resolve issues, and provide 24/7 support across all channels';
    capabilities = [
      'Multi-channel support (voice, chat, email)',
      'Ticket routing and escalation',
      'Knowledge base integration',
      'Sentiment analysis',
      'Automated issue resolution'
    ];
    integrations = ['CRM', 'Helpdesk', 'Knowledge Base'];
    useCase = 'Customer Support';
    description = 'An intelligent agent that autonomously handles customer inquiries, routes complex issues to human agents, and provides instant responses 24/7.';
  }
  // Lead Qualification Agent
  else if (lowerCommand.includes('lead') || lowerCommand.includes('qualification') || lowerCommand.includes('sdr')) {
    agentType = 'Lead Qualification Agent';
    goal = 'Qualify leads, score prospects, and route high-value opportunities to sales teams';
    capabilities = [
      'Lead scoring and prioritization',
      'BANT qualification (Budget, Authority, Need, Timeline)',
      'CRM integration',
      'Automated follow-ups',
      'Meeting scheduling'
    ];
    integrations = ['CRM', 'Calendar', 'Email'];
    useCase = 'Sales & Marketing';
    description = 'An autonomous sales development agent that qualifies leads, schedules meetings, and ensures your sales team focuses on high-value opportunities.';
  }
  // KYC Agent
  else if (lowerCommand.includes('kyc') || lowerCommand.includes('verification') || lowerCommand.includes('onboarding')) {
    agentType = 'KYC Verification Agent';
    goal = 'Automate Know Your Customer verification and compliance checks for seamless onboarding';
    capabilities = [
      'Document verification',
      'Identity verification',
      'Compliance checking',
      'Risk assessment',
      'Automated approval workflows'
    ];
    integrations = ['Identity Verification APIs', 'Compliance Databases', 'Document Storage'];
    useCase = 'BFSI - Account Opening';
    description = 'A compliance-focused agent that automates KYC verification, reduces onboarding time, and ensures regulatory compliance.';
  }
  // Meeting Scheduler
  else if (lowerCommand.includes('meeting') || lowerCommand.includes('scheduler') || lowerCommand.includes('calendar')) {
    agentType = 'Meeting Scheduler Agent';
    goal = 'Automatically schedule meetings with clients and coordinate calendars';
    capabilities = [
      'Calendar integration',
      'Availability detection',
      'Automated scheduling',
      'Reminder notifications',
      'Rescheduling handling'
    ];
    integrations = ['Calendar (Google, Outlook)', 'CRM', 'Email'];
    useCase = 'Sales Operations';
    description = 'An intelligent scheduling agent that coordinates calendars, sends confirmations, and handles rescheduling automatically.';
  }
  // Fraud Detection Agent
  else if (lowerCommand.includes('fraud') || lowerCommand.includes('security') || lowerCommand.includes('risk')) {
    agentType = 'Fraud Detection Agent';
    goal = 'Detect and prevent fraudulent activities in real-time';
    capabilities = [
      'Real-time transaction monitoring',
      'Anomaly detection',
      'Pattern recognition',
      'Risk scoring',
      'Automated blocking'
    ];
    integrations = ['Payment Systems', 'Transaction Databases', 'Alert Systems'];
    useCase = 'BFSI - Fraud Management';
    description = 'A security-focused agent that continuously monitors transactions, detects anomalies, and prevents fraud before it happens.';
  }
  // Collections Agent
  else if (lowerCommand.includes('collection') || lowerCommand.includes('debt') || lowerCommand.includes('recovery')) {
    agentType = 'Intelligent Collections Agent';
    goal = 'Automate debt collection with a consultative, user-friendly approach';
    capabilities = [
      'Payment plan negotiation',
      'Customer communication',
      'Payment tracking',
      'Escalation management',
      'Compliance adherence'
    ];
    integrations = ['Billing Systems', 'Payment Gateways', 'CRM'];
    useCase = 'BFSI - Collections';
    description = 'A digital collection agent that transforms debt recovery from aggressive to consultative, improving recovery rates and customer satisfaction.';
  }
  // Interview Bot Agent
  else if (lowerCommand.includes('interview') || lowerCommand.includes('recruiting') || lowerCommand.includes('hiring') || lowerCommand.includes('candidate')) {
    agentType = 'AI Interview Bot Agent';
    goal = 'Conduct candidate interviews, evaluate responses, and provide hiring recommendations';
    capabilities = [
      'Conduct structured interviews via voice or chat',
      'Ask role-specific and competency-based questions',
      'Evaluate candidate responses in real-time',
      'Score candidates on key competencies',
      'Generate detailed interview reports',
      'Schedule follow-up interviews automatically'
    ];
    integrations = ['ATS (Applicant Tracking System)', 'Calendar', 'Video Conferencing', 'HR Systems'];
    useCase = 'HR & Recruitment';
    description = 'An intelligent interview agent that conducts candidate interviews, evaluates responses, and provides actionable hiring insights—reducing time-to-hire while maintaining quality.';
  }
  // Default agent
  else {
    agentType = 'Custom AI Agent';
    goal = 'Automate business processes and improve operational efficiency';
    capabilities = [
      'Natural language understanding',
      'Task automation',
      'Decision making',
      'Integration capabilities'
    ];
    useCase = 'General Automation';
    description = 'A versatile AI agent that can be customized for your specific business needs.';
  }

  return {
    id: `agent-${Date.now()}`,
    name: agentType,
    goal,
    capabilities,
    integrations,
    useCase,
    description
  };
};

interface DynamicUIDemoProps {
  highlightInput?: boolean;
  showBadge?: boolean;
  autoFocus?: boolean;
  onAgentDeployed?: () => void;
  onDemoComplete?: () => void;
  pauseAutoRestart?: boolean;
  skipFeatureScreens?: boolean;
}

export const DynamicUIDemo: React.FC<DynamicUIDemoProps> = ({ highlightInput = false, showBadge = true, autoFocus = false, onAgentDeployed, onDemoComplete, pauseAutoRestart = false, skipFeatureScreens = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedAgent, setDeployedAgent] = useState<string | null>(null);
  const [isMasking, setIsMasking] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [currentFeatureScreen, setCurrentFeatureScreen] = useState<number | null>(null);
  const [showFeatureScreens, setShowFeatureScreens] = useState(false);
  const streamingTextRef = useRef<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);
  const autoPlayStarted = useRef(false);
  const dashboardLinkRef = useRef<HTMLAnchorElement>(null);
  const chipRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isStreamingRef = useRef(false);
  const fromDashboardRef = useRef(false);

  const streamText = async (
    text: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    speed: number = 20
  ): Promise<void> => {
    isStreamingRef.current = true;
    setIsStreaming(true);
    
    for (let i = 0; i < text.length; i++) {
      // Small delay between characters
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, speed);
      });
      
      // Output character
      onChunk(text[i]);
    }
    
    isStreamingRef.current = false;
    setIsStreaming(false);
    onComplete();
  };

  useEffect(() => {
    // Add welcome message only on initial mount (not on reset from dashboard)
    if (messages.length === 0 && isInitialMount.current && !fromDashboardRef.current && !isResetting && !highlightInput) {
      console.log('DynamicUIDemo: Adding welcome message', {
        messagesLength: messages.length,
        isInitialMount: isInitialMount.current,
        fromDashboard: fromDashboardRef.current,
        isResetting,
        highlightInput
      });
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I'm the Studio agent builder. I can help you create AI agents for your business.",
          timestamp: new Date(),
        },
      ]);
    } else if (messages.length === 0) {
      console.log('DynamicUIDemo: Welcome message NOT added', {
        messagesLength: messages.length,
        isInitialMount: isInitialMount.current,
        fromDashboard: fromDashboardRef.current,
        isResetting,
        highlightInput
      });
    }
  }, [messages.length, isResetting, highlightInput]);

  // Check if returning from dashboard and restart - COMPLETE RESET
  useEffect(() => {
    const fromDashboard = location.state?.fromDashboard || false;
    // Only process if we're returning from dashboard and haven't already processed it
    if (fromDashboard && !fromDashboardRef.current) {
      console.log('DynamicUIDemo: Processing return from dashboard');
      // Mark as processing to prevent duplicate resets
      fromDashboardRef.current = true;
      
      // Immediately stop any ongoing operations
      isStreamingRef.current = false;
      autoPlayStarted.current = false;
      streamingTextRef.current = "";
      
      // Complete synchronous reset of all state
      setIsResetting(true);
      setIsStreaming(false);
      setStreamingText("");
      setInput("");
      setMessages([]);
      setAgentCreated(false);
      setDeployedAgent(null);
      setShowFeatureScreens(false);
      setCurrentFeatureScreen(null);
      setIsDeploying(false);
      setIsMasking(false);
      setSelectedChip(null);
      
      // Reset refs and flags
      isInitialMount.current = true;
      autoPlayStarted.current = false;
      
      // Wait for React to process state updates, then restart cleanly
      setTimeout(() => {
        // Clear resetting flag first
        setIsResetting(false);
        
          // Add welcome message
          setTimeout(() => {
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                content: "Hello! I'm the Studio agent builder. I can help you create AI agents for your business.",
                timestamp: new Date(),
              },
            ]);
          
          // Reset fromDashboard flag and start auto-play
          setTimeout(() => {
            fromDashboardRef.current = false; // Reset flag so auto-play can start
            console.log('DynamicUIDemo: Reset complete, starting auto-play');
            // Only scroll to top if we're in the builder section
            const builderDemoContainer = document.querySelector('[data-builder-demo-container]');
            const dynamicUIDemo = document.querySelector('[data-dynamic-ui-demo]');
            if (builderDemoContainer && dynamicUIDemo && builderDemoContainer.contains(dynamicUIDemo)) {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
            setTimeout(() => {
              autoPlaySequence();
            }, 500);
          }, 300);
        }, 200);
      }, 100);
    }
  }, [location.state]);

  // Listen for builder demo completion event
  useEffect(() => {
    const handleBuilderDemoComplete = () => {
      // Only handle this event if we're in the builder section
      const builderDemoContainer = document.querySelector('[data-builder-demo-container]');
      const dynamicUIDemo = document.querySelector('[data-dynamic-ui-demo]');
      if (!builderDemoContainer || !dynamicUIDemo || !builderDemoContainer.contains(dynamicUIDemo)) {
        return; // Don't handle if we're not in the builder section
      }
      
      // Reset state to allow auto-play to restart
      if (messages.length === 1 && !highlightInput && !isResetting && !pauseAutoRestart) {
        autoPlayStarted.current = false;
        isInitialMount.current = true;
        // Trigger auto-play sequence
        setTimeout(() => {
          autoPlaySequence();
        }, 500);
      }
    };

    window.addEventListener('builder-demo-complete', handleBuilderDemoComplete);
    return () => {
      window.removeEventListener('builder-demo-complete', handleBuilderDemoComplete);
    };
  }, [highlightInput, isResetting, messages.length, pauseAutoRestart]);

  // Auto-play sequence: Start with Customer Support agent and loop
  useEffect(() => {
    // Only auto-play if we're in the builder section
    const builderDemoContainer = document.querySelector('[data-builder-demo-container]');
    const dynamicUIDemo = document.querySelector('[data-dynamic-ui-demo]');
    const isInBuilderSection = builderDemoContainer && dynamicUIDemo && builderDemoContainer.contains(dynamicUIDemo);
    
    // Only auto-play if:
    // - We're in the builder section
    // - Not already started
    // - Not in highlight mode
    // - Not resetting
    // - Has welcome message (messages.length === 1)
    // - Not returning from dashboard (ref is false)
    // - Is initial mount
    // - Not paused (when BuilderAgentDemo is running)
    const shouldStart = isInBuilderSection &&
                       !autoPlayStarted.current && 
                       !highlightInput && 
                       !isResetting && 
                       messages.length === 1 && 
                       !fromDashboardRef.current && 
                       isInitialMount.current &&
                       !pauseAutoRestart;
    
    if (shouldStart) {
      console.log('DynamicUIDemo: Starting auto-play sequence');
      isInitialMount.current = false;
      
      // Start the auto sequence after a short delay
      setTimeout(() => {
        autoPlaySequence();
      }, 1500);
    } else if (messages.length === 1 && !highlightInput && !isResetting && isInBuilderSection) {
      // Debug logging - only log when we have a message and conditions are close
      console.log('DynamicUIDemo: Auto-play blocked', {
        autoPlayStarted: autoPlayStarted.current,
        highlightInput,
        isResetting,
        messagesLength: messages.length,
        fromDashboard: fromDashboardRef.current,
        isInitialMount: isInitialMount.current,
        isInBuilderSection
      });
    }
  }, [highlightInput, isResetting, messages.length, pauseAutoRestart]);

  // Auto-restart loop after deployment
  useEffect(() => {
    if (deployedAgent && !highlightInput && !isMasking && !isResetting && !pauseAutoRestart) {
      // Wait for chat simulation to complete (6 seconds for chat + 3 seconds to show return message)
      const restartTimeout = setTimeout(() => {
        // Mask the content
        setIsMasking(true);
        
        // After masking, reset all state and restart
        setTimeout(() => {
          setIsResetting(true);
          
          // Reset all state
          setMessages([]);
          setStreamingText("");
          setIsStreaming(false);
          setAgentCreated(false);
          setIsDeploying(false);
          setDeployedAgent(null);
          setSelectedChip(null);
          setCurrentFeatureScreen(null);
          setShowFeatureScreens(false);
          streamingTextRef.current = "";
          isInitialMount.current = true;
          
          // Clear masking and resetting, then restart
          setTimeout(() => {
            setIsMasking(false);
            setIsResetting(false);
            autoPlayStarted.current = false;
            
            // Add welcome message back and restart sequence
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                content: "Hello! I'm the Studio agent builder. I can help you create AI agents for your business.",
                timestamp: new Date(),
              },
            ]);
          }, 300);
        }, 1000); // Mask duration
      }, 9000); // Wait 9 seconds after deployment to allow chat simulation to complete
      
      return () => clearTimeout(restartTimeout);
    }
  }, [deployedAgent, highlightInput, isMasking, isResetting, pauseAutoRestart]);

  useEffect(() => {
    // Auto-focus input when autoFocus prop is true
    // Only scroll if we're in the builder section and the demo is visible
    if (autoFocus && inputRef.current && !agentCreated) {
      setTimeout(() => {
        inputRef.current?.focus();
        // Only scroll if we're in the builder demo container
        const builderDemoContainer = document.querySelector('[data-builder-demo-container]');
        const dynamicUIDemo = document.querySelector('[data-dynamic-ui-demo]');
        if (builderDemoContainer && dynamicUIDemo && builderDemoContainer.contains(dynamicUIDemo)) {
          inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [autoFocus, agentCreated]);

  useEffect(() => {
    // Auto-scroll when messages or streaming text changes
    if (chatEndRef.current && chatContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  }, [messages, streamingText]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Check if agent has already been created in this session
    if (agentCreated) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "You've already created an agent in this session. To create another agent, please refresh the page.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setStreamingText("");
    streamingTextRef.current = "";

    // Generate agent configuration
    const agentConfig = parseAgentRequirements(userInput);

    // Generate agent response
    let response = "";
    if (agentConfig) {
      setAgentCreated(true); // Mark that an agent has been created
      response = `I'll build a ${agentConfig.name} for you! Here's the agent configuration:`;
    } else {
      response = `I can help you build AI agents! Try asking me to:\n\n• Build a customer support agent\n• Create a lead qualification agent\n• Build a KYC verification agent\n• Create a sales meeting scheduler\n• Build a fraud detection agent\n\nWhat kind of agent would you like to build?`;
    }

    setIsStreaming(true);

    await streamText(
      response,
      (chunk) => {
        streamingTextRef.current += chunk;
        setStreamingText(streamingTextRef.current);
      },
      () => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: streamingTextRef.current,
          timestamp: new Date(),
          agentConfig: agentConfig || undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        streamingTextRef.current = "";
        setStreamingText("");
        setIsStreaming(false);
      },
      20
    );
  };


  const autoPlaySequence = async () => {
    // Prevent multiple simultaneous runs
    if (autoPlayStarted.current || isStreamingRef.current || isResetting) {
      console.log('DynamicUIDemo: autoPlaySequence blocked', {
        autoPlayStarted: autoPlayStarted.current,
        isStreaming: isStreamingRef.current,
        isResetting
      });
      return;
    }
    
    // Set flag immediately to prevent duplicate calls
    autoPlayStarted.current = true;
    
    try {
      console.log('DynamicUIDemo: autoPlaySequence starting');
      
      // Step 1: Show chip selection animation
      const customerSupportCmd = "Build a customer support agent";
      setSelectedChip(customerSupportCmd);
    
      // Wait for chips to be rendered and refs to be set
      let chipElement = chipRefs.current[customerSupportCmd];
      let attempts = 0;
      while (!chipElement && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        chipElement = chipRefs.current[customerSupportCmd];
        attempts++;
      }
    
      // Visual feedback: scale down the chip
      if (chipElement) {
        chipElement.style.transform = 'scale(0.95)';
        chipElement.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
          if (chipElement) {
            chipElement.style.transform = 'scale(1)';
          }
        }, 200);
      }
      
      // Wait a bit to show the selection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Add user message - "Build a customer support agent"
      const userMessage: Message = {
        id: `user-auto-${Date.now()}`,
        role: "user",
        content: customerSupportCmd,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      
      // Clear selection after message appears
      setTimeout(() => {
        setSelectedChip(null);
      }, 500);

      // Step 3: Wait a bit, then generate agent config
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const agentConfig = parseAgentRequirements(customerSupportCmd);
      if (!agentConfig) {
        autoPlayStarted.current = false;
        return;
      }
      
      setAgentCreated(true);
      
      // Step 4: Stream the response
      const response = `I'll build a ${agentConfig.name} for you! Here's the agent configuration:`;
      
      // Clear any previous streaming state completely
      if (isStreamingRef.current) {
        isStreamingRef.current = false;
        setIsStreaming(false);
      }
      streamingTextRef.current = "";
      setStreamingText("");
      
      // Small delay to ensure state is cleared
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Start streaming
      setIsStreaming(true);
      isStreamingRef.current = true;

      await streamText(
        response,
        (chunk) => {
          streamingTextRef.current += chunk;
          setStreamingText(streamingTextRef.current);
        },
        async () => {
          const finalText = streamingTextRef.current;
          streamingTextRef.current = "";
          setStreamingText("");
          setIsStreaming(false);
          isStreamingRef.current = false;
          
          const assistantMessage: Message = {
            id: `assistant-auto-${Date.now()}`,
            role: "assistant",
            content: finalText,
            timestamp: new Date(),
            agentConfig: agentConfig || undefined,
          };

          setMessages((prev) => [...prev, assistantMessage]);
          
          // Step 5: Either show feature screens or go straight to deploy
          if (skipFeatureScreens) {
            // Skip feature screens, go straight to deploy
            await new Promise(resolve => setTimeout(resolve, 2000));
            await handleDeployAgent(agentConfig);
          } else {
            // Show feature screens sequentially
            await new Promise(resolve => setTimeout(resolve, 2000));
            await startFeatureScreensSequence(agentConfig);
          }
        },
        20
      );
    } catch (error) {
      console.error('Error in autoPlaySequence:', error);
      autoPlayStarted.current = false;
    }
  };

  const startFeatureScreensSequence = async (config: AgentConfig) => {
    setShowFeatureScreens(true);
    
    // Show each feature screen sequentially
    const screens = [0, 1, 2, 3, 4, 5, 6]; // 7 screens total
    const timings = [2000, 3000, 4000, 3000, 3000, 3000, 3000]; // Timing for each screen
    
    for (let i = 0; i < screens.length; i++) {
      setCurrentFeatureScreen(screens[i]);
      await new Promise(resolve => setTimeout(resolve, timings[i]));
    }
    
    // After all screens, show deploy screen
    setCurrentFeatureScreen(7); // Deploy screen
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Auto-deploy
    await handleDeployAgent(config);
  };

  const handleDeployAgent = async (config: AgentConfig) => {
    if (isDeploying) return;
    
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDeployedAgent(config.name);
    setIsDeploying(false);
    
    // Notify parent component that agent was deployed
    if (onAgentDeployed) {
      setTimeout(() => {
        onAgentDeployed();
      }, 500);
    }
    
    // Save agent to localStorage for dashboard
    const agentData = {
      id: `agent-${Date.now()}`,
      name: config.name,
      goal: config.goal,
      capabilities: config.capabilities,
      integrations: config.integrations || [],
      useCase: config.useCase,
      description: config.description,
      deployedAt: new Date().toISOString()
    };
    
    const existingAgents = localStorage.getItem('deployedAgents');
    const agents = existingAgents ? JSON.parse(existingAgents) : [];
    agents.push(agentData);
    localStorage.setItem('deployedAgents', JSON.stringify(agents));
    
    // Add simplified success message to chat
    const deployMessage: Message = {
      id: `deploy-${Date.now()}`,
      role: "assistant",
      content: `✅ Your agent "${config.name}" is ready!\n\nTesting your agent in the dashboard...`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, deployMessage]);
    
    // Simulate dashboard chat interaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add simulated user message from dashboard
    const userChatMessage: Message = {
      id: `user-chat-${Date.now()}`,
      role: "user",
      content: "I need help with my order #12345",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userChatMessage]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add simulated agent response
    const agentChatMessage: Message = {
      id: `agent-chat-${Date.now()}`,
      role: "assistant",
      content: "I can help you with that! Let me check your order details. Your order #12345 is currently being processed and will ship within 2-3 business days.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, agentChatMessage]);
    
    // Wait a bit more to show the interaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add message about returning to builder
    const returnMessage: Message = {
      id: `return-${Date.now()}`,
      role: "system",
      content: "Agent is working perfectly! Returning to builder to create another agent...",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, returnMessage]);
    
    // Signal that demo cycle is complete (before restart)
    // Wait a bit to show the return message, then signal completion
    setTimeout(() => {
      // Only scroll to demo title if we're in the Builder section
      // Check if DynamicUIDemo is within the builder demo container
      const dynamicUIDemo = document.querySelector('[data-dynamic-ui-demo]');
      const builderDemoContainer = document.querySelector('[data-builder-demo-container]');
      
      // Only scroll if we're in the builder section context
      if (dynamicUIDemo && builderDemoContainer && builderDemoContainer.contains(dynamicUIDemo)) {
        const demoTitle = document.querySelector('[data-demo-title]');
        if (demoTitle) {
          demoTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      
      if (onDemoComplete) {
        onDemoComplete();
      }
    }, 2000); // Wait 2 seconds after return message to show it
    
    // Don't navigate to dashboard, just simulate and restart
    // The auto-restart loop will handle resetting
  };

  const renderFeatureScreen = (screenIndex: number, config: AgentConfig) => {
    const isDeployed = deployedAgent === config.name;
    
    switch (screenIndex) {
      case 0: // Channels
        return (
          <motion.div
            key="channels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-blue-100 rounded-full mb-4"
              >
                <Globe className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your agent works everywhere your customers are</h3>
              <p className="text-gray-600">Deploy your agent on your website, through an API, in Slack, or anywhere else—all from one place.</p>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-6">
              {[
                { icon: Globe, label: "Web", colorClass: "text-blue-600" },
                { icon: Code, label: "API", colorClass: "text-purple-600" },
                { icon: MessageSquare, label: "Slack", colorClass: "text-pink-600" },
                { icon: MessageSquare, label: "WhatsApp", colorClass: "text-green-600" },
                { icon: MessageSquare, label: "Email", colorClass: "text-orange-600" },
              ].map((channel, idx) => (
                <motion.div
                  key={channel.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
                >
                  <channel.icon className={`w-8 h-8 ${channel.colorClass} mb-2`} />
                  <span className="text-xs font-semibold text-gray-700">{channel.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">One agent, multiple places</p>
          </motion.div>
        );

      case 1: // Memory (LTM & STM)
        return (
          <motion.div
            key="memory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-purple-100 rounded-full mb-4"
              >
                <Brain className="w-12 h-12 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your agent remembers what matters</h3>
              <p className="text-gray-600">It remembers recent conversations (short-term) and important details about your business (long-term), so every interaction feels personal.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Short-term Memory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white rounded-lg border-2 border-purple-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800">Recent Chats</h4>
                </div>
                <div className="space-y-2">
                  {["Hi, I need help", "What's my order status?", "Can you help me?"].map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="p-2 bg-purple-50 rounded text-sm text-gray-700"
                    >
                      {msg}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Long-term Memory */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white rounded-lg border-2 border-purple-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800">Important Facts</h4>
                </div>
                <div className="space-y-2">
                  {["Customer preferences", "Order history", "Account details"].map((fact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-2 p-2 bg-purple-50 rounded"
                    >
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">{fact}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Recent chats + Important facts = Better conversations</p>
          </motion.div>
        );

      case 2: // Quality Check (Hallucination Testing)
        return (
          <motion.div
            key="quality"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-green-100 rounded-full mb-4"
              >
                <Shield className="w-12 h-12 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Every answer is checked for accuracy</h3>
              <p className="text-gray-600">Before your agent responds, it automatically checks if the answer is correct and helpful—no more wrong information.</p>
            </div>
            <div className="max-w-md mx-auto mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white rounded-lg border-2 border-green-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Question asked...</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5 text-green-600" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-lg"
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-700">✓ Verified accurate</p>
                    <p className="text-xs text-gray-600">98.5% accuracy rate</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Automatic quality check on every response</p>
          </motion.div>
        );

      case 3: // Multiple LLMs
        return (
          <motion.div
            key="llms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-indigo-100 rounded-full mb-4"
              >
                <Cpu className="w-12 h-12 text-indigo-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Pick the perfect AI for your needs</h3>
              <p className="text-gray-600">Choose from the best AI models—some are super smart, others are fast and affordable. Pick what works best for you.</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[
                { name: "GPT-4", desc: "Most capable", selected: true },
                { name: "Claude", desc: "Super smart", selected: false },
                { name: "Llama", desc: "Fast & open", selected: false },
                { name: "Mistral", desc: "Affordable", selected: false },
              ].map((model, idx) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    model.selected
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-bold text-lg mb-1">{model.name}</p>
                    <p className={`text-xs ${model.selected ? "text-indigo-100" : "text-gray-500"}`}>{model.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Different AI models for different needs</p>
          </motion.div>
        );

      case 4: // Analytics
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-orange-100 rounded-full mb-4"
              >
                <BarChart3 className="w-12 h-12 text-orange-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">See how your agent is performing</h3>
              <p className="text-gray-600">Watch real-time stats: How fast it responds, how many questions it answers correctly, and how much it costs.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Speed", value: "245ms", icon: Gauge, iconColor: "text-blue-600", valueColor: "text-blue-600" },
                { label: "Success", value: "98%", icon: CheckCircle, iconColor: "text-green-600", valueColor: "text-green-600" },
                { label: "Cost", value: "$0.02", icon: Zap, iconColor: "text-purple-600", valueColor: "text-purple-600" },
              ].map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white rounded-lg border-2 border-orange-200 text-center"
                >
                  <metric.icon className={`w-8 h-8 ${metric.iconColor} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${metric.valueColor} mb-1`}>{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Real-time performance tracking</p>
          </motion.div>
        );

      case 5: // BYO Agent
        return (
          <motion.div
            key="byo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-teal-100 rounded-full mb-4"
              >
                <Upload className="w-12 h-12 text-teal-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Already have an agent? Bring it here</h3>
              <p className="text-gray-600">If you've built an agent elsewhere, you can bring it to our platform and get all these features—memory, quality checks, analytics, and more.</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              {["OpenAI", "Anthropic", "Custom"].map((platform, idx) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-4 bg-white rounded-lg border-2 border-teal-200 mb-2">
                    <Bot className="w-8 h-8 text-teal-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{platform}</span>
                  {idx < 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.2 + 0.3 }}
                      className="text-teal-600 text-xl mt-2"
                    >
                      →
                    </motion.div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="p-4 bg-teal-600 rounded-lg border-2 border-teal-700 mb-2">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-semibold text-teal-700">Our Platform</span>
              </motion.div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Import your existing agents</p>
          </motion.div>
        );

      case 6: // Summary/Ready to Deploy
        return (
          <motion.div
            key="deploy-ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex p-4 bg-green-100 rounded-full mb-4"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your agent is ready!</h3>
              <p className="text-gray-600 mb-4">All features are configured and ready to go.</p>
              
              {/* Feature summary icons */}
              <div className="flex justify-center gap-3 mt-6 flex-wrap">
                {[
                  { icon: Globe, label: "Channels" },
                  { icon: Brain, label: "Memory" },
                  { icon: Shield, label: "Quality" },
                  { icon: Cpu, label: "AI Models" },
                  { icon: BarChart3, label: "Analytics" },
                  { icon: Upload, label: "BYO" },
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center p-3 bg-white rounded-lg border border-green-200"
                  >
                    <feature.icon className="w-6 h-6 text-green-600 mb-1" />
                    <span className="text-xs text-gray-600">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderAgentConfig = (config: AgentConfig) => {
    const isDeployed = deployedAgent === config.name;
    
    // If feature screens are showing and not skipped, render the current feature screen
    if (showFeatureScreens && currentFeatureScreen !== null && !skipFeatureScreens) {
      return (
        <div className="relative">
          <AnimatePresence mode="wait">
            {renderFeatureScreen(currentFeatureScreen, config)}
          </AnimatePresence>
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentFeatureScreen
                    ? "bg-blue-600 w-8"
                    : idx < currentFeatureScreen
                    ? "bg-blue-400"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          {/* Deploy button on last screen */}
          {currentFeatureScreen === 6 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Button
                className="w-full"
                onClick={() => handleDeployAgent(config)}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy Agent"
                )}
              </Button>
            </motion.div>
          )}
        </div>
      );
    }
    
    // Original agent config display (shown briefly before feature screens)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-primary/20 rounded-lg shadow-md"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-800 mb-1">{config.name}</h4>
            <p className="text-sm text-gray-600">{config.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm text-gray-700">Goal</span>
            </div>
            <p className="text-sm text-gray-600 pl-6">{config.goal}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm text-gray-700">Capabilities</span>
            </div>
            <ul className="space-y-1 pl-6">
              {config.capabilities.map((capability, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {config.integrations && config.integrations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm text-gray-700">Integrations</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {config.integrations.map((integration, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm text-gray-700">Use Case:</span>
              <span className="text-sm text-primary font-medium">{config.useCase}</span>
            </div>
          </div>

          <div className="pt-2">
            {isDeployed ? (
              <div className="w-full p-3 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Agent Deployed Successfully!</span>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full"
                onClick={() => handleDeployAgent(config)}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy Agent"
                )}
            </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Card className={`w-full max-w-5xl mx-auto shadow-lg transition-opacity duration-1000 relative ${isMasking ? 'opacity-0' : 'opacity-100'}`} data-dynamic-ui-demo="true">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b relative">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-purple-600" />
          Agent Builder Demo
        </CardTitle>
                    {showBadge && (
                      <Badge 
                        variant="default" 
                        className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white border-0 flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold"
                      >
                        <span className="relative flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-white rounded-full animate-ping absolute"></span>
                          <span className="w-2 h-2 bg-white rounded-full relative"></span>
                          <span>Try Now</span>
                        </span>
                      </Badge>
                    )}
        <p className="text-sm text-gray-600 mt-2">
          Hello! I'm the Studio agent builder. I can help you create AI agents for your business.
        </p>
      </CardHeader>
      <CardContent className={`space-y-4 p-6 transition-opacity duration-1000 ${isMasking ? 'opacity-0' : 'opacity-100'}`}>
        {/* Quick Commands - Hide when auto-playing */}
        {highlightInput && (
          <div className="flex flex-wrap gap-2" data-agent-chips="true">
            {DEMO_COMMANDS.map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(cmd);
                  setTimeout(() => handleSend(), 100);
                }}
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {cmd}
              </Button>
            ))}
          </div>
        )}

        {/* Pre-defined Command Chips - Outside chat area */}
        {messages.some(msg => msg.id === "welcome") && (
          <div className="flex flex-wrap gap-2 mb-4" data-agent-chips="true">
            {DEMO_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                ref={(el) => {
                  chipRefs.current[cmd] = el;
                }}
                className={`px-3 py-1.5 text-xs border rounded-md transition-all duration-200 cursor-default ${
                  selectedChip === cmd
                    ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-md'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
                disabled
              >
                {cmd}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div ref={chatContainerRef} className="space-y-4 max-h-[500px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
          {messages.filter(msg => msg.id !== "welcome").map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : msg.role === "system"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 text-purple-800"
                    : "bg-white border text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                {msg.dashboardLink && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      ref={dashboardLinkRef}
                      to="/platform/studio/dashboard"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-150"
                      onClick={(e) => {
                        // Allow navigation after deployment or when highlightInput is false (interactive mode)
                        // Only prevent in strict demo mode (when highlightInput is explicitly true and no agent deployed)
                        if (highlightInput === true && !deployedAgent) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Bot className="w-4 h-4" />
                      View Agent Builder Dashboard
                    </Link>
                  </div>
                )}
                {msg.agentConfig && (
                  <div className="mt-4">
                    {renderAgentConfig(msg.agentConfig)}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Streaming Message */}
          {(streamingText || isStreaming) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] rounded-lg px-4 py-3 bg-white border text-gray-800 shadow-sm">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {streamingText}
                  <span className="animate-pulse ml-1">▋</span>
                </p>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input - Hide when auto-playing */}
        {highlightInput && (
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !e.shiftKey && !agentCreated) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={agentCreated ? "Agent created! Refresh the page to create another agent." : "Describe the agent you want to build..."}
              className={`flex-1 transition-all duration-500 ${
                highlightInput 
                  ? "ring-4 ring-indigo-500 ring-offset-2 shadow-lg scale-105" 
                  : ""
              }`}
              disabled={agentCreated}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isStreaming || agentCreated}>
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Info */}
      </CardContent>
      
    </Card>
  );
};

