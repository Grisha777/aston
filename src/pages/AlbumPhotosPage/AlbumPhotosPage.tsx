import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Photo } from '../../entities/post/PostTypes';
import '../Pages.css'
import './AlbumPhotosPage.css';

export const AlbumPhotosPage = () => {
    const { id } = useParams<{ id: string }>();
    const albumId = parseInt(id || '1', 10);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const controller = new AbortController();

      const fetchPhotos = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Ошибка загрузки фото альбомов');
          }

          const data: Photo[] = await response.json();
          setPhotos(data.slice(0, 20));
        } catch (error) {
          console.error('Ошибка поиска фото альбомов', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPhotos();
      return () => controller.abort();
    }, [albumId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка фотографий альбомов...</p>
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
        <div className="album-photos-page">
            <div className="page-header">
                <h1 className="page-title">Фотографии альбома №{albumId}</h1>
                <Link to={`/users/${albumId}/albums`} className="back-link">
                  Назад к альбомам
                </Link>
            </div>

        {photos.length === 0 ? (
            <div className="empty">
                <p>В альбоме нет фотографий</p>
            </div>
        ) : (
            <div className="photos-grid">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo-card">
                    <img
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        className="photoo"
                        loading="lazy"
                    />
                    <p className="photo-title">{photo.title}</p>
                    <a
                      href={photo.url}
                      target="_blank"
                      className="photo-full-link"
                    >
                      Открыть оригинал
                    </a>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
