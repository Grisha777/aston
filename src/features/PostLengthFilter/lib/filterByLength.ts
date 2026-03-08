import type { Post } from '../../../entities/[entity]/model/types';

export const filterByLength = ( posts: Post[], minLength: number, maxLength: number ): Post[] => {
    if (minLength === 0 && maxLength === 0) {
        return posts;
    }

    return posts.filter((post) => {
        const titleLength = post.title.length;
        const min = minLength || 0;
        const max = maxLength;
            
        return titleLength >= min && titleLength <= max;
    });
};
