import { ArrowLeft, Calendar, MapPin, Zap, Clock, Filter, Download, Battery, Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface ChargingSession {
  id: string;
  stationName: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  energyCharged: number;
  cost: number;
  chargingSpeed: string;
  startPercentage: number;
  endPercentage: number;
  status: 'completed' | 'interrupted' | 'failed';
}

const mockSessions: ChargingSession[] = [
  {
    id: '1',
    stationName: 'Shell Recharge Hub',
    location: 'MG Road, Bangalore',
    date: '2024-08-30',
    time: '14:30',
    duration: '45 min',
    energyCharged: 28.5,
    cost: 342,
    chargingSpeed: '50kW DC',
    startPercentage: 25,
    endPercentage: 68,
    status: 'completed',
  },
  {
    id: '2',
    stationName: 'BPCL EV Station',
    location: 'Indiranagar, Bangalore',
    date: '2024-08-28',
    time: '16:45',
    duration: '32 min',
    energyCharged: 19.2,
    cost: 192,
    chargingSpeed: '25kW DC',
    startPercentage: 35,
    endPercentage: 60,
    status: 'completed',
  },
  {
    id: '3',
    stationName: 'Tata Power EZ Charge',
    location: 'Koramangala, Bangalore',
    date: '2024-08-26',
    time: '11:20',
    duration: '15 min',
    energyCharged: 8.5,
    cost: 127,
    chargingSpeed: '60kW DC',
    startPercentage: 45,
    endPercentage: 55,
    status: 'interrupted',
  },
  {
    id: '4',
    stationName: 'Ather Grid',
    location: 'HSR Layout, Bangalore',
    date: '2024-08-24',
    time: '09:15',
    duration: '2h 15min',
    energyCharged: 35.8,
    cost: 286,
    chargingSpeed: '3.3kW AC',
    startPercentage: 15,
    endPercentage: 85,
    status: 'completed',
  },
];

interface ChargingHistoryProps {
  onBack: () => void;
}

export function ChargingHistory({ onBack }: ChargingHistoryProps) {
  const totalSessions = mockSessions.length;
  const totalEnergyCharged = mockSessions.reduce((sum, session) => sum + session.energyCharged, 0);
  const totalCost = mockSessions.reduce((sum, session) => sum + session.cost, 0);
  const avgCostPerKwh = totalCost / totalEnergyCharged;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'interrupted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold">Charging History</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Download size={20} />
          </button>
        </div>
        <p className="text-blue-100 text-sm">Track your charging sessions and energy consumption</p>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-4 -mt-4 relative z-10">
        <h2 className="font-semibold text-gray-900 mb-3">This Month Summary</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalSessions}</div>
            <div className="text-sm text-blue-600 mb-1">Sessions</div>
            <div className="text-xs text-green-600 font-medium">+21%</div>
          </Card>
          
          <Card className="p-4 text-center bg-green-50 border-green-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-green-600 rounded-lg flex items-center justify-center">
              <Battery size={16} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-green-700">{totalEnergyCharged.toFixed(1)}</div>
            <div className="text-sm text-green-600 mb-1">kWh Charged</div>
            <div className="text-xs text-green-600 font-medium">+15%</div>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center bg-orange-50 border-orange-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-orange-600 rounded-lg flex items-center justify-center">
              <Wallet size={16} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-700">₹{totalCost}</div>
            <div className="text-sm text-orange-600 mb-1">Total Spent</div>
            <div className="text-xs text-green-600 font-medium">-8.5%</div>
          </Card>
          
          <Card className="p-4 text-center bg-purple-50 border-purple-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-purple-600 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-700">₹{avgCostPerKwh.toFixed(1)}</div>
            <div className="text-sm text-purple-600 mb-1">Avg/kWh</div>
            <div className="text-xs text-blue-600 font-medium">Avg: 58min</div>
          </Card>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar size={14} className="mr-1" />
            This Month
          </Button>
          <Button variant="outline" size="sm">
            <Filter size={14} />
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-4 space-y-3">
        {mockSessions.map((session) => (
          <Card key={session.id} className="p-4 bg-white shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{session.stationName}</h3>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin size={12} className="mr-1" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={12} className="mr-1" />
                  <span>{session.date} at {session.time}</span>
                </div>
              </div>
            </div>
            
            {/* Charging Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Battery: {session.startPercentage}% → {session.endPercentage}%</span>
                <span className="font-medium text-green-600">+{session.endPercentage - session.startPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  style={{ width: `${session.endPercentage}%` }}
                  className="h-2 rounded-full bg-green-500"
                />
              </div>
            </div>
            
            {/* Session Details */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Zap size={14} className="text-blue-600 mr-1" />
                <div>
                  <div className="font-medium">{session.energyCharged} kWh</div>
                  <div className="text-gray-500">{session.chargingSpeed}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="text-orange-600 mr-1" />
                <div>
                  <div className="font-medium">{session.duration}</div>
                  <div className="text-gray-500">Duration</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">₹{session.cost}</div>
                <div className="text-gray-500">₹{(session.cost / session.energyCharged).toFixed(1)}/kWh</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 mt-6 mb-6">
        <Button variant="outline" className="w-full">
          Load More Sessions
        </Button>
      </div>
    </div>
  );
}