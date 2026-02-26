export interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostCard = ({ post }: { post: Post }) => (
  <>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </>
);
