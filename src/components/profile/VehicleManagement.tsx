import { ArrowLeft, Plus, Car, Battery, Settings, Edit3, Zap, Calendar, MapPin, TrendingUp, Clock, Gauge, Wrench, Star, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  batteryCapacity: number;
  currentCharge: number;
  efficiency: number;
  color: string;
  image: string;
  isDefault: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    model: 'Model 3 Long Range AWD',
    year: 2023,
    batteryCapacity: 75,
    currentCharge: 68,
    efficiency: 4.2,
    color: 'Pearl White Multi-Coat',
    image: '🚗',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Nexon EV Max',
    model: 'Tata Nexon EV Max',
    year: 2022,
    batteryCapacity: 40.5,
    currentCharge: 45,
    efficiency: 5.1,
    color: 'Flame Red',
    image: '🚙',
    isDefault: false,
  },
];

interface VehicleManagementProps {
  onBack: () => void;
}

export function VehicleManagement({ onBack }: VehicleManagementProps) {
  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-6">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">My Vehicles</h1>
            <p className="text-blue-100 text-sm">Manage your electric vehicles</p>
          </div>
        </div>
        
        {/* Summary */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
            <Car size={16} className="mr-2" />
            <span className="text-sm">2 Vehicles</span>
          </div>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
            <Battery size={16} className="mr-2" />
            <span className="text-sm">Avg 56% Charged</span>
          </div>
        </div>
      </div>

      {/* Add Vehicle Button */}
      <div className="px-4 py-4 -mt-4 relative z-10">
        <Card className="p-4 bg-green-600 text-white">
          <Button 
            className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
            onClick={() => {/* Add vehicle modal logic */}}
          >
            <Plus size={20} className="mr-2" />
            Add New Vehicle
            <Badge className="ml-2 bg-white/20 text-white border-0 text-xs">
              50+ Models
            </Badge>
          </Button>
          <div className="text-center mt-2 text-sm text-white/80">
            Tesla • BMW • Audi • Tata • Mahindra • MG
          </div>
        </Card>
      </div>

      {/* Vehicles List */}
      <div className="px-4 space-y-4">
        {mockVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4 shadow-md bg-white relative">
            {vehicle.isDefault && (
              <Badge className="absolute top-3 right-3 bg-blue-100 text-blue-800 border-0">
                Default
              </Badge>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{vehicle.image}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">{vehicle.model} ({vehicle.year})</p>
                    <p className="text-xs text-gray-500">{vehicle.color}</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Edit3 size={16} className="text-gray-600" />
                  </button>
                </div>
                
                {/* Battery Status */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Battery</span>
                    <span className="font-medium">{vehicle.currentCharge}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      style={{ width: `${vehicle.currentCharge}%` }}
                      className={`h-2 rounded-full ${
                        vehicle.currentCharge > 50 ? 'bg-green-500' :
                        vehicle.currentCharge > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Range: ~{Math.round(vehicle.batteryCapacity * vehicle.currentCharge * vehicle.efficiency / 100)} km</span>
                    <span>Est. time: {vehicle.currentCharge < 50 ? '2-3h' : '30-45min'}</span>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                    <Battery size={16} className="text-blue-600 mx-auto mb-1" />
                    <div className="font-semibold text-blue-700">{vehicle.batteryCapacity}</div>
                    <div className="text-xs text-blue-600">kWh Total</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                    <Gauge size={16} className="text-green-600 mx-auto mb-1" />
                    <div className="font-semibold text-green-700">{vehicle.efficiency}</div>
                    <div className="text-xs text-green-600">km/kWh</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
                    <TrendingUp size={16} className="text-purple-600 mx-auto mb-1" />
                    <div className="font-semibold text-purple-700">94%</div>
                    <div className="text-xs text-purple-600">Health</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings size={14} className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Zap size={14} className="mr-2" />
                    Find Chargers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wrench size={14} />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Last Activity */}
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3 mt-4">
              <div className="flex items-center">
                <Clock size={12} className="text-gray-500 mr-2" />
                <span className="text-gray-600">
                  Last charged: {vehicle.id === '1' ? '2 hours ago at Shell Recharge' : '1 day ago at BPCL Station'}
                </span>
              </div>
              <Badge className="bg-gray-200 text-gray-700 border-0 text-xs">
                {vehicle.id === '1' ? 'Recent' : 'Yesterday'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <div className="px-4 mt-6 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-gray-900 mb-2">💡 Charging Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Keep battery between 20-80% for optimal health</li>
            <li>• Use fast charging sparingly to preserve battery</li>
            <li>• Schedule charging during off-peak hours</li>
            <li>• Update vehicle software regularly for efficiency</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}