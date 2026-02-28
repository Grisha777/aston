import { useState, useEffect } from 'react';
import type { Post } from '../../../../entities/post/PostTypes';

export const usePosts = (userId?: number) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

            const url = userId
                ? `https://jsonplaceholder.typicode.com/users/${userId}/posts`
                : 'https://jsonplaceholder.typicode.com/posts';

            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
                throw new Error(`Статус ошибки: ${response.status}`);
            }

            const data: Post[] = await response.json();
            setPosts(data);
            } catch (error) {
                console.error('Ошибка', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        return () => {
            controller.abort();
        };
    }, [userId]);

    return { posts, loading, error };
};
