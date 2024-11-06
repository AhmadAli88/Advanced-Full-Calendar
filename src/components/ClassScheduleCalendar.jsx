import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEventColor } from '../utils/calendarHelpers';
import { CALENDAR_TYPES } from '../CalendarTypes';


export const ClassScheduleCalendar = () => {
    const [events, setEvents] = useState([]);
    const [externalEvents] = useState([
      { title: 'New Lecture', type: 'lecture' },
      { title: 'New Lab Session', type: 'lab' },
      { title: 'New Tutorial', type: 'tutorial' }
    ]);
  
    const renderEventContent = (eventInfo) => {
      const { event } = eventInfo;
      return (
        <div className="p-2">
          <div className="font-bold">{event.title}</div>
          <div className="text-sm">
            Professor: {event.extendedProps.professor}
          </div>
          <div className="text-xs">
            Room: {event.extendedProps.room}
          </div>
        </div>
      );
    };
  
    const handleExternalEventDrop = (dropInfo) => {
      const eventType = dropInfo.draggedEl.getAttribute('data-type');
      const newEvent = {
        id: Date.now(),
        title: dropInfo.draggedEl.innerText,
        start: dropInfo.date,
        end: new Date(dropInfo.date.getTime() + 90 * 60000), // 90 minutes duration
        extendedProps: {
          type: eventType,
          professor: 'TBD',
          room: 'TBD'
        },
        backgroundColor: getEventColor(CALENDAR_TYPES.CLASS_SCHEDULE, eventType)
      };
      setEvents([...events, newEvent]);
    };
  
    return (
      <div className="flex gap-4">
        <div className="w-64 p-4 bg-gray-100">
          <h3 className="font-bold mb-4">Drag to Add</h3>
          {externalEvents.map(event => (
            <div
              key={event.type}
              className="p-2 mb-2 bg-white rounded shadow cursor-move"
              draggable={true}
              data-type={event.type}
            >
              {event.title}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            droppable={true}
            events={events}
            eventContent={renderEventContent}
            drop={handleExternalEventDrop}
            weekends={false}
          />
        </div>
      </div>
    );
  };