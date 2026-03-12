import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Trash2, Plus, ArrowLeft, Clock, Send } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${className}`}>
    {children}
  </div>
);

interface DeployedAgent {
  id: string;
  name: string;
  goal: string;
  capabilities: string[];
  integrations: string[];
  useCase: string;
  description: string;
  deployedAt: Date;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agents, setAgents] = useState<DeployedAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<DeployedAgent | null>(null);
  const [testInput, setTestInput] = useState('');
  const [testMessages, setTestMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll chat to bottom when messages change (only within chat container, not page)
  useEffect(() => {
    if (messagesEndRef.current && selectedAgent) {
      // Scroll within the chat container, not the whole page
      const chatContainer = messagesEndRef.current.closest('.overflow-y-auto') as HTMLElement;
      if (chatContainer) {
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
      }
    }
  }, [testMessages, selectedAgent]);
  const [interviewState, setInterviewState] = useState<{
    stage: 'not_started' | 'role_identified' | 'in_progress' | 'completed';
    role?: string;
    experience?: string;
    questionNumber: number;
  }>({ stage: 'not_started', questionNumber: 0 });
  const autoPlayStarted = useRef(false);
  const isFromDemo = useRef(location.state?.fromDemo || false);

  const startAutoPlayConversation = React.useCallback(async (agent: DeployedAgent) => {
    if (!agent) {
      console.log('Dashboard: startAutoPlayConversation - no agent');
      return;
    }
    
    console.log('Dashboard: startAutoPlayConversation - starting with', agent.name);
    
    // Wait for initial greeting to be visible
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const conversation = [
      { role: 'user' as const, content: 'I need help with my order' },
      { role: 'assistant' as const, content: "I can help! What's your order number?" },
      { role: 'user' as const, content: 'Order #12345' },
      { role: 'assistant' as const, content: "I see you requested a refund 2 days ago. Let me check the status for Order #12345...\n\nYour refund of $49.99 has been processed and will arrive in your account within 3-5 business days. Is there anything else I can help you with?" },
      { role: 'user' as const, content: 'Thank you!' },
      { role: 'assistant' as const, content: "You're welcome! Have a great day!" },
    ];

    console.log('Dashboard: Adding conversation messages', conversation.length);
    
    // Add messages one by one with delays
    for (let i = 0; i < conversation.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 1500 : 2000));
      console.log(`Dashboard: Adding message ${i + 1}/${conversation.length}`);
      setTestMessages(prev => {
        const newMessages = [...prev, conversation[i]];
        console.log(`Dashboard: Messages updated, total: ${newMessages.length}`);
        return newMessages;
      });
    }

    // After conversation, wait and navigate back to prelaunch
    console.log('Dashboard: Conversation complete, navigating back');
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/prelaunch/v8', { state: { fromDashboard: true }, replace: true });
  }, [navigate]);

  useEffect(() => {
    // Check localStorage flag (set by DynamicUIDemo)
    const fromDemoFlag = localStorage.getItem('fromDemo');
    if (fromDemoFlag === 'true') {
      isFromDemo.current = true;
      localStorage.removeItem('fromDemo');
    }
    
    // Also check location state
    if (location.state?.fromDemo) {
      isFromDemo.current = true;
    }
    
    console.log('Dashboard: useEffect running', {
      fromDemoFlag,
      fromDemoState: location.state?.fromDemo,
      isFromDemo: isFromDemo.current,
      autoPlayStarted: autoPlayStarted.current
    });
    
    // Load agents from localStorage
    const savedAgents = localStorage.getItem('deployedAgents');
    if (savedAgents) {
      try {
        const parsed = JSON.parse(savedAgents);
        const loadedAgents = parsed.map((agent: Omit<DeployedAgent, 'deployedAt'> & { deployedAt: string }) => ({
          ...agent,
          deployedAt: new Date(agent.deployedAt)
        })) as DeployedAgent[];
        setAgents(loadedAgents);
        
        console.log('Dashboard: Agents loaded', {
          count: loadedAgents.length,
          isFromDemo: isFromDemo.current,
          autoPlayStarted: autoPlayStarted.current
        });
        
        // Auto-play test conversation if coming from demo
        if (isFromDemo.current && loadedAgents.length > 0 && !autoPlayStarted.current) {
          console.log('Dashboard: Starting auto-play');
          autoPlayStarted.current = true;
          const customerSupportAgent = loadedAgents.find((a: DeployedAgent) => 
            a.name.toLowerCase().includes('customer support') || 
            a.name.toLowerCase().includes('support')
          ) || loadedAgents[0];
          
          console.log('Dashboard: Selected agent', customerSupportAgent.name);
          
          // First select the agent and show initial greeting
          handleTestAgent(customerSupportAgent);
          
          // Then start the conversation after a delay (allow greeting to render)
          // Pass the agent directly to avoid stale closure issues
          setTimeout(() => {
            console.log('Dashboard: Calling startAutoPlayConversation');
            startAutoPlayConversation(customerSupportAgent).catch(err => {
              console.error('Error in auto-play conversation:', err);
            });
          }, 1500);
        }
      } catch (e) {
        console.error('Failed to load agents:', e);
      }
    } else {
      console.log('Dashboard: No agents found in localStorage');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, location.pathname]);

  const handleTestAgent = (agent: DeployedAgent) => {
    setSelectedAgent(agent);
    setTestMessages([
      {
        role: 'assistant',
        content: `Hello! I'm your ${agent.name}. ${agent.description}\n\nHow can I help you today?`
      }
    ]);
    setInterviewState({ stage: 'not_started', questionNumber: 0 });
    
    // Scroll test interface into view when agent is selected (for auto-play)
    if (isFromDemo.current) {
      setTimeout(() => {
        const testInterface = document.getElementById('test-interface');
        if (testInterface) {
          testInterface.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  };

  const generateAgentResponse = (
    userInput: string, 
    agent: DeployedAgent, 
    currentState: typeof interviewState,
    setState: React.Dispatch<React.SetStateAction<typeof interviewState>>
  ): string => {
    const lowerInput = userInput.toLowerCase();

    // Interview Bot Agent - Conduct actual interview
    if (agent.name.includes('Interview') || agent.name.includes('interview')) {
      // Extract role and experience from user input
      if (currentState.stage === 'not_started') {
        const roleMatch = userInput.match(/(?:role|position|job|for)\s+(?:of\s+)?([^,]+?)(?:\s+with|\s+a\s+candidate|$)/i);
        const expMatch = userInput.match(/(\d+)\s*(?:years?|yrs?|year)/i);
        
        if (roleMatch || expMatch) {
          const role = roleMatch ? roleMatch[1].trim() : 'the position';
          const experience = expMatch ? expMatch[1] : undefined;
          
          setState({
            stage: 'role_identified',
            role,
            experience,
            questionNumber: 0
          });
          
          return `Thank you! I'll conduct a structured interview for ${role}${experience ? ` with ${experience} years of experience` : ''}.\n\nLet me start by understanding the candidate's background.\n\n**Question 1:** Can you tell me about your relevant experience for this ${role} role? What key projects or achievements stand out?`;
        } else {
          return `I'd be happy to conduct an interview! To get started, please tell me:\n- What role are you interviewing for?\n- What level of experience should I focus on?\n\nFor example: "Conduct an interview for Senior Tech Writer with 12 years of experience"`;
        }
      }

      // Interview in progress - ask contextual questions
      if (currentState.stage === 'role_identified' || currentState.stage === 'in_progress') {
        const newQuestionNumber = currentState.questionNumber + 1;
        
        const questions = [
          `**Question ${newQuestionNumber + 1}:** That's helpful context. Can you walk me through a specific challenge you faced in a similar role and how you resolved it?`,
          `**Question ${newQuestionNumber + 1}:** Great! Now, what technical skills or tools are most important for success in this ${currentState.role || 'role'}? How do you stay current with industry trends?`,
          `**Question ${newQuestionNumber + 1}:** I'd like to understand your approach to collaboration. Can you describe a time when you had to work with cross-functional teams or stakeholders?`,
          `**Question ${newQuestionNumber + 1}:** Let's talk about problem-solving. Can you share an example of a complex problem you solved and the process you used?`,
          `**Question ${newQuestionNumber + 1}:** Finally, what questions do you have about this ${currentState.role || 'role'} or the team?`
        ];

        if (newQuestionNumber >= questions.length) {
          setState(prev => ({ ...prev, stage: 'completed' }));
          return `**Interview Complete**\n\nThank you for the interview! Based on our conversation, I've evaluated your responses on:\n\n✅ Technical competency\n✅ Problem-solving approach\n✅ Communication skills\n✅ Cultural fit\n\nI'll generate a detailed interview report with recommendations. Is there anything else you'd like to add?`;
        }

        setState(prev => ({
          ...prev,
          stage: 'in_progress',
          questionNumber: newQuestionNumber
        }));

        return questions[newQuestionNumber - 1];
      }

      if (currentState.stage === 'completed') {
        return `The interview has been completed. I can generate a summary report or answer any follow-up questions. Would you like me to proceed?`;
      }
    }

    // Generic agent responses - more contextual
    if (lowerInput.includes('help') || lowerInput.includes('what can') || lowerInput.includes('capabilities')) {
      return `I can help you with:\n${agent.capabilities.map((cap, i) => `${i + 1}. ${cap}`).join('\n')}\n\nWhat would you like me to do?`;
    }

    if (lowerInput.includes('how') || lowerInput.includes('explain')) {
      return `As your ${agent.name}, I'm designed to ${agent.goal.toLowerCase()}. ${agent.capabilities[0] || 'I can process your request and provide assistance.'}\n\nCould you provide more specific details about what you need?`;
    }

    // Default contextual response
    return `I understand. As your ${agent.name}, I can help with that. ${agent.capabilities[0] || 'Let me process your request.'}\n\n${agent.capabilities.length > 1 ? `I can also ${agent.capabilities.slice(1, 3).join(', ')}.` : ''}\n\nHow would you like to proceed?`;
  };

  const handleSendTestMessage = () => {
    if (!testInput.trim() || !selectedAgent) return;

    const userMessage = { role: 'user' as const, content: testInput };
    setTestMessages(prev => [...prev, userMessage]);
    const currentInput = testInput.trim();
    setTestInput('');

    // Generate intelligent response with current state
    setTimeout(() => {
      const response = generateAgentResponse(currentInput, selectedAgent, interviewState, setInterviewState);
      setTestMessages(prev => [...prev, { role: 'assistant' as const, content: response }]);
    }, 800);
  };

  const handleDeleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      const updated = agents.filter(a => a.id !== agentId);
      setAgents(updated);
      localStorage.setItem('deployedAgents', JSON.stringify(updated));
      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
        setTestMessages([]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />
      
      <main>
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link 
                  to="/platform/studio" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Agent Builder
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Agent Builder Dashboard</h1>
                <p className="text-muted-foreground">Manage and test your deployed agents</p>
              </div>
              <Link
                to="/platform/studio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Agent
              </Link>
            </div>

            {agents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-card border border-border rounded-2xl"
              >
                <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No agents deployed yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first agent to get started
                </p>
                <Link
                  to="/platform/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Agent
                </Link>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Agents List */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-xl font-bold mb-4">Your Agents ({agents.length})</h2>
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-card border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedAgent?.id === agent.id 
                          ? 'border-primary shadow-lg' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleTestAgent(agent)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{agent.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {agent.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agent.id);
                          }}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {agent.deployedAt.toLocaleDateString()}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                          Active
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Test Interface */}
                <div className="lg:col-span-2" id="test-interface">
                  {selectedAgent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold mb-1">Test Agent</h2>
                          <p className="text-sm text-muted-foreground">{selectedAgent.name}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedAgent(null);
                            setTestMessages([]);
                          }}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Close
                        </button>
                      </div>

                      {/* Chat Messages */}
                      <div 
                        className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[400px] max-h-[500px] p-4 bg-muted/30 rounded-lg"
                        style={{ scrollBehavior: 'smooth' }}
                      >
                        {testMessages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                msg.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card border border-border'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={testInput}
                          onChange={(e) => setTestInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && testInput.trim()) {
                              e.preventDefault();
                              handleSendTestMessage();
                            }
                          }}
                          placeholder={
                            interviewState.stage === 'completed' 
                              ? "Interview completed. Ask follow-up questions or request a report..."
                              : "Type a message to test your agent..."
                          }
                          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        />
                        <button
                          onClick={handleSendTestMessage}
                          disabled={!testInput.trim()}
                          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Agent Info */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Use Case:</span>
                            <span className="ml-2 font-medium">{selectedAgent.useCase}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Capabilities:</span>
                            <span className="ml-2 font-medium">{selectedAgent.capabilities.length}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center h-full flex items-center justify-center">
                      <div>
                        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Select an agent to test</h3>
                        <p className="text-muted-foreground">
                          Click on an agent from the list to start testing it
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

