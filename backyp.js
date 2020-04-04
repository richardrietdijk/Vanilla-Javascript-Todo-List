/* Todo Array */
let todoArray = [];

/* adding todo function*/

function addTodo(text) {
  /* create a todo object */
  const todo = {
    id: Date.now(),
    text,
    done: false,
  };
  
  /* push new object to array, maybe to the start of array? */
  todoArray.push(todo);  
  console.log('todoArray:', todoArray);

  /* put inside the ul on the page: afterbegin */
  const list = document.querySelector('.js-todo-list');
  list.insertAdjacentHTML('afterbegin', `
  <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox" class="tick js-tick"/>
      <label for="${todo.id}"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        Delete
      </button>
    </li>
  `);
}


/* add todo to list */
const addButton = document.querySelector('.add')
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Add button: click')
  const inputItem = document.querySelector('.item')
  const value = inputItem.value;
  if (value) {
    addTodo(value);
    inputItem.value = '';
  }
});

/* marking as done */
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }


});

/* add  / remove "done" class */
function toggleDone(key) {
  //return index number of object that matches inputkey === id value 
  const index = todoArray.findIndex(obj => obj.id === +(key));
  // flip done value 
  todoArray[index].done = !todoArray[index].done;
  // add /remove class depending on done value
  const item = document.querySelector(`[data-key='${key}']`);
  if (todoArray[index].done) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}

/* delete completed */
function deleteTodo(key) {
  // make new array w objects (omitting the to be deleted object) 
  todoArray = todoArray.filter(obj => obj.id !== +(key));
  //remove item from dom, using complex selector to select the element w the correct key
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
}
