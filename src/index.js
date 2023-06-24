import './style.css';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const todoList = document.getElementById('todo-list');
const addTaskButton = document.getElementById('addbtn');
const newTaskInput = document.getElementById('inputtxt');
const clearAllButton = document.getElementById('clearallbtn');

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.index = i;
  });
  saveTasks();
}

function editTaskDescription(index, description) {
  tasks[index].description = description;
  saveTasks();
}

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, i) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
    });
    listItem.appendChild(checkbox);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.innerText = task.description;
    listItem.appendChild(taskDescription);

    const editTaskDescriptionButton = document.createElement('button');
    editTaskDescriptionButton.classList.add('edit-task-description');
    editTaskDescriptionButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editTaskDescriptionButton.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.classList.add('task-input');
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          editTaskDescription(i, input.value);
          renderTasks();
        }
      });
      listItem.replaceChild(input, taskDescription);
      input.focus();
    });
    listItem.appendChild(editTaskDescriptionButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', () => {
      deleteTask(i);
      renderTasks();
    });
    listItem.appendChild(deleteButton);

    const ellipsisButton = document.createElement('button');
    ellipsisButton.classList.add('ellipsis-button');
    ellipsisButton.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
    ellipsisButton.addEventListener('click', () => {
      deleteButton.style.display = 'inline-block';
      ellipsisButton.style.display = 'none';
    });
    listItem.appendChild(ellipsisButton);

    todoList.appendChild(listItem);
  });
}

addTaskButton.addEventListener('click', () => {
  const newTaskDescription = newTaskInput.value;
  if (newTaskDescription.trim() !== '') {
    addTask(newTaskDescription);
    renderTasks();
    newTaskInput.value = '';
  }
});

newTaskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

clearAllButton.addEventListener('click', () => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  tasks.length = 0;
  incompleteTasks.forEach((task) => {
    tasks.push(task);
  });
  saveTasks();
  renderTasks();
});

renderTasks();