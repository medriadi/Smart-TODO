document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksList = document.getElementById('tasks');
    const notificationBell = document.getElementById('notification-bell');
    const notificationCount = document.getElementById('notification-count');
    const viewCalendarBtn = document.getElementById('view-calendar-btn');

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task.title, task.description, task.deadline));

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const title = taskTitleInput.value.trim();
        const description = taskDescInput.value.trim();
        const deadline = taskDeadlineInput.value;

        if (title === '') {
            alert('Task title is required!');
            return;
        }

        addTask(title, description, deadline);
        saveTask(title, description, deadline);
        clearForm();
    });

    viewCalendarBtn.addEventListener('click', () => {
        window.location.href = 'calendar.html';
    });

    function addTask(title, description, deadline) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = title;

        const taskDesc = document.createElement('p');
        taskDesc.textContent = description;

        const taskDeadline = document.createElement('p');
        taskDeadline.textContent = `Deadline: ${deadline ? new Date(deadline).toLocaleString() : 'None'}`;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', () => {
            editTask(taskItem, title, description, deadline);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            tasksList.removeChild(taskItem);
            deleteTask(title);
        });

        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskDesc);
        taskContent.appendChild(taskDeadline);
        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskActions);
        tasksList.appendChild(taskItem);

        if (deadline) {
            scheduleNotification(deadline);
        }
    }

    function editTask(taskItem, oldTitle, oldDescription, oldDeadline) {
        taskTitleInput.value = oldTitle;
        taskDescInput.value = oldDescription;
        taskDeadlineInput.value = oldDeadline;

        addTaskBtn.textContent = 'Save Changes';
        addTaskBtn.removeEventListener('click', addTaskBtnClickHandler);

        addTaskBtn.addEventListener('click', () => {
            taskItem.querySelector('h3').textContent = taskTitleInput.value.trim();
            taskItem.querySelector('p:nth-child(2)').textContent = taskDescInput.value.trim();
            taskItem.querySelector('p:nth-child(3)').textContent = `Deadline: ${taskDeadlineInput.value ? new Date(taskDeadlineInput.value).toLocaleString() : 'None'}`;

            updateTask(oldTitle, taskTitleInput.value.trim(), taskDescInput.value.trim(), taskDeadlineInput.value);
            clearForm();
            addTaskBtn.textContent = 'Add Task';
            addTaskBtn.addEventListener('click', addTaskBtnClickHandler);
        }, { once: true });
    }

    function clearForm() {
        taskTitleInput.value = '';
        taskDescInput.value = '';
        taskDeadlineInput.value = '';
    }

    function scheduleNotification(deadline) {
        const now = new Date();
        const taskDeadline = new Date(deadline);

        if (taskDeadline > now) {
            const timeout = taskDeadline - now;

            setTimeout(() => {
                const count = parseInt(notificationCount.textContent);
                notificationCount.textContent = count + 1;
            }, timeout);
        }
    }

    const addTaskBtnClickHandler = (e) => {
        e.preventDefault();
        
        const title = taskTitleInput.value.trim();
        const description = taskDescInput.value.trim();
        const deadline = taskDeadlineInput.value;

        if (title === '') {
            alert('Task title is required!');
            return;
        }

        addTask(title, description, deadline);
        saveTask(title, description, deadline);
        clearForm();
    };

    addTaskBtn.addEventListener('click', addTaskBtnClickHandler);

    function saveTask(title, description, deadline) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title, description, deadline });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(oldTitle, newTitle, newDescription, newDeadline) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.title === oldTitle);
        if (taskIndex > -1) {
            tasks[taskIndex] = { title: newTitle, description: newDescription, deadline: newDeadline };
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function deleteTask(title) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
