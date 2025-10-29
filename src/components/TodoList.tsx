import React from 'react';
import TodoItem from './TodoItem';
import { Todo, FilterType } from './types';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, onToggle, onDelete, onEdit }) => {
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-list">
      <div className="todo-stats">
        {activeTodosCount} task{activeTodosCount !== 1 ? 's' : ''} left
      </div>
      
      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          {filter === 'all' ? 'Нет задач' : 
           filter === 'active' ? 'No active tasks' : 'Нет выполненных задач'}
        </div>
      ) : (
        <div className="todos">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;