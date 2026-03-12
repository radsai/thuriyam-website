/**
 * Use Case Demo Page
 * Simple page that renders the interactive demo based on URL parameter
 */

import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CreditCard, ShoppingCart } from 'lucide-react';
import BankingKYCDemo from '@/components/ui/BankingKYCDemo';
import InsuranceClaimsDemo from '@/components/ui/InsuranceClaimsDemo';
import RetailOrderDemo from '@/components/ui/RetailOrderDemo';

const Demo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const demoType = searchParams.get('type') || 'banking';

  const demos = {
    banking: {
      title: 'KYC & Account Opening',
      description: 'Automate customer onboarding with intelligent verification and compliance',
      icon: Building2,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      component: <BankingKYCDemo />,
    },
    insurance: {
      title: 'Claims Processing',
      description: 'Streamline claims from intake to payment with intelligent automation',
      icon: CreditCard,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
      component: <InsuranceClaimsDemo />,
    },
    retail: {
      title: 'Order Tracking & Support',
      description: 'Deliver exceptional customer experience with intelligent order management',
      icon: ShoppingCart,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
      component: <RetailOrderDemo />,
    },
  };

  const currentDemo = demos[demoType as keyof typeof demos] || demos.banking;
  const otherDemos = Object.entries(demos).filter(([key]) => key !== demoType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            // Navigate to prelaunch page with hash
            window.location.href = '/prelaunch/v8#solutions';
          }}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Solutions</span>
        </motion.button>

        {/* Demo */}
        <div className="mb-12">
          {currentDemo.component}
        </div>

        {/* Explore Other Use Cases */}
        {otherDemos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 pt-8 border-t border-slate-200"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Explore Other Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherDemos.map(([key, demo]) => {
                const DemoIcon = demo.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => navigate(`/solutions/demo?type=${key}`, { replace: true })}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all text-left shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-lg ${demo.iconBgColor}`}>
                        <DemoIcon className={`w-6 h-6 ${demo.iconColor}`} />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {demo.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600">{demo.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Demo;
