import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pages.css';
import './UserAlbumsPage.css';

interface Album {
    id: number;
    title: string;
    userId: number;
}

export const UserAlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
        .then((res) => res.json())
        .then((data) => {
            setAlbums(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка альбомов...</p>
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

            {albums.length === 0 ? (
                <div className="empty">
                    <p>У пользователя нет альбомов</p>
                </div>
            ) : (
            <div className="albums-grid">
                {albums.map((album) => (
                    <Link
                        key={album.id}
                        to={`/albums/${album.id}/photos`}
                        className="album-card"
                    >
                        <h3 className="album-title">{album.title}</h3>
                        <div className="album-meta">
                            <span>ID: #{album.id}</span>
                        </div>
                    </Link>
                ))}
            </div>
            )}
        </div>
    );
};
