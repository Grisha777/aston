import { useMemo, useCallback, useState, type PropsWithChildren } from 'react';
import { PostCard } from '../../entities/post/ui/PostCard';
import { CommentList } from '../CommentList/ui/CommentList';
import type { Post } from '../../entities/[entity]/model/types';
import type { Comment } from '../../entities/[entity]/model/types';
import './PostList.css';

interface PostListProps {
  posts: Post[];
}

const Comments: Comment[] = [
  {
    id: 1, postId: 1, name: 'John Doe',
    email: 'john@example.com', body: 'Отличный пост!',
  },
  {
    id: 2, postId: 1, name: 'Jane Smith',
    email: 'jane@example.com', body: 'Отличный пост!',
  },
  {
    id: 3, postId: 1, name: 'Bob Johnson',
    email: 'bob@example.com', body: 'Отличный пост!',
  },
  {
    id: 4, postId: 1, name: 'Alice Brown',
    email: 'alice@example.com', body: 'Отличный пост!',
  },
  {
    id: 5, postId: 1, name: 'Charlie Wilson',
    email: 'charlie@example.com', body: 'Отличный пост!',
  },
  {
    id: 6, postId: 1, name: 'Diana Miller',
    email: 'diana@example.com', body: 'Отличный пост!',
  },
  {
    id: 7, postId: 1, name: 'Eve Davis',
    email: 'eve@example.com', body: 'Отличный пост!',
  },
  {
    id: 8, postId: 1, name: 'Frank Thomas',
    email: 'frank@example.com', body: 'Отличный пост!',
  },
];

export const PostList = ({ posts }: PropsWithChildren<PostListProps>) => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const filteredPosts = useMemo(() => {
    return posts;
  }, [posts]);

  const handlePostClick = useCallback((postId: number) => {
    setSelectedPost((prev) => (prev === postId ? null : postId));
  }, []);

  const renderComments = useCallback(
    (postId: number) => {
      if (selectedPost !== postId) {
        return null;
      }
      return <CommentList comments={Comments}/>;
    },
    [selectedPost]
  );

  return (
    <div className="post-list-container">
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-item">
            <PostCard post={post} onClick={() => handlePostClick(post.id)}/>
            {renderComments(post.id)}
          </div>
        ))}
      </div>
    </div>
  );
};
