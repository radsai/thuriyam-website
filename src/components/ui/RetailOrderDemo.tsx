/**
 * Retail Order Tracking & Support Demo
 * Interactive demo showing how the platform solves order tracking and customer support use case
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Truck, MessageSquare, Bot, User, MapPin, CheckCircle, Eye, Wrench, Sparkles, AlertCircle } from 'lucide-react';
import { UseCaseDemo, UseCaseStep } from './UseCaseDemo';

const RetailOrderDemo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const steps: UseCaseStep[] = [
    {
      id: '1',
      title: 'Natural Language Order Inquiry',
      description: 'Customers can ask about their orders using natural language from any channel—chat, email, phone, or social media. The agent understands context and intent instantly.',
      activeUSPs: ['channels', 'builder'],
      timeSaved: 'Traditional: 10 min wait → Platform: Instant',
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Customer (via chat):</div>
                <div className="text-sm text-gray-900">
                  "Where is my order? I ordered last week and haven't received it yet."
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200"
            >
              <Bot className="w-5 h-5 text-purple-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Agent understands:</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-700">• Intent: Order tracking</div>
                  <div className="text-xs text-gray-700">• Timeframe: Last week</div>
                  <div className="text-xs text-gray-700">• Status: Not received</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Chat', 'Email', 'Phone', 'Social'].map((channel) => (
              <div
                key={channel}
                className="bg-cyan-50 rounded-lg p-2 border border-cyan-200 text-center"
              >
                <div className="text-xs font-semibold text-cyan-900">{channel}</div>
                <div className="text-xs text-cyan-700">Available</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: '2',
      title: 'Instant Order Lookup with Memory',
      description: 'The agent remembers the customer\'s order history and preferences. It instantly retrieves order details without asking for order numbers or account information.',
      activeUSPs: ['memory', 'builder'],
      metrics: [
        { label: 'Lookup Time', value: '< 1 sec' },
        { label: 'Orders Found', value: '3' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Order History</div>
            <div className="space-y-2">
              {[
                { id: 'ORD-12345', status: 'In Transit', date: '3 days ago' },
                { id: 'ORD-12340', status: 'Delivered', date: '1 week ago' },
                { id: 'ORD-12335', status: 'Delivered', date: '2 weeks ago' },
              ].map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{order.id}</div>
                    <div className="text-xs text-gray-600">{order.date}</div>
                  </div>
                  <div className={`text-xs font-semibold ${
                    order.status === 'In Transit' ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {order.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
            <div className="flex items-start gap-2">
              <Bot className="w-4 h-4 text-pink-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-pink-900 mb-1">Agent remembers:</div>
                <div className="text-xs text-pink-700">
                  "Customer's order preferences and shipping address"
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: 'Real-Time Shipping Updates',
      description: 'The agent integrates with shipping APIs to provide real-time tracking updates. Customers see live status, estimated delivery, and can track their package on a map.',
      activeUSPs: ['observability', 'builder'],
      metrics: [
        { label: 'Update Frequency', value: 'Real-time' },
        { label: 'Accuracy', value: '99%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Order #ORD-12345</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">In Transit</span>
                </div>
                <span className="text-xs text-gray-600">Updated 2 min ago</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-2">Current Location</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">Distribution Center, Chicago</span>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                <div className="text-xs text-gray-700 mb-1">Estimated Delivery</div>
                <div className="text-sm font-bold text-blue-900">Tomorrow, 2:00 PM</div>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Eye className="w-4 h-4" />
              <span>Live tracking data from shipping provider API</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '4',
      title: 'Intelligent Issue Resolution',
      description: 'The agent handles common issues like delayed delivery, wrong items, or damaged packages. Quality checks ensure accurate responses, and guardrails prevent incorrect actions.',
      activeUSPs: ['builder', 'governance'],
      metrics: [
        { label: 'Resolution Rate', value: '85%' },
        { label: 'First Contact', value: 'Yes' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Customer:</div>
                <div className="text-sm text-gray-900">
                  "My package is delayed. What can you do?"
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200"
            >
              <Bot className="w-5 h-5 text-purple-600 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Agent resolves:</div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-700">• Explains delay reason</div>
                  <div className="text-xs text-gray-700">• Offers expedited shipping</div>
                  <div className="text-xs text-gray-700">• Provides $10 credit for inconvenience</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span>Issue resolved without human intervention</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '5',
      title: 'Proactive Customer Updates',
      description: 'The agent proactively notifies customers about delays, shipping updates, or special offers based on their order history. Personalized communication builds loyalty.',
      activeUSPs: ['memory', 'channels'],
      metrics: [
        { label: 'Proactive Messages', value: '3' },
        { label: 'Engagement Rate', value: '92%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Proactive Notifications</div>
            <div className="space-y-2">
              {[
                { type: 'Delay Alert', time: '2 hours ago', icon: AlertCircle },
                { type: 'Shipping Update', time: '1 day ago', icon: Truck },
                { type: 'Order Confirmed', time: '3 days ago', icon: CheckCircle },
              ].map((notif, idx) => {
                const Icon = notif.icon;
                return (
                  <motion.div
                    key={notif.type}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-900">{notif.type}</div>
                      <div className="text-xs text-gray-600">{notif.time}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
            <div className="flex items-center gap-2 text-sm text-pink-700">
              <Sparkles className="w-4 h-4" />
              <span>Personalized based on order history and preferences</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '6',
      title: 'Seamless Support Escalation',
      description: 'For complex issues, the agent escalates to human support with complete context. Full observability ensures nothing is lost in the handoff, and the customer never has to repeat themselves.',
      activeUSPs: ['governance', 'observability', 'memory'],
      timeSaved: 'Traditional: 15 min → Platform: 30 seconds',
      metrics: [
        { label: 'Context Preserved', value: '100%' },
        { label: 'Customer Satisfaction', value: '95%' },
      ],
      visualContent: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-3">Escalation Summary</div>
            <div className="space-y-2">
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-xs font-semibold text-blue-900 mb-1">Issue</div>
                <div className="text-xs text-blue-700">Complex refund request requiring manager approval</div>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <div className="text-xs font-semibold text-green-900 mb-1">Context Provided</div>
                <div className="text-xs text-green-700">• Full conversation history • Order details • Previous interactions</div>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-xs font-semibold text-purple-900 mb-1">Status</div>
                <div className="text-xs text-purple-700">Escalated to human agent with full context</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-green-900 mb-1">Seamless Handoff</h4>
            <p className="text-xs text-green-700">
              Human agent has all context. Customer doesn't need to repeat anything.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Eye className="w-4 h-4" />
              <span>Complete interaction trace available in dashboard</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <UseCaseDemo
      title="Order Tracking & Support"
      description="Deliver exceptional customer experience with intelligent order management"
      icon={ShoppingCart}
      iconColor="text-purple-600"
      iconBgColor="bg-purple-100"
      steps={steps}
      autoPlay={false}
      onComplete={onComplete}
    />
  );
};

export default RetailOrderDemo;
