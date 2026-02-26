import './PostCard.css'

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostCard = ({ post }: { post: Post }) => { 
  return (
    <div className='post-card'>
      <h2 className='post-title'>{post.title}</h2>
      <p className='post-body'>{post.body}</p>
    </div>
  );
};
