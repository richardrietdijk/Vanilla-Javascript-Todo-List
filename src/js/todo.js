/* Set up the Todo Array / Retrieves localstorage. */
let todoArray = [];
if (JSON.parse(localStorage.getItem('serialized')) !== null) {
  todoArray = JSON.parse(localStorage.getItem('serialized'));
}

/* Selectors */
const todoList = document.querySelector('.todo-list'); // The todo List ul
const addButton = document.querySelector('.add'); // The "+" button
const inputItem = document.querySelector('.item'); // The form input field

/* Helper Function: insert to html from array */
const insertHtml = (obj) => {
  if (obj.done) {
    todoList.insertAdjacentHTML('afterbegin', `
    <li class="todo-item check done" data-key="${obj.id}">
        <span>${obj.text}</span>
        <div class="delete-todo">&#x274C;</div>
      </li>
    `);
  } else {
    todoList.insertAdjacentHTML('afterbegin', `
    <li class="todo-item check" data-key="${obj.id}">
        <span>${obj.text}</span>
        <div class="delete-todo">&#x274C;</div>
      </li>
    `);
  }
};

/* Loop over stored array and display todos in DOM */
todoArray.forEach((todo) => insertHtml(todo));

/* Create a todo object and pushes it to the array -> DoM */
const addTodo = (text) => {
  const todo = {
    id: Date.now(),
    text,
    done: false,
  };

  todoArray.push(todo);
  localStorage.setItem('serialized', JSON.stringify(todoArray));
  insertHtml(todo);
};

/* Helper Function: click the "add button" when pressing "enter key" */
inputItem.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('.add').click();
  }
});

/* 'add a todo' button functionality */
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const { value } = inputItem;
  if (value) {
    addTodo(value);
    inputItem.value = '';
    inputItem.focus();
  }
});

/* Marking as Done / undone */
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('check')) {
    const { key } = event.target.dataset;
    const index = todoArray.findIndex((obj) => obj.id === +(key));
    todoArray[index].done = !todoArray[index].done;
    const item = document.querySelector(`[data-key='${key}']`);
    if (todoArray[index].done) {
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
  }
  /* delete completed */
  if (event.target.classList.contains('delete-todo')) {
    const { key } = event.target.parentElement.dataset;
    todoArray = todoArray.filter((obj) => obj.id !== +(key));
    const todoItem = document.querySelector(`[data-key='${key}']`);
    todoItem.remove();
  }

  /* Save to localStorage as a String */
  localStorage.setItem('serialized', JSON.stringify(todoArray));
});
