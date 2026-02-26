import { PostCard } from '../../entities/post/ui/PostCard';
import type { Post } from '../../entities/post/ui/PostCard';

export const PostList = ({ posts }: { posts: Post[] }) => (
  <>
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </>
);
