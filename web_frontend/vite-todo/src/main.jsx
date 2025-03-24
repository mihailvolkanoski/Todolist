import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactApp from './ReactApp.jsx';
import TodoApp from './App.jsx';
import './todolist.css';

const root1 = createRoot(document.getElementById('root1'));
root1.render(
  <StrictMode>
    <ReactApp />
  </StrictMode>
);

const root2 = createRoot(document.getElementById('root2'));
root2.render(
  <StrictMode>
    <TodoApp />
  </StrictMode>
);