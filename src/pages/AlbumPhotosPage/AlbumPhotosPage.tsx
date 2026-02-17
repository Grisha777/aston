import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Pages.css'
import './AlbumPhotosPage.css';

interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    albumId: number;
}

export const AlbumPhotosPage = () => {
    const { id } = useParams<{ id: string }>();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then((res) => res.json())
        .then((data) => {
            setPhotos(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка фотографий...</p>
            </div>
        );
    }

    return (
        <div className="album-photos-page">
            <div className="page-header">
                <h1 className="page-title">Фотографии альбома №{id}</h1>
                <Link to={`/users/${photos[0]?.albumId}/albums`} className="back-link">
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
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
