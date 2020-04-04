/* Set up the Todo Array / Retrieves localstorage. */
let todoArray = [];
if (JSON.parse(localStorage.getItem('serialized')) !== null) {
  todoArray = JSON.parse(localStorage.getItem('serialized'));
}

/* Selectors */
const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('.add');
const inputItem = document.querySelector('.item');

/* Helper Function: insert to html from array */
const insertHtml = (obj) => {
  todoList.insertAdjacentHTML('afterbegin', `
<li class="todo-item" data-key="${obj.id}">
    <input id="${obj.id}" type="checkbox" class="check"/>
    <label for="${obj.id}"></label>
    <span>${obj.text}</span>
    <button class="delete-todo">Delete</button>
  </li>
`);
};

/* Loop over stored array and display todos in DOM */
todoArray.forEach((todo) => insertHtml(todo));

/* adding a todo function. creates a todo object and pushes it to the array */
const addTodo = (text) => {
  const todo = {
    id: Date.now(),
    text,
    done: false,
  };

  todoArray.push(todo);
  localStorage.setItem('serialized', JSON.stringify(todoArray));

  /* then push to HTML */
  insertHtml(todo);
};

/* Helper Function: click the "add button" when pressing "enter key" */
inputItem.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('.add').click();
  }
});

/* add a todo */
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
    const { key } = event.target.parentElement.dataset;
    const index = todoArray.findIndex((obj) => obj.id === +(key)); // get index where id === key
    todoArray[index].done = !todoArray[index].done; // "flip" done value of todo
    const item = document.querySelector(`[data-key='${key}']`); // add / remove class depending on done value
    if (todoArray[index].done) {
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
  }
  /* delete completed */
  if (event.target.classList.contains('delete-todo')) {
    const { key } = event.target.parentElement.dataset;
    todoArray = todoArray.filter((obj) => obj.id !== +(key)); // new array minus matched key object
    const todoItem = document.querySelector(`[data-key='${key}']`); // remove from DOM w/ complex selector
    todoItem.remove();
  }

  /* Save to localStorage */
  localStorage.setItem('serialized', JSON.stringify(todoArray));
});
