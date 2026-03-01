import { useParams, Link } from 'react-router-dom';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { useGetAlbumsByUserIdQuery } from '../../entities/post/api/albumsApi';
import '../Pages.css';
import './UserAlbumsPage.css';

export const UserAlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1', 10);

    const { data: albums = [], isLoading, error } = useGetAlbumsByUserIdQuery(userId);

    if (isLoading) {
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
                <p className="error-message">Ошибка:{}</p>
                <Link to="/" className="error-link">
                    Обновить страницу
                </Link>
            </div>
        );
    }

    return (
        <div className="user-albums-page">
            <div className="page-header">
                <h1 className="page-title">Альбомы пользователя №{id}</h1>
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
                            <span>Альбом ID: №{album.id}</span>
                        </div>
                    </Link>
                ))}
            </div>
            )}
        </div>
    );
};
