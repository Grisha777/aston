import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { CommentList } from '../../widgets/CommentList/ui/CommentList';
import type { Comment } from '../../widgets/CommentList/CommentTypes';
import '../Pages.css';
import './PostDetailPage.css';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
        try {
            const [postRes, commentsRes] = await Promise.all([
                fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
                fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
            ]);

            const postData = await postRes.json();
            const commentsData = await commentsRes.json();

            setPost(postData);
            setComments(commentsData);

            } catch (error) {
                console.error('Ошибка поиска постов', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка поста...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="error-container">
                <p className="error-message">Пост не найден</p>
                <Button onClick={() => navigate('/posts')}>
                    Вернуться к постам
                </Button>
            </div>
        );
    }

    return (
        <div className="post-detail-page">
        <div className="post-detail-header">
            <Link to="/posts" className="back-link">
                Назад к постам
            </Link>
            <Link to={`/users/${post.userId}/posts`} className="user-link">
                Посты пользователя {post.userId}
            </Link>
        </div>

        <div className="post-detail-card">
            <h1 className="post-detail-title">{post.title}</h1>
                <p className="post-detail-body">{post.body}</p>
            <div className="post-detail-meta">
                <span>Автор: Пользователь #{post.userId}</span>
                <span>ID поста: #{post.id}</span>
            </div>
        </div>

        <div className="comments-section">
            <h2 className="comments-title">💬 Комментарии ({comments.length})</h2>
            <CommentList comments={comments} />
        </div>
    </div>
  );
};
