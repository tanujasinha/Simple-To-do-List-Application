// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// State
let todos = [];

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create todo item element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="todo-actions">
            <button onclick="toggleTodo(${todo.id})" title="Toggle completion">
                ${todo.completed ? '↩️' : '✅'}
            </button>
            <button onclick="deleteTodo(${todo.id})" title="Delete todo">❌</button>
        </div>
    `;
    return li;
}

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

// Add new todo
function addTodo(text) {
    const todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };
    todos.unshift(todo);
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value;
    if (text.trim()) {
        addTodo(text);
        todoInput.value = '';
    }
});

// Initialize app
loadTodos();