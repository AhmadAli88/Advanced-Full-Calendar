import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export const MeetingRoomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [rooms] = useState([
    { id: 'room-a', title: 'Conference Room A' },
    { id: 'room-b', title: 'Conference Room B' },
    { id: 'room-c', title: 'Meeting Room C' }
  ]);

  // Custom Event Render
  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    return (
      <div className="p-2">
        <div className="font-bold">{event.title}</div>
        <div className="text-sm">
          Room: {event.extendedProps.room}
        </div>
        <div className="text-xs">
          Booked by: {event.extendedProps.bookedBy}
        </div>
      </div>
    );
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Meeting title:');
    if (!title) return;

    const room = prompt('Select room (A, B, or C):');
    if (!room) return;

    const event = {
      id: Date.now(),
      title,
      start: selectInfo.start,
      end: selectInfo.end,
      resourceId: `room-${room.toLowerCase()}`,
      extendedProps: {
        room: `Room ${room.toUpperCase()}`,
        bookedBy: 'Current User',
        type: 'meeting'
      }
    };

    setEvents([...events, event]);
  };

  return (
    <div className="w-full p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={false}
        events={events}
        select={handleDateSelect}
        eventContent={renderEventContent}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '17:00'
        }}
        resources={rooms}
      />
    </div>
  );
};
