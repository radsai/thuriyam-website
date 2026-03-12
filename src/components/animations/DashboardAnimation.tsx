import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';

interface DashboardAnimationProps {
  isVisible: boolean;
}

export const DashboardAnimation: React.FC<DashboardAnimationProps> = ({ isVisible }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isVisible) {
      // Clear all timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      setMessages([]);
      setIsTyping(false);
      return;
    }

    const addTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutsRef.current.push(timeout);
    };

    const runCycle = () => {
      setIsTyping(true);
      
      // Step 1: User message
      addTimeout(() => {
        setIsTyping(false);
        setMessages([{ role: 'user', content: 'Test the customer support agent' }]);
      }, 500);

      // Step 2: Agent response
      addTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Hello! I\'m your Customer Support Agent. How can I help you today?' }]);
      }, 2500);

      // Step 3: User follow-up
      addTimeout(() => {
        setIsTyping(true);
        addTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { role: 'user', content: 'Help me with a refund request' }]);
        }, 800);
      }, 5000);

      // Step 4: Agent response
      addTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I can help you with that! To process your refund, I\'ll need your order number. Can you provide it?' }]);
      }, 7000);

      // Reset and loop
      addTimeout(() => {
        setMessages([]);
        addTimeout(runCycle, 2000);
      }, 10000);
    };

    addTimeout(runCycle, 1000);

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-6 border rounded-lg bg-white shadow-md overflow-hidden"
    >
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-sm text-gray-900">Agent Builder Dashboard</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Live Testing</span>
          </div>
        </div>
      </div>

      {/* Agent Info Bar */}
      <div className="px-4 py-2 bg-indigo-50 border-b">
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-gray-600">Agent:</span>
            <span className="ml-1 font-medium text-gray-900">Customer Support Agent</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className="ml-1 text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="p-4 bg-gray-50 min-h-[300px] max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border text-gray-800'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1 mb-1">
                    <Bot className="w-3 h-3 text-indigo-600" />
                    <span className="text-xs font-medium text-indigo-600">Agent</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-end mb-3"
          >
            <div className="bg-indigo-600 text-white rounded-lg px-3 py-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="animate-pulse">Typing</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500">
            Type a message to test your agent...
          </div>
          <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="px-4 py-2 bg-green-50 border-t">
        <div className="flex items-center gap-2 text-xs text-green-700">
          <CheckCircle className="w-4 h-4" />
          <span className="font-medium">Changes applied instantly • No deployment required</span>
        </div>
      </div>
    </motion.div>
  );
};

