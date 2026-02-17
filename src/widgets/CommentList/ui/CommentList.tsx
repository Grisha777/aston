import { useState, useCallback } from 'react';
import type { Comment } from '../CommentTypes';
import './CommentList.css';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
    const [isComment, setComment] = useState(true);
    const [visibleCount, setVisibleCount] = useState(3);

    const toggleCollapse = useCallback(() => {
        setComment((prev) => !prev);
    }, []);

    const showMore = useCallback(() => {
        setVisibleCount((prev) => prev + 5);
    }, []);

    const commentsToShow = isComment ? comments.slice(0, visibleCount) : comments;

    return (
        <div className="comment-list">
            <div className="comment-list-header">
                <h3 className="comment-list-title">
                    Комментарии ({comments.length})
                </h3>
                <button onClick={toggleCollapse} className="comment-toggle-btn">
                    {isComment ? 'Развернуть все' : 'Свернуть'}
                </button>
            </div>

            <div className="comments-grid">
                {commentsToShow.map((comment) => (
                <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                        <strong className="comment-author">{comment.name}</strong>
                        <span className="comment-email">{comment.email}</span>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                </div>
                ))}
            </div>

            {setComment && visibleCount < comments.length && (
                <button onClick={showMore} className="show-more-btn">
                    Показать ещё ({comments.length - visibleCount})
                </button>
            )}
        </div>
    );
};
