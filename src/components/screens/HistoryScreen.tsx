import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, History, Calendar, Filter, Download, Zap, Clock, DollarSign, FileSpreadsheet, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface HistoryScreenProps {
  onBack: () => void;
  onViewSession: (sessionId: string) => void;
}

const mockHistory = [
  {
    id: '1',
    date: '2024-01-15',
    time: '14:30',
    stationName: 'Tesla Supercharger',
    location: 'MG Road, Bangalore',
    energy: 25.4,
    duration: 45,
    cost: 457,
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-12',
    time: '09:15',
    stationName: 'Ather Grid',
    location: 'Indiranagar, Bangalore',
    energy: 18.2,
    duration: 35,
    cost: 273,
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-10',
    time: '16:45',
    stationName: 'BPCL FastCharge',
    location: 'Koramangala, Bangalore',
    energy: 12.1,
    duration: 28,
    cost: 194,
    status: 'interrupted'
  }
];

export function HistoryScreen({ onBack, onViewSession }: HistoryScreenProps) {
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'all'>('month');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const totalEnergy = mockHistory.reduce((sum, session) => sum + session.energy, 0);
  const totalCost = mockHistory.reduce((sum, session) => sum + session.cost, 0);
  const totalSessions = mockHistory.length;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleExport = () => {
    setShowExportDialog(false);
    const fileName = `charging-history-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    alert(`Exporting ${fileName}... Download will start shortly.`);
    // In a real app, this would trigger the actual export
  };

  const handleFilter = () => {
    setShowFilterDialog(false);
    alert(`Filtering by status: ${filterStatus}, period: ${filterPeriod}`);
    // In a real app, this would apply the filters
  };

  const filteredHistory = mockHistory.filter(session => {
    if (filterStatus === 'all') return true;
    return session.status === filterStatus;
  });

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
          <h1 className="font-semibold">Charging History</h1>
          <p className="text-foreground-muted text-sm">Your past sessions</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowExportDialog(true)}>
          <Download className="w-4 h-4" />
        </Button>
      </motion.div>

      <div className="p-6">
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-accent-green/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-green" />
            </div>
            <div className="text-xl font-bold text-foreground">{totalEnergy.toFixed(1)}</div>
            <div className="text-xs text-foreground-subtle">kWh Total</div>
          </div>
          
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-foreground">₹{totalCost}</div>
            <div className="text-xs text-foreground-subtle">Total Spent</div>
          </div>
          
          <div className="bg-surface-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <History className="w-5 h-5 text-accent-blue" />
            </div>
            <div className="text-xl font-bold text-foreground">{totalSessions}</div>
            <div className="text-xs text-foreground-subtle">Sessions</div>
          </div>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex space-x-2">
            {[
              { key: 'week', label: 'Week' },
              { key: 'month', label: 'Month' },
              { key: 'all', label: 'All' },
            ].map((option) => (
              <Button
                key={option.key}
                variant={filterPeriod === option.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPeriod(option.key as any)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => setShowFilterDialog(true)}>
            <Filter className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="font-semibold mb-4">Recent Sessions</h3>
          
          {mockHistory.map((session, index) => (
            <motion.button
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              onClick={() => onViewSession(session.id)}
              className="w-full bg-surface-card border border-border rounded-xl p-4 hover:bg-surface-elevated transition-colors text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{session.stationName}</h4>
                  <p className="text-foreground-muted text-sm">{session.location}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                    session.status === 'completed' 
                      ? 'bg-accent-green/20 text-accent-green'
                      : 'bg-accent-orange/20 text-accent-orange'
                  }`}>
                    {session.status === 'completed' ? 'Completed' : 'Interrupted'}
                  </div>
                  <p className="text-foreground-muted text-xs mt-1">
                    {session.date} • {session.time}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-semibold text-accent-green">{session.energy} kWh</div>
                  <div className="text-xs text-foreground-subtle">Energy</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-accent-blue">{formatDuration(session.duration)}</div>
                  <div className="text-xs text-foreground-subtle">Duration</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">₹{session.cost}</div>
                  <div className="text-xs text-foreground-subtle">Cost</div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Empty State */}
        {mockHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <History className="w-16 h-16 text-foreground-subtle mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No charging history</h3>
            <p className="text-foreground-muted">Your charging sessions will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}