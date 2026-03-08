import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { Button } from '../../shared/ui/Button/Button';
import { useGetTodosByUserIdQuery } from '../../entities/post/api/postsApi';
import '../Pages.css'
import './UserTodosPage.css';

export const UserTodosPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1', 10);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

   const { data: todos = [], isLoading, error } = useGetTodosByUserIdQuery(userId);

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.completed;
        }

        if (filter === 'active') {
            return !todo.completed;
        }
        return true;
    });

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка задач...</p>
            </div>
        );
    }

    if (error) {
      return (
        <div className="error-container">
          <p className="error-message">Ошибка:{}</p>
          <Link to="/" className="error-link">
            Обновить страницу
          </Link>
        </div>
      );
    }

    return (
      <div className="user-todos-page">
        <div className="page-header">
          <h1 className="page-title">Задачи пользователя №{id}</h1>
          <Link to="/" className="back-link">
            На главную
          </Link>
          <UserTabs userId={userId} />
        </div>

        <div className="todos-filter">
          <Button className={`filter-button ${filter === 'all' ? 'active' : ''}`}onClick={() => setFilter('all')}>
            Все ({todos.length})
          </Button>
          <Button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
            Выполненные ({todos.filter((todo) => todo.completed).length})
          </Button>
          <Button className={`filter-button ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
            Активные ({todos.filter((todo) => !todo.completed).length})
          </Button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty">
            <p>Нет задач</p>
          </div>
        ) : (
          <div className="todos-list">
            {todos.slice(0, 15).map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}>
                <div className="todo-checkbox">
                  <input type="checkbox" checked={todo.completed}/>
                </div>
                <p className="todo-title">{todo.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};
