import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-11-06T10:00:00',
      end: '2024-11-06T11:30:00',
      backgroundColor: '#4CAF50',
      extendedProps: {
        department: 'Engineering',
        location: 'Conference Room A'
      }
    },
  ]);

  // Handle date click
  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: arg.date,
          allDay: arg.allDay
        }
      ]);
    }
  };

  // Handle event click
  const handleEventClick = (arg) => {
    if (window.confirm(`Delete event '${arg.event.title}'?`)) {
      arg.event.remove();
    }
  };

  // Handle event drop (drag and drop)
  const handleEventDrop = (arg) => {
    const updatedEvents = events.map(event => {
      if (event.id === arg.event.id) {
        return {
          ...event,
          start: arg.event.start,
          end: arg.event.end
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="w-full p-4">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
      />
    </div>
  );
};

export default Calendar;