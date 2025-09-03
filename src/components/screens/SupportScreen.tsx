import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Search, Phone, MessageCircle, Mail, HelpCircle, 
  CheckCircle, AlertTriangle, Clock, ChevronRight, ExternalLink,
  FileText, MessageSquare, Headphones
} from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SupportScreenProps {
  onBack: () => void;
}

const mockFAQs = [
  {
    question: 'How do I start a charging session?',
    answer: 'Simply scan the QR code on the charging port or enter the port ID manually. Select your payment method and configure your charging preferences.',
    category: 'charging'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept wallet payments, credit/debit cards, and UPI. You can add money to your wallet for faster transactions.',
    category: 'payment'
  },
  {
    question: 'Can I stop charging before completion?',
    answer: 'Yes, you can stop your charging session at any time from the live charging screen. You\'ll only be charged for the energy consumed.',
    category: 'charging'
  },
  {
    question: 'What if a charging port is not working?',
    answer: 'Please try another port at the same station. If all ports are non-functional, contact our support team immediately.',
    category: 'technical'
  },
  {
    question: 'How do I get a refund?',
    answer: 'Refunds for interrupted sessions are processed automatically. For other issues, contact our support team with your session details.',
    category: 'payment'
  }
];

const systemStatus = {
  overall: 'operational', // operational, maintenance, issues
  components: [
    { name: 'Charging Network', status: 'operational' },
    { name: 'Payment System', status: 'operational' },
    { name: 'Mobile App', status: 'operational' },
    { name: 'Navigation Service', status: 'maintenance' }
  ]
};

export function SupportScreen({ onBack }: SupportScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactType, setContactType] = useState<'call' | 'chat' | 'email'>('call');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  
  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'maintenance': return Clock;
      case 'issues': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-accent-green';
      case 'maintenance': return 'text-accent-orange';
      case 'issues': return 'text-accent-red';
      default: return 'text-foreground-subtle';
    }
  };

  const handleContactSupport = (type: 'call' | 'chat' | 'email') => {
    setContactType(type);
    if (type === 'call') {
      // Simulate call initiation
      alert('Connecting you to support... Call will start in 3 seconds.');
    } else {
      setShowContactDialog(true);
    }
  };

  const handleSubmitTicket = () => {
    if (ticketSubject && ticketDescription && ticketCategory) {
      const ticketId = `TKT${Date.now().toString().slice(-6)}`;
      alert(`Support ticket ${ticketId} created successfully! We'll respond within 24 hours.`);
      setShowContactDialog(false);
      setTicketSubject('');
      setTicketDescription('');
      setTicketCategory('');
    }
  };

  const supportCategories = [
    'Charging Issues',
    'Payment Problems',
    'Account Management',
    'Technical Support',
    'App Feedback',
    'Station Reporting',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 pt-12 border-b border-border bg-surface-card"
      >
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-semibold">Help & Support</h1>
          <p className="text-foreground-muted text-sm">24/7 assistance</p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      <div className="p-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContactSupport('call')}
            className="bg-surface-card border border-border rounded-xl p-4 text-center hover:bg-surface-elevated transition-colors"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Call Support</div>
            <div className="text-xs text-foreground-muted">Instant help</div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContactSupport('chat')}
            className="bg-surface-card border border-border rounded-xl p-4 text-center hover:bg-surface-elevated transition-colors"
          >
            <div className="w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="w-6 h-6 text-accent-blue" />
            </div>
            <div className="text-sm font-medium">Live Chat</div>
            <div className="text-xs text-foreground-muted">Online now</div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContactSupport('email')}
            className="bg-surface-card border border-border rounded-xl p-4 text-center hover:bg-surface-elevated transition-colors"
          >
            <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6 text-accent-green" />
            </div>
            <div className="text-sm font-medium">Email Us</div>
            <div className="text-xs text-foreground-muted">24h response</div>
          </motion.button>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-card border border-border rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">System Status</h3>
            <div className={`flex items-center space-x-2 ${getStatusColor(systemStatus.overall)}`}>
              {(() => {
                const StatusIcon = getStatusIcon(systemStatus.overall);
                return <StatusIcon className="w-4 h-4" />;
              })()}
              <span className="text-sm font-medium capitalize">{systemStatus.overall}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {systemStatus.components.map((component, index) => {
              const StatusIcon = getStatusIcon(component.status);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground-muted text-sm">{component.name}</span>
                  <div className={`flex items-center space-x-2 ${getStatusColor(component.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="text-xs capitalize">{component.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 text-primary"
            onClick={() => alert('Opening system status page...')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Status Page
          </Button>
        </motion.div>

        {/* FAQ Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-surface-card border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-8"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="bg-surface-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-foreground-subtle transition-transform ${
                    expandedFAQ === index ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <div className="pl-8 text-foreground-muted text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-foreground-subtle mx-auto mb-3" />
              <p className="text-foreground-muted">No FAQs found matching your search</p>
            </div>
          )}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-surface-card border border-border rounded-xl p-4"
        >
          <h4 className="font-semibold mb-4">Contact Information</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium">Support Hotline</div>
                <div className="text-foreground-muted">1800-123-4567 (Toll-free)</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-foreground-muted">support@evcharging.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium">Operating Hours</div>
                <div className="text-foreground-muted">24/7 Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Support Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="bg-surface-card border-border text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {contactType === 'chat' ? (
                <>
                  <MessageCircle className="w-5 h-5 text-accent-blue" />
                  <span>Start Live Chat</span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 text-accent-green" />
                  <span>Create Support Ticket</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {contactType === 'chat' ? (
            <div className="space-y-4">
              <div className="bg-surface-elevated border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Support Agent</div>
                    <div className="text-xs text-accent-green">● Online</div>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  Hello! I'm here to help you with any issues you're experiencing. What can I assist you with today?
                </p>
              </div>
              
              <div className="space-y-3">
                <Input placeholder="Type your message..." className="h-10" />
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowContactDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-accent-blue hover:bg-accent-blue/90">
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Category</label>
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Subject</label>
                <Input
                  placeholder="Brief description of your issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground-muted mb-2 block">Description</label>
                <Textarea
                  placeholder="Please provide detailed information about your issue..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowContactDialog(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-accent-green hover:bg-accent-green/90"
                  onClick={handleSubmitTicket}
                  disabled={!ticketSubject || !ticketDescription || !ticketCategory}
                >
                  Submit Ticket
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}