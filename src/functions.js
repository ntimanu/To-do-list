let tasks = JSON.parse(localStorage.getItem('tasks')) || [];// eslint-disable-line
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasks();
}

function deleteTask(targetIndex) {
  const filterList = tasks.filter((item) => +item.index !== +targetIndex);
  const newmylist = filterList.map((item, index) => ({
    description: item.description,
    completed: item.completed,
    index: index + 1,
  }));
  localStorage.setItem('tasks', JSON.stringify(newmylist));
  tasks = newmylist;
  saveTasks();
}

function editTaskDescription(index, description) {
  tasks[index].description = description;
  saveTasks();
}

export {
  tasks, addTask, deleteTask, editTaskDescription,
};