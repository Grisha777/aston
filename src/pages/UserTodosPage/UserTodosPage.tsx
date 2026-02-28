import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pages.css'
import './UserTodosPage.css';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

export const UserTodosPage = () => {
    const { id } = useParams<{ id: string }>();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

    useEffect(() => {
        
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        .then((res) => res.json())
        .then((data) => {
            setTodos(data);
            setLoading(false);
        });
    }, [id]);

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

    return (
        <div className="user-todos-page">
            <div className="page-header">
                <h1 className="page-title">Задачи пользователя #{id}</h1>
                <Link to="/" className="back-link">
                    На главную
                </Link>
            </div>

            <div className="todos-filter">
                <button
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Все ({todos.length})
                </button>
                <button
                className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
                >
                    Выполненные ({todos.filter((t) => t.completed).length})
                </button>

                <button
                className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
                >
                    Активные ({todos.filter((t) => !t.completed).length})
                </button>
            </div>

            {filteredTodos.length === 0 ? (
                <div className="empty">
                    <p>Нет задач</p>
                </div>
            ) : (
                <div className="todos-list">
                    {filteredTodos.map((todo) => (
                        <div
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        >
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
