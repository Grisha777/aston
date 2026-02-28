import { useState, useMemo } from 'react';
import { ThemeProvider } from '../shared/lib/theme/ThemeProvider';
import { MainLayout } from '../shared/layouts/MainLayout';
import { PostList } from '../widgets/PostList/PostList';
import { PostLengthFilter } from '../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../features/PostLengthFilter/lib/filterByLength';
import { withLoading } from '../shared/lib/hoc/withLoading';
import type { Post } from '../entities/post/PostTypes';
import './App.css';

const posts: Post[] = [
  { id: 1, title: 'Заголовок 1', body: 'Содержимое поста 1' },
  { id: 2, title: 'Заголовок 2', body: 'Содержимое поста 2' },
  { id: 3, title: 'Длинный заголовок для тестирования', body: 'Содержимое поста 3' },
  { id: 4, title: 'Нет', body: 'Содержимое поста 4' },
  { id: 5, title: 'Заголовок 5', body: 'Содержимое поста 5' },
  { id: 6, title: 'Очень длинный заголовок, для тестирования', body: 'Содержимое поста 6' },
  { id: 7, title: 'З', body: 'Содержимое поста 7' },
  { id: 8, title: 'Заголовок 8', body: 'Содержимое поста 8' },
];

const PostListWithLoading = withLoading(PostList);

export const App = () => {
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(0);

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, minLength, maxLength);
  }, [minLength, maxLength]);

  const handleFilter = (min: number, max: number) => {
    setMinLength(min);
    setMaxLength(max);
  };

  return (
    <ThemeProvider>
      <MainLayout>
        <PostLengthFilter onFilterChange={handleFilter}/>
        <PostListWithLoading posts={filteredPosts} isLoading={false}/>
      </MainLayout>
    </ThemeProvider>
  );
};
