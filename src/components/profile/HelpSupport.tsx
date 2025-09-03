import { ArrowLeft, MessageCircle, Phone, Mail, BookOpen, Search, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { motion } from 'motion/react';

interface HelpSupportProps {
  onBack: () => void;
}

const faqItems = [
  {
    question: 'How do I start a charging session?',
    answer: 'Navigate to a charging station, tap "Start Charging", and follow the on-screen instructions.',
    category: 'charging',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards, debit cards, and digital wallet payments through the app.',
    category: 'payment',
  },
  {
    question: 'How do I report a faulty charging station?',
    answer: 'Tap on the station details and select "Report Issue" to notify our support team.',
    category: 'technical',
  },
  {
    question: 'Can I reserve a charging slot in advance?',
    answer: 'Yes, premium users can reserve charging slots up to 2 hours in advance.',
    category: 'features',
  },
];

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    icon: MessageCircle,
    color: 'from-blue-500 to-blue-600',
    available: true,
  },
  {
    title: 'Call Support',
    description: '+91 1800-123-4567',
    icon: Phone,
    color: 'from-green-500 to-green-600',
    available: true,
  },
  {
    title: 'Email Support',
    description: 'support@evcharging.com',
    icon: Mail,
    color: 'from-purple-500 to-purple-600',
    available: true,
  },
  {
    title: 'User Guide',
    description: 'Complete app documentation',
    icon: BookOpen,
    color: 'from-orange-500 to-orange-600',
    available: true,
  },
];

export function HelpSupport({ onBack }: HelpSupportProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-6">
        <div className="flex items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
        <p className="text-emerald-100 text-sm">Get help and find answers to common questions</p>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Contact Support</h2>
        <div className="grid grid-cols-2 gap-3">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`p-4 border-0 bg-gradient-to-br ${option.color} text-white cursor-pointer`}>
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className="bg-white/20 p-3 rounded-full mb-2"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <h3 className="font-medium text-sm mb-1">{option.title}</h3>
                    <p className="text-xs text-white/80">{option.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="space-y-2">
          {[
            { title: 'Report a Problem', description: 'Station issues, app bugs, payment problems' },
            { title: 'Account Issues', description: 'Login problems, profile updates, billing' },
            { title: 'Feature Requests', description: 'Suggest new features or improvements' },
          ].map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="border border-gray-200">
                <button className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4">
        <h2 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-gray-200">
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            View All FAQs
          </Button>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="px-4 mt-6">
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center">
            <div className="bg-red-500 p-2 rounded-full mr-3">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-red-900">Emergency Support</h3>
              <p className="text-sm text-red-700">24/7 emergency assistance: +91 1800-911-EV</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}