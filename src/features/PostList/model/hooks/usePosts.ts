import { useState, useEffect } from 'react';
import type { Post } from '../../../../entities/post/PostTypes';

interface UsePostsResult {
    posts: Post[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const usePosts = (): UsePostsResult => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
      
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            
            if (!response.ok) {
                throw new Error('Ошибка при загрузке постов');
            }
            
            const data: Post[] = await response.json();
            setPosts(data);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, error, refetch: fetchPosts };
};