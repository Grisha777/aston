import { useState, useCallback, type PropsWithChildren } from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import type { Comment } from '../../../entities/[entity]/model/types';
import './CommentList.css';

interface CommentListProps {
    comments: Comment[];
}

export const CommentList = ({ comments }: PropsWithChildren<CommentListProps>) => {
    const commentsInPage = 3
    const [isComment, setComment] = useState(true);

    const toggleCollapse = useCallback(() => {
        setComment((prev) => !prev);
    }, []);

    const showControls = comments.length > commentsInPage;
    
    const commentsToShow = isComment ? comments.slice(0, commentsInPage) : comments;

    return (
        <div className="comment-list">
            <div className="comment-list-header">
                <h3 className="comment-list-title">
                    Комментарии ({comments.length})
                </h3>
                {showControls && (
                    <Button onClick={toggleCollapse} className="comment-toggle-button">
                        {isComment ? 'Развернуть все' : 'Свернуть'}
                    </Button>
                )}
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

            {isComment && showControls && (
                <Button onClick={toggleCollapse} className="show-more-button">
                    Показать все ({comments.length - commentsInPage})
                </Button>
            )}
        </div>
    );
};