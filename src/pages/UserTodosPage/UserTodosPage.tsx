import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import type { Todo } from '../../entities/post/PostTypes';
import '../Pages.css'
import './UserTodosPage.css';
import { Button } from '../../shared/ui/Button/Button';

export const UserTodosPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1', 10);

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

    useEffect(() => {
         const controller = new AbortController();

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Ошибка! статус: ${response.status}`);
        }

        const data: Todo[] = await response.json();
        setTodos(data.slice(0, 20));
      } catch (error) {
        console.error('Ошибка поиска задач', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
    return () => controller.abort();
  }, [userId]);

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.completed;
        }

        if (filter === 'active') {
            return !todo.completed;
        }
        return true;
    });

    if (loading) {
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
          <p className="error-message">Ошибка:{error}</p>
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
          <UserTabs userId={userId}/>
        </div>

        <div className="todos-filter">
          <Button className={`filter-button ${filter === 'all' ? 'active' : ''}`}onClick={() => setFilter('all')}>
            Все ({todos.length})
          </Button>
          <Button className={`filter-button ${filter === 'completed' ? 'active' : ''}`}onClick={() => setFilter('completed')}>
            Выполненные ({todos.filter((todo) => todo.completed).length})
          </Button>
          <Button className={`filter-button ${filter === 'active' ? 'active' : ''}`}onClick={() => setFilter('active')}>
            Активные ({todos.filter((todo) => !todo.completed).length})
          </Button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty">
            <p>Нет задач</p>
          </div>
        ) : (
          <div className="todos-list">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};
