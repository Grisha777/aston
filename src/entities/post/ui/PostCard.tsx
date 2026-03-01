import { Link } from 'react-router-dom';
import type { MouseEventHandler, PropsWithChildren } from 'react';
import type { Post } from '../../[entity]/model/types';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const PostCard = ({ post, onClick }: PropsWithChildren<PostCardProps>) => {
  return (
    <div className="post-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <span className="post-title-length">{post.title.length} символов</span>
      </div>
      <p className="post-body">{post.body}</p>
      <div className="post-actions">
        <Link to={`/users/${post.userId}/albums`} className="post-action-link">
          Альбомы
        </Link>
        <Link to={`/users/${post.userId}/todos`} className="post-action-link">
          Задачи
        </Link>
        <Link to={`/users/${post.userId}/posts`} className="post-action-link">
          Посты
        </Link>
      </div>
    </div>
  );
};
