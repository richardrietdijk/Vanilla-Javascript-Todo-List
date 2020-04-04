/* Todo Array. onload get localstorage. then loop over array data and display */
let todoArray = [];
if (JSON.parse(localStorage.getItem('serialized')) !== null) {
  todoArray = JSON.parse(localStorage.getItem('serialized'));
}

/* Selectors */
const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('.add')

/* Read from stored array and display in ul */

todoArray.forEach(todo => 
  todoList.insertAdjacentHTML('afterbegin', `
  <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" class="tick"/>
      <label for="${todo.id}"></label>
      <span>${todo.text}</span>
      <button class="delete-todo">
        Delete
      </button>
    </li>
  `)
  );

// localStorage.setItem('serialized', JSON.stringify(todoArray));


/* adding todo function*/

function addTodo(text) {
  /* create a todo object and push it to the array*/
  const todo = {
    id: Date.now(),
    text,
    done: false,
  };

  todoArray.push(todo);
  localStorage.setItem('serialized', JSON.stringify(todoArray));

  /* put inside the ul on the page, as first li (afterbegin) */
  todoList.insertAdjacentHTML('afterbegin', `
  <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" class="tick"/>
      <label for="${todo.id}"></label>
      <span>${todo.text}</span>
      <button class="delete-todo">
        Delete
      </button>
    </li>
  `);
}

/* click add button when pressing enter key */
const inputItem = document.querySelector('.item')
inputItem.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('.add').click();
    }
});

/* add todo to list */
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const inputItem = document.querySelector('.item')
  const value = inputItem.value;
  if (value) {
    addTodo(value);
    inputItem.value = '';
    focus();
  }
});

todoList.addEventListener('click', event => {
  /* marking as done / undone */
  if (event.target.classList.contains('tick')) {
    const key = event.target.parentElement.dataset.key;
      //return index number of object that matches inputkey === id value 
      const index = todoArray.findIndex(obj => obj.id === +(key));
      // "flip" done value 
      todoArray[index].done = !todoArray[index].done;
      // add / remove class depending on done value
      const item = document.querySelector(`[data-key='${key}']`);
      if (todoArray[index].done) {
        item.classList.add('done');
      } else {
        item.classList.remove('done');
      }
    
  }
  /* delete completed */
  if (event.target.classList.contains('delete-todo')) {
    const key = event.target.parentElement.dataset.key;
  // make new array w objects (omitting the to be deleted object) 
  todoArray = todoArray.filter(obj => obj.id !== +(key));
  //remove item from dom, using complex selector to select the element w the correct key
  const todoItem = document.querySelector(`[data-key='${key}']`);
  todoItem.remove();
  }
  localStorage.setItem('serialized', JSON.stringify(todoArray));

});


