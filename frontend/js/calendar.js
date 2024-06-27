// js/calendar.js

document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: tasks.map(task => ({
            title: task.title,
            start: task.deadline,
            description: task.description
        })),
        eventClick: function(info) {
            alert(`Task: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
        }
    });

    calendar.render();
});
