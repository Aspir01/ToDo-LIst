const taskInput = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const allTasksBtn = document.getElementById('allTasksBtn');
const activeTasksBtn = document.getElementById('activeTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');

// Массив списка задач
let tasks = [];

// Обработчик события для кнопки добавления задачи
addTaskBtn.addEventListener('click', function () {
    const taskTitle = taskInput.value;
    const taskDesc = taskDescription.value;
    if (taskTitle.trim() !== '') {
        tasks.push({ title: taskTitle, description: taskDesc, completed: false });
        renderTasks();
        taskInput.value = '';
        taskDescription.value = '';
    } else {
        alert('Пожалуйста, введите заголовок задачи');
    }
});

// Функция для отображения всех задач
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `<h3>${task.title}</h3>
<p>${task.description}</p>
<div class="btns task">
<button onclick="markCompleted(${index})">Завершить</button>
<button class="delete" onclick="deleteTask(${index})">Удалить</button>
</div>`;
        taskList.appendChild(taskItem);
    });
}

// Функция для отметки задачи как завершенной
function markCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Функция для удаления задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

allTasksBtn.addEventListener('click', function () {
    renderTasks();
});

// Отображение активных задач
activeTasksBtn.addEventListener('click', function () {
    const activeTasks = tasks.filter(task => !task.completed);
    if (activeTasks.length > 0) {
        taskList.innerHTML = '';
        activeTasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');
            taskItem.innerHTML = `<h3>${task.title}</h3>
            <p>${task.description}</p>
            <div class="btns task">
                <button class="complete-btn">Завершить</button>
                <button class="delete-btn">Удалить</button>
            </div>`;

            const completeBtn = taskItem.querySelector('.complete-btn');
            completeBtn.addEventListener('click', function () {
                markCompleted(index);
            });

            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                deleteTask(index);
            });

            taskList.appendChild(taskItem);
        });
    } else {
        taskList.innerHTML = '<p>Нет активных задач</p>';
    }
});

// Функция для отображения всех типов задач в соответствии с выбранным фильтром
function renderFilterTasks(completedFilter) {
    const filteredTasks = completedFilter ? tasks.filter(task => task.completed) : tasks;
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        taskItem.innerHTML = `<h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="btns task">
            <button class="complete-btn">Завершить</button>
            <button class="delete-btn">Удалить</button>
        </div>`;

        const completeBtn = taskItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', function () {
            markCompleted(index);
        });

        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteTask(index);
        });

        taskList.appendChild(taskItem);
    });
}

// Пример вызова функции при инициализации
renderFilterTasks(true);


// Функция для сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Вызываем функцию загрузки при загрузке страницы
window.addEventListener('load', loadTasks);

// Функция для отображения задач с учетом фильтра
function renderFilterTasks(filter) {
    taskList.innerHTML = '';
    let filteredTasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `<h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="btns task ">
        <button onclick="markCompleted(${index})">${task.completed ? 'Активировать' : 'Завершить'}</button>
<button class="delete" onclick="deleteTask(${index})">Удалить</button>
</div>`;
        taskList.appendChild(taskItem);
    });
}

allTasksBtn.addEventListener('click', function () {
    renderFilterTasks('all');
});

activeTasksBtn.addEventListener('click', function () {
    renderFilterTasks('active');
});

completedTasksBtn.addEventListener('click', function () {
    renderFilterTasks('completed');
});