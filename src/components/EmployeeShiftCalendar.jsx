import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEventColor } from '../utils/calendarHelpers';
import { CALENDAR_TYPES } from '../CalendarTypes';

export const EmployeeShiftCalendar = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // Initialize with recurring shifts
      const recurringShifts = [
        {
          title: 'Morning Shift',
          daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
          startTime: '06:00:00',
          endTime: '14:00:00',
          extendedProps: {
            type: 'morning',
            employees: ['John Doe', 'Jane Smith']
          },
          backgroundColor: getEventColor(CALENDAR_TYPES.EMPLOYEE_SHIFT, 'morning')
        },
        {
          title: 'Afternoon Shift',
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '14:00:00',
          endTime: '22:00:00',
          extendedProps: {
            type: 'afternoon',
            employees: ['Alice Johnson', 'Bob Wilson']
          },
          backgroundColor: getEventColor(CALENDAR_TYPES.EMPLOYEE_SHIFT, 'afternoon')
        },
        {
          title: 'Night Shift',
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '22:00:00',
          endTime: '06:00:00',
          extendedProps: {
            type: 'night',
            employees: ['Charlie Brown', 'Diana Prince']
          },
          backgroundColor: getEventColor(CALENDAR_TYPES.EMPLOYEE_SHIFT, 'night')
        }
      ];
      setEvents(recurringShifts);
    }, []);
  
    const renderEventContent = (eventInfo) => {
      const { event } = eventInfo;
      return (
        <div className="p-2">
          <div className="font-bold">{event.title}</div>
          <div className="text-sm">
            Employees:
            {event.extendedProps.employees.map(emp => (
              <div key={emp} className="text-xs">{emp}</div>
            ))}
          </div>
        </div>
      );
    };
  
    const handleEventDrop = (dropInfo) => {
      const { event } = dropInfo;
      
      // Update the event timing while maintaining recurring nature
      const updatedEvents = events.map(ev => {
        if (ev.id === event.id) {
          return {
            ...ev,
            startTime: event.start.toTimeString().slice(0, 8),
            endTime: event.end.toTimeString().slice(0, 8)
          };
        }
        return ev;
      });
      
      setEvents(updatedEvents);
    };
  
    return (
      <div className="w-full p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable={true}
          events={events}
          eventContent={renderEventContent}
          eventDrop={handleEventDrop}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          allDaySlot={false}
        />
      </div>
    );
  };