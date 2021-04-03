//DEFINING VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {

  //load event for doam. to get the tasks from local storage
  document.addEventListener('DOMContentLoaded', getTasks);

  // add task
  form.addEventListener('submit', addTask);

  //remove task
  taskList.addEventListener('click', removeTask);

  //clear all tasks
  clearBtn.addEventListener('click', clearTasks);

  //filter tasks
  filter.addEventListener('keyup', filterTask);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    //li.innerHTML = taskInput.value;
    //new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //console.log(li);
    taskList.appendChild(li);

  })
}

function addTask(e) {

  if (taskInput.value === '') {
    alert('Add a task');

  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  //li.innerHTML = taskInput.value;
  //new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  //console.log(li);
  taskList.appendChild(li);

  //add task to local storage
  storeTask(taskInput.value);
  taskInput.value = '';
  e.preventDefault();

}

//storing in local storage
function storeTask(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  //console.log(e.target);
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are u sure u want to delete')) {
      e.target.parentElement.parentElement.remove();

      //now removing from local storage.
      removeLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {

  //2 ways to do it.

  //1
  //taskList.innerHTML = '';

  //2
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  //console.log(task);
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else
        task.style.display = 'none';

    }
  )
}