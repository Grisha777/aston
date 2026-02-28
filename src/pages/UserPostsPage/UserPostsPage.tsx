import { Link, useParams } from 'react-router-dom';
import { PostList } from '../../widgets/PostList/PostList';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { useGetPostsByUserIdQuery } from '../../entities/post/api/postsApi';
import '../Pages.css'
import './UserPostsPage.css';

export const UserPostsPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '1');
    const { data: posts = [], isLoading, error } = useGetPostsByUserIdQuery(userId);

    if (isLoading) {
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
            <p className="error-message">Ошибка:{}</p>
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
                {/* <Link to="/" className="back-link">
                    На главную
                </Link> */}
                <UserTabs userId={userId}/>
                <PostList posts={posts}/>
            </div>
        </div>
        // <div className="user-posts-page">
        //     {posts.length === 0 ? (
        //         <div className="empty">
        //             <p>У пользователя нет постов</p>
        //         </div>
        //     ) : (
        //         <PostList posts={posts}/>
        //     )}
        // </div>
    );
};
