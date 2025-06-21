
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Save } from 'lucide-react';
import { format, addDays, startOfDay, endOfDay, differenceInDays } from 'date-fns';

interface DriverCalendarProps {
  onBack: () => void;
}

const DriverCalendar = ({ onBack }: DriverCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<{[key: string]: {start: string, end: string}}>({});
  const [tempSchedule, setTempSchedule] = useState({ start: '09:00', end: '17:00' });

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const canEditDate = (date: Date) => {
    const daysDifference = differenceInDays(date, new Date());
    return daysDifference >= 3;
  };

  const saveSchedule = () => {
    if (!canEditDate(selectedDate)) {
      alert("Cannot change schedule within 3 days of the date");
      return;
    }
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setSchedules(prev => ({
      ...prev,
      [dateKey]: { ...tempSchedule }
    }));
  };

  const hasSchedule = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return schedules[dateKey] !== undefined;
  };

  const getSchedule = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return schedules[dateKey];
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
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600">Set your availability for the next 3 months</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Calendar Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 90)}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                scheduled: (date) => hasSchedule(date),
                locked: (date) => !canEditDate(date)
              }}
              modifiersStyles={{
                scheduled: { backgroundColor: '#3b82f6', color: 'white' },
                locked: { backgroundColor: '#f3f4f6', color: '#9ca3af', textDecoration: 'line-through' }
              }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Days with scheduled hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm">Cannot edit (within 3 days)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Scheduler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Set Hours for {format(selectedDate, 'MMMM dd, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!canEditDate(selectedDate) && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Cannot modify schedule within 3 days of the selected date.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <select 
                  value={tempSchedule.start}
                  onChange={(e) => setTempSchedule(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!canEditDate(selectedDate)}
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <select 
                  value={tempSchedule.end}
                  onChange={(e) => setTempSchedule(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!canEditDate(selectedDate)}
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button 
              onClick={saveSchedule} 
              className="w-full gradient-navi text-white"
              disabled={!canEditDate(selectedDate)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Schedule
            </Button>

            {/* Current Schedule Display */}
            {getSchedule(selectedDate) && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">Current Schedule</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {getSchedule(selectedDate).start} - {getSchedule(selectedDate).end}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Schedule Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(schedules)
                .filter(([dateKey]) => new Date(dateKey) >= startOfDay(new Date()))
                .slice(0, 5)
                .map(([dateKey, schedule]) => (
                  <div key={dateKey} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {format(new Date(dateKey), 'EEEE, MMMM dd')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {schedule.start} - {schedule.end}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {Math.round((parseInt(schedule.end.split(':')[0]) - parseInt(schedule.start.split(':')[0])))} hours
                    </Badge>
                  </div>
                ))}
              {Object.keys(schedules).length === 0 && (
                <p className="text-gray-500 text-center py-4">No scheduled hours yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-yellow-800 font-medium text-sm">Important Notice</p>
                <p className="text-yellow-700 text-sm mt-1">
                  You can change your availability up to 3 days before the scheduled date, but you must honor any bookings 
                  scheduled during the set availability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverCalendar;
