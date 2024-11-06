export const getEventColor = (type, category) => {
    const colors = {
      MEETING_ROOM: {
        default: '#4CAF50',
        urgent: '#f44336',
        optional: '#2196F3'
      },
      CLASS_SCHEDULE: {
        lecture: '#9C27B0',
        lab: '#FF9800',
        tutorial: '#009688'
      },
      EMPLOYEE_SHIFT: {
        morning: '#3F51B5',
        afternoon: '#FF5722',
        night: '#607D8B'
      }
    };
    return colors[type]?.[category] || colors[type]?.default || '#9E9E9E';
  };