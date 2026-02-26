import { MainLayout } from '../shared/layouts/MainLayout';
import { PostList } from '../widgets/PostList/PostList';

export const App = () => {
  const posts = [
    { id: 1, title: 'Заголовок 1', body: 'Содержимое поста 1' },
    { id: 2, title: 'Заголовок 2', body: 'Содержимое поста 2' },
  ];

  return (
    <MainLayout>
      <PostList posts={posts}/>
    </MainLayout>
  );
};
