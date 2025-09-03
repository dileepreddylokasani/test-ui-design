import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowUpRight, ArrowDownLeft, Zap, TrendingUp, Eye, EyeOff, MoreHorizontal, CreditCard, Smartphone, User, Wallet, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

const recentTransactions = [
  {
    id: '1',
    type: 'charge',
    station: 'Tesla Supercharger',
    location: 'MG Road, Bangalore',
    amount: 450,
    energy: 25.5,
    date: '2024-09-01',
    time: '14:30',
    status: 'completed',
    category: 'Fast Charging'
  },
  {
    id: '2',
    type: 'topup',
    station: 'Wallet Top-up',
    location: 'UPI Payment',
    amount: 1000,
    energy: null,
    date: '2024-08-30',
    time: '09:15',
    status: 'completed',
    category: 'Top-up'
  },
  {
    id: '3',
    type: 'charge',
    station: 'Ather Grid',
    location: 'Indiranagar, Bangalore',
    amount: 280,
    energy: 15.6,
    date: '2024-08-29',
    time: '16:45',
    status: 'completed',
    category: 'Standard Charging'
  },
];

const walletStats = [
  {
    label: 'This Month',
    value: '₹2,850',
    change: '+12.5%',
    icon: TrendingUp,
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/10'
  },
  {
    label: 'Avg. Session',
    value: '₹365',
    change: '-5.2%',
    icon: Zap,
    color: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10'
  },
  {
    label: 'Energy Used',
    value: '150 kWh',
    change: '+8.1%',
    icon: Target,
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10'
  }
];

interface WalletScreenProps {
  onNavigateToHistory?: () => void;
}

