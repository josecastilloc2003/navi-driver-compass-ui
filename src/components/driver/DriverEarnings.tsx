
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DriverEarningsProps {
  onBack: () => void;
}

const DriverEarnings = ({ onBack }: DriverEarningsProps) => {
  const [activeView, setActiveView] = useState('daily');

  const dailyData = [
    { day: 'Mon', trips: 8, netFares: 180, tips: 25, other: 10, total: 215 },
    { day: 'Tue', trips: 12, netFares: 240, tips: 35, other: 15, total: 290 },
    { day: 'Wed', trips: 6, netFares: 120, tips: 18, other: 8, total: 146 },
    { day: 'Thu', trips: 10, netFares: 200, tips: 30, other: 12, total: 242 },
    { day: 'Fri', trips: 15, netFares: 320, tips: 45, other: 20, total: 385 },
    { day: 'Sat', trips: 18, netFares: 380, tips: 55, other: 25, total: 460 },
    { day: 'Sun', trips: 14, netFares: 280, tips: 40, other: 18, total: 338 }
  ];

  const weeklyData = [
    { week: 'Week 1', trips: 65, netFares: 1300, tips: 195, other: 85, total: 1580 },
    { week: 'Week 2', trips: 72, netFares: 1440, tips: 216, other: 95, total: 1751 },
    { week: 'Week 3', trips: 68, netFares: 1360, tips: 204, other: 88, total: 1652 },
    { week: 'Week 4', trips: 75, netFares: 1500, tips: 225, other: 100, total: 1825 }
  ];

  const monthlyData = [
    { month: 'Jan', trips: 280, netFares: 5600, tips: 840, other: 350, total: 6790 },
    { month: 'Feb', trips: 260, netFares: 5200, tips: 780, other: 320, total: 6300 },
    { month: 'Mar', trips: 310, netFares: 6200, tips: 930, other: 380, total: 7510 }
  ];

  const getCurrentData = () => {
    switch (activeView) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return dailyData;
    }
  };

  const getXAxisKey = () => {
    switch (activeView) {
      case 'weekly': return 'week';
      case 'monthly': return 'month';
      default: return 'day';
    }
  };

  const getTotalEarnings = () => {
    const data = getCurrentData();
    return data.reduce((sum, item) => sum + item.total, 0);
  };

  const getTotalTrips = () => {
    const data = getCurrentData();
    return data.reduce((sum, item) => sum + item.trips, 0);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Earnings & Finances</h1>
            <p className="text-gray-600">Track your financial performance</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* View Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {['daily', 'weekly', 'monthly'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeView === view
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">${getTotalEarnings().toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total {activeView.charAt(0).toUpperCase() + activeView.slice(1)} Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{getTotalTrips()}</div>
              <p className="text-sm text-gray-600">Total Trips</p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Earnings Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisKey()} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`$${value}`, name]}
                    labelFormatter={(label) => `${getXAxisKey()}: ${label}`}
                  />
                  <Bar dataKey="netFares" stackId="a" fill="#3b82f6" name="Net Fares" />
                  <Bar dataKey="tips" stackId="a" fill="#10b981" name="Tips" />
                  <Bar dataKey="other" stackId="a" fill="#f59e0b" name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">Net Fares</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm">Other Earnings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed {activeView.charAt(0).toUpperCase() + activeView.slice(1)} Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getCurrentData().map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item[getXAxisKey() as keyof typeof item]}
                    </p>
                    <p className="text-sm text-gray-600">{item.trips} trips completed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">${item.total}</div>
                    <div className="text-xs text-gray-500 space-x-2">
                      <span>Fares: ${item.netFares}</span>
                      <span>Tips: ${item.tips}</span>
                      <span>Other: ${item.other}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 text-sm">
                  Your earnings increased by 15% compared to last {activeView === 'daily' ? 'week' : activeView === 'weekly' ? 'month' : 'quarter'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">High Performer</Badge>
                <span className="text-blue-800 text-sm">
                  You're in the top 20% of drivers in your area
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverEarnings;
