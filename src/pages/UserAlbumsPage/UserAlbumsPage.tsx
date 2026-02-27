import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import type { Album } from '../../entities/post/PostTypes';
import '../Pages.css';
import './UserAlbumsPage.css';

export const UserAlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1', 10);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
        .then((res) => res.json())
        .then((data) => {
            setAlbums(data);
            setLoading(false);
        });

        const controller = new AbortController();

        const fetchAlbums = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`,
          { signal: controller.signal }
        );

        if (!response.ok) {
            throw new Error(`Ошибка! статус: ${response.status}`);
        }

        const data: Album[] = await response.json();
        setAlbums(data);
        } catch (error) {
            console.error('Ошибка поиска альбомов пользователей', error);
        } finally {
            setLoading(false);
        }
    }
    fetchAlbums()

    return () => controller.abort();
    }, [userId]);

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
        <div className="user-albums-page">
            <div className="page-header">
                <h1 className="page-title">Альбомы пользователя #{id}</h1>
                <Link to="/" className="back-link">
                    На главную
                </Link>
            </div>

            <UserTabs userId={userId}/>

            {albums.length === 0 ? (
                <div className="empty">
                    <p>У пользователя нет альбомов</p>
                </div>
            ) : (
            <div className="albums-grid">
                {albums.map((album) => (
                    <Link key={album.id} to={`/albums/${album.id}/photos`} className="album-card">
                        <h3 className="album-title">{album.title}</h3>
                        <div className="album-meta">
                            <span>Альбом ID: #{album.id}</span>
                        </div>
                    </Link>
                ))}
            </div>
            )}
        </div>
    );
};