export function WalletScreen({ onNavigateToHistory }: WalletScreenProps) {
  const [walletBalance, setWalletBalance] = useState(2150);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [showAddMoneyDialog, setShowAddMoneyDialog] = useState(false);
  const [showSendMoneyDialog, setShowSendMoneyDialog] = useState(false);
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendRecipient, setSendRecipient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const monthlyEnergyUsed = 150; // kWh
  const monthlyEnergyBudget = 200; // kWh
  const energyPercentage = (monthlyEnergyUsed / monthlyEnergyBudget) * 100;

  const handleAddMoney = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      const amount = parseFloat(addAmount);
      setWalletBalance(prev => prev + amount);
      setAddAmount('');
      setShowAddMoneyDialog(false);
      // Simulate success feedback
      alert(`₹${amount} added successfully!`);
    }
  };

  const handleSendMoney = () => {
    if (sendAmount && sendRecipient && parseFloat(sendAmount) > 0) {
      const amount = parseFloat(sendAmount);
      if (amount <= walletBalance) {
        setWalletBalance(prev => prev - amount);
        setSendAmount('');
        setSendRecipient('');
        setShowSendMoneyDialog(false);
        alert(`₹${amount} sent to ${sendRecipient} successfully!`);
      } else {
        alert('Insufficient balance!');
      }
    }
  };

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'netbanking', name: 'Net Banking', icon: CreditCard }
  ];

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = 'primary' }: {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorClasses = {
      primary: 'stroke-primary',
      green: 'stroke-accent-green',
      blue: 'stroke-accent-blue',
      orange: 'stroke-accent-orange'
    };

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-surface-elevated"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray}
            strokeLinecap="round"
            className={colorClasses[color as keyof typeof colorClasses]}
            animate={{ strokeDashoffset }}
            key={`${monthlyEnergyUsed}-${monthlyEnergyBudget}`}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-title font-semibold text-foreground">{monthlyEnergyUsed} kWh</div>
            <div className="text-caption text-muted">Used</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="pt-12 pb-4 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-title-large mb-1">Wallet</h1>
              <p className="text-muted text-body-small">Manage your charging expenses</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted"
            onClick={() => setShowMenuDialog(true)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Hero Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-hero p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-muted text-body-small">Available Balance</span>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {isBalanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <motion.div
                key={walletBalance}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-display font-semibold text-foreground mb-4"
              >
                {isBalanceVisible ? `₹${walletBalance.toLocaleString()}` : '₹••••'}
              </motion.div>
              
              <div className="flex space-x-3">
                <Button 
                  className="bg-primary hover:bg-primary-hover text-white px-6"
                  onClick={() => setShowAddMoneyDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border/50 text-foreground hover:bg-surface-elevated"
                  onClick={() => setShowSendMoneyDialog(true)}
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center ml-4">
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Industry Standard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {walletStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card-stats"
            >
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-2 mx-auto`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-body-small font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-caption text-muted mb-1">{stat.label}</div>
              <div className={`text-caption font-medium ${stat.change.startsWith('+') ? 'text-accent-green' : 'text-accent-red'}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Energy Analytics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-modern p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-title font-semibold text-foreground mb-1">Energy Consumption</h3>
              <p className="text-body-small text-muted">{selectedPeriod}</p>
            </div>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="card-modern border-border rounded-lg px-3 py-2 text-body-small text-foreground focus:outline-none focus:border-primary"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <CircularProgress percentage={energyPercentage} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-title font-semibold text-accent-green">{monthlyEnergyBudget - monthlyEnergyUsed} kWh</div>
              <div className="text-caption text-muted">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-title font-semibold text-accent-blue">{Math.round(energyPercentage)}%</div>
              <div className="text-caption text-muted">Used</div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title font-semibold text-foreground">Recent Transactions</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={onNavigateToHistory}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {recentTransactions.map((transaction, index) => {
                const isCharge = transaction.type === 'charge';
                
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="card-modern p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isCharge ? 'bg-accent-red/20' : 'bg-accent-green/20'
                        }`}>
                          {isCharge ? (
                            <ArrowDownLeft className="w-6 h-6 text-accent-red" />
                          ) : (
                            <ArrowUpRight className="w-6 h-6 text-accent-green" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{transaction.station}</div>
                          <div className="text-body-small text-muted">{transaction.location}</div>
                          <div className="text-caption text-muted">
                            {transaction.date} • {transaction.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          isCharge ? 'text-accent-red' : 'text-accent-green'
                        }`}>
                          {isCharge ? '-' : '+'}₹{transaction.amount}
                        </div>
                        {transaction.energy && (
                          <div className="text-caption text-muted">{transaction.energy} kWh</div>
                        )}
                        <div className="text-caption text-muted">{transaction.category}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Add Money Dialog */}
      <Dialog open={showAddMoneyDialog} onOpenChange={setShowAddMoneyDialog}>
        <DialogContent className="card-modern border-border text-foreground max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Quick Amount Selection */}
            <div>
              <label className="text-body-small font-medium text-muted mb-3 block">Quick Amounts</label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAddAmount(amount.toString())}
                    className="h-10"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-body-small font-medium text-muted mb-2 block">Enter Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="h-12 text-body"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-body-small font-medium text-muted mb-3 block">Payment Method</label>
              <div className="space-y-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-3 rounded-lg border flex items-center space-x-3 transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-surface-elevated'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{method.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddMoneyDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary-hover"
                onClick={handleAddMoney}
                disabled={!addAmount || parseFloat(addAmount) <= 0}
              >
                Add ₹{addAmount || '0'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Money Dialog */}
      <Dialog open={showSendMoneyDialog} onOpenChange={setShowSendMoneyDialog}>
        <DialogContent className="card-modern border-border text-foreground max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Recipient */}
            <div>
              <label className="text-body-small font-medium text-muted mb-2 block">Send To</label>
              <Input
                placeholder="Phone number or UPI ID"
                value={sendRecipient}
                onChange={(e) => setSendRecipient(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-body-small font-medium text-muted mb-2 block">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="h-12 text-body"
              />
              <div className="text-body-small text-muted mt-1">
                Available balance: ₹{walletBalance.toLocaleString()}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSendMoneyDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary-hover"
                onClick={handleSendMoney}
                disabled={!sendAmount || !sendRecipient || parseFloat(sendAmount) <= 0}
              >
                Send ₹{sendAmount || '0'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Menu Dialog */}
      <Dialog open={showMenuDialog} onOpenChange={setShowMenuDialog}>
        <DialogContent className="card-modern border-border text-foreground max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Wallet Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setShowMenuDialog(false);
                onNavigateToHistory?.();
              }}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Transaction History
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setShowMenuDialog(false);
                alert('Auto-recharge settings opened');
              }}
            >
              <Zap className="w-5 h-5 mr-3" />
              Auto-recharge Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setShowMenuDialog(false);
                alert('Payment methods opened');
              }}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Payment Methods
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setShowMenuDialog(false);
                alert('Wallet settings opened');
              }}
            >
              <User className="w-5 h-5 mr-3" />
              Wallet Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}