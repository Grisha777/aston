import { ThemeProvider } from '../shared/lib/theme/ThemeProvider';
import { MainLayout } from '../shared/layouts/MainLayout';
import { PostList } from '../widgets/PostList/PostList';
import './App.css'

export const App = () => {
  const posts = [
    { id: 1, title: 'Заголовок 1', body: 'Содержимое поста 1' },
    { id: 2, title: 'Заголовок 2', body: 'Содержимое поста 2' },
    { id: 3, title: 'Заголовок 3', body: 'Содержимое поста 3' },
    { id: 4, title: 'Заголовок 4', body: 'Содержимое поста 4' },
    { id: 5, title: 'Заголовок 5', body: 'Содержимое поста 5' },
  ];

  return (
    <ThemeProvider>
      <MainLayout>
        <PostList posts={posts}/>
      </MainLayout>
    </ThemeProvider>
  );
};
