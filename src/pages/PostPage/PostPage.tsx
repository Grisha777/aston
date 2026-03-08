import { PostList } from '../../widgets/PostList/PostList';
import { PostLengthFilter } from '../../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../../features/PostLengthFilter/lib/filterByLength';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../Pages.css';
import './PostPage.css'
import { useGetPostsQuery } from '../../entities/post/api/postsApi';

export const PostsPage = () => {
    const { data: posts = [], isLoading, isError } = useGetPostsQuery();
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(0);

    const filteredPosts = useMemo(() => {
        return filterByLength(posts, minLength, maxLength);
    }, [posts, minLength, maxLength]);

    const handleFilterChange = (min: number, max: number) => {
        setMinLength(min);
        setMaxLength(max);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <p>Загрузка постов...</p>
            </div>
        );
    }

    if (isError) {
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
        <div className="posts-page">
            <div className="page-header">
                <h1 className="page-title">Все посты</h1>
            </div>

            <PostLengthFilter onFilterChange={handleFilterChange}/>
            <PostList posts={filteredPosts}/>

            {/* {filteredPosts.length === 0 ? (
                <div className="empty">
                    <p>Нет постов, соответствующих фильтру</p>
                </div>
            ) : (
                <PostList posts={filteredPosts} />
            )} */}
        </div>
    );
};
