import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { CommentList } from '../../widgets/CommentList/ui/CommentList';
import type { Post } from '../../entities/post/PostTypes';
import type { Comment } from '../../widgets/CommentList/CommentTypes';
import '../Pages.css';
import './PostDetailPage.css';

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
      
      useEffect(() => {
        const controller = new AbortController();

        const fetchPost = async () => {
        try {
            setLoading(true);
            setError(null);

            const [postRes, commentsRes] = await Promise.all([
              fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                signal: controller.signal,
              }),
              fetch(
                `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
                {
                  signal: controller.signal,
                }
              ),
            ]);

            if (!postRes.ok) {
                throw new Error(`Пост не найден (статус ${postRes.status})`);
            }
            if (!commentsRes.ok) {
                throw new Error(`Ошибка загрузки комментариев (статус ${commentsRes.status})`);
            }

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

        if (id) {
            fetchPost();
        }

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка поста...</p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="error-container">
                <h2 className="error-title">Ошибка</h2>
                <p className="error-message">{error || 'Пост не найден'}</p>
                <div className="error-actions">
                    <Button onClick={() => navigate('/posts')}>
                        Все посты
                    </Button>
                    {post?.userId && (
                        <Button onClick={() => navigate(`/users/${post.userId}/posts`)}>
                            Посты пользователя {post.userId}
                        </Button>
                    )}
                </div>
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
                <div>
                    <h1 className="post-detail-title">{post.title}</h1>
                    <span className="post-title-length">{post.title.length} симв.</span>
                </div>
                <p className="post-detail-body">{post.body}</p>
                <div className="post-detail-meta">
                    <span>Автор: Пользователь #{post.userId}</span>
                    <span>ID поста: #{post.id}</span>
                </div>
            </div>

            <div className="comments-section">
                <h2 className="comments-title">Комментарии ({comments.length})</h2>
                <CommentList comments={comments} />
            </div>
        </div>
    );
};
