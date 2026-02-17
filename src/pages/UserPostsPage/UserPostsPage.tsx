import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostList } from '../../widgets/PostList/PostList';
import type { Post } from '../../entities/post/PostTypes';
import '../Pages.css'
import './UserPostsPage.css';

export const UserPostsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка постов...</p>
            </div>
        );
    }

    return (
        <div className="user-posts-page">
            <div className="page-header">
                <h1 className="page-title">📝 Посты пользователя #{id}</h1>
                <Link to="/" className="back-link">
                    На главную
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="empty">
                    <p>У пользователя нет постов</p>
                </div>
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    );
};
