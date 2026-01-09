const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
let tasks = [];

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = document.getElementById('task-input').value;
    const taskDate = document.getElementById('date-input').value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    tasks.push(newTask);
    renderTasks(tasks);
    todoForm.reset();
});

function renderTasks(tasksToDisplay) {
    todoList.innerHTML = '';
    
    tasksToDisplay.forEach(task => {
        const li = document.createElement('li');
        // Tailwind classes for the list item
        li.className = `flex items-center justify-between p-3 rounded-lg border border-slate-100 ${task.completed ? 'bg-green-50 opacity-75' : 'bg-slate-50'}`;
        
        li.innerHTML = `
            <div class="flex flex-col">
                <span class="font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}">${task.text}</span>
                <span class="text-xs text-slate-400">${task.date}</span>
            </div>
            <div class="flex gap-2">
                <button onclick="toggleComplete(${task.id})" class="text-green-600 hover:bg-green-100 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <button onclick="deleteTask(${task.id})" class="text-red-500 hover:bg-red-100 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks(tasks);
}

function toggleComplete(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    renderTasks(tasks);
}

function filterTasks(status) {
    if (status === 'completed') renderTasks(tasks.filter(t => t.completed));
    else if (status === 'pending') renderTasks(tasks.filter(t => !t.completed));
    else renderTasks(tasks);
}

