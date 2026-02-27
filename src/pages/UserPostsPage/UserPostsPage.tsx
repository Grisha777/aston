import { Link, useParams } from 'react-router-dom';
import { PostList } from '../../widgets/PostList/PostList';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { usePosts } from '../../features/PostList/model/hooks/usePosts';
import './UserPostsPage.css';
import '../Pages.css'

export const UserPostsPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1');
    const { posts, loading, error } = usePosts(userId);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка постов...</p>
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
        <div className="user-posts-page">
            <div className="page-header">
                <h1 className="page-title">Посты пользователя №{userId}</h1>
                <UserTabs userId={userId}/>
                <PostList posts={posts}/>
            </div>
        </div>
        // <div className="user-posts-page">
        //     <div className="page-header">
        //         <h1 className="page-title">📝 Посты пользователя #{id}</h1>
        //         <Link to="/" className="back-link">
        //             На главную
        //         </Link>
        //     </div>

        //     {posts.length === 0 ? (
        //         <div className="empty">
        //             <p>У пользователя нет постов</p>
        //         </div>
        //     ) : (
        //         <PostList posts={posts} />
        //     )}
        // </div>
    );
};
