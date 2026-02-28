import { useState, useEffect } from 'react';
import type { Album } from '../../entities/post/PostTypes';
import '../Pages.css';
import './AlbumsPage.css';
import { Link } from 'react-router-dom';

export const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/albums',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Ошибка загрузки альбомов');
        }

        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Ошибка поиска альбомов', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Загрузка альбомов...</p>
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
    <div className="albums-page">
      <h1 className="page-title">Список альбомов</h1>
      <div className="albums-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <h3 className="album-title">{album.title}</h3>
            <div className="album-user">Пользователь №{album.userId}</div>
            <div className="album-actions">
              <a href={`/albums/${album.id}/photos`} className="album-action-link">
                Фото
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
