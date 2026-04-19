// Select elements from the DOM
const input = document.querySelector('#task-input');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#task-list');

// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Add event listener to button
button.addEventListener('click', function () {
  const taskText = input.value;

  // Condition: do not add empty task
  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  addTaskToDOM(taskText, false);
  saveTask(taskText, false);

  input.value = '';
});

// Function to add task to page
function addTaskToDOM(text, completed) {
  const li = document.createElement('li');
  li.innerHTML = text;

  if (completed) {
    li.classList.add('completed');
  }

  // Toggle completed when clicked
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  list.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update localStorage when toggling
function updateLocalStorage() {
  const allTasks = document.querySelectorAll('li');
  const tasks = [];

  allTasks.forEach(li => {
    tasks.push({
      text: li.innerText,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}