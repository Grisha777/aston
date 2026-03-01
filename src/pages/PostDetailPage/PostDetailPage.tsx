import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/Button/Button';
import { CommentList } from '../../widgets/CommentList/ui/CommentList';
import { useGetPostByIdQuery } from '../../entities/post/api/postsApi';
import { useGetCommentsByPostIdQuery } from '../../entities/post/api/commentsApi';
import '../Pages.css';
import './PostDetailPage.css';

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const postId = parseInt(id || '1');
    const navigate = useNavigate();

    const { data: post, isLoading: postLoading, error: postError } =  useGetPostByIdQuery(postId);

    const { data: comments = [], isLoading: commentsLoading } = useGetCommentsByPostIdQuery(postId, {
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: true,
        });

    const isLoading = postLoading || commentsLoading;
    const error = postError;

    if (isLoading) {
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
                <p className="error-message">{}</p>
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
                    <span>Автор: Пользователь №{post.userId}</span>
                    <span>ID поста: №{post.id}</span>
                </div>
            </div>

            <div className="comments-section">
                <h2 className="comments-title">Комментарии ({comments.length})</h2>
                <CommentList comments={comments} />
            </div>
        </div>
    );
};
