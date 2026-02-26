import { Fragment } from 'react/jsx-runtime';
import { PostCard } from '../../entities/post/ui/PostCard';
import type { Post } from '../../entities/post/ui/PostCard';
import './PostList.css'

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='post-list'>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <PostCard post={post} />
        </Fragment>
      ))}
    </div>
  );
};
