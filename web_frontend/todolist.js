import React, { useEffect, useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedOriginalTodos = JSON.parse(localStorage.getItem('originalTodos')) || [];
    const savedFilter = localStorage.getItem('filter') || 'all';

    setTodos(savedTodos);
    setOriginalTodos(savedOriginalTodos);
    setFilterOption(savedFilter);
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!newTodo.trim()) return; 
    if (!priority) {
      alert('Please select a priority for your todo.');
      return;
    }

    const newTodoItem = {
      id: generateRandomID(),
      value: newTodo,
      priority: parseInt(priority, 10),
      completed: false
    };

    const updatedTodos = [...todos, newTodoItem];
    const updatedOriginalTodos = [...originalTodos, newTodoItem];

    setTodos(updatedTodos);
    setOriginalTodos(updatedOriginalTodos);
    updateLocalStorage(updatedTodos, updatedOriginalTodos);

    setNewTodo('');
    setPriority(''); 
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilterOption(newFilter);
    localStorage.setItem('filter', newFilter);
  };

  const updateLocalStorage = (updatedTodos, updatedOriginalTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    localStorage.setItem('originalTodos', JSON.stringify(updatedOriginalTodos));
  };

  const filteredTodos = () => {
    switch (filterOption) {
      case 'all':
        return todos;
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Uncompleted':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };


  const handleToggleComplete = (id) => { 
    const updatedTodos = todos.map (todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo 
    );
    const updatedOriginalTodos = updatedTodos;
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos,updatedOriginalTodos);
  }

  const handleDeleteTodo = (id) => { 
    const updatedTodos = todos.filter (todo => todo.id  !== id ); 
    const updatedOriginalTodos = updatedTodos; 
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos, updatedOriginalTodos); 
  };

  const generateRandomID = () => {
    return window.crypto.randomUUID();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <button type="submit">Add Todo</button>
      </form>

      <select value={filterOption} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>

      <ul>
        {filteredTodos().map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.value} (Priority: {todo.priority})
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? 'Uncomplete' : 'Complete'}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
