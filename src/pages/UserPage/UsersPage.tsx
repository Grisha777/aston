import { useState, useEffect } from 'react';
import type { User } from '../../entities/post/PostTypes';
import './UsersPage.css';
import { Link } from 'react-router-dom';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Ошибка загрузки пользователей');
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Ошибка поиска пользователей', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Загрузка постов...</p>
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
    <div className="users-page">
      <h1 className="page-title">Список пользователей</h1>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-username">@{user.username}</p>
            <div className="user-actions">
              <a href={`/users/${user.id}/posts`} className="user-action-link">
                Посты
              </a>
              <a href={`/users/${user.id}/albums`} className="user-action-link">
                Альбомы
              </a>
              <a href={`/users/${user.id}/todos`} className="user-action-link">
                Задачи
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
