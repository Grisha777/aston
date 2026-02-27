import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../../../shared/layouts/MainLayout';
import { PostsPage } from '../../../pages/PostPage/PostPage';
import { PostDetailPage } from '../../../pages/PostDetailPage/PostDetailPage';
import { UserAlbumsPage } from '../../../pages/UserAlbumsPage/UserAlbumsPage';
import { AlbumPhotosPage } from '../../../pages/AlbumPhotosPage/AlbumPhotosPage';
import { UserTodosPage } from '../../../pages/UserTodosPage/UserTodosPage';
import { UserPostsPage } from '../../../pages/UserPostsPage/UserPostsPage';
import { UsersPage } from '../../../pages/UserPage/UsersPage';
import { AlbumsPage } from '../../../pages/AlbumPage/AlbumsPage';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/posts" replace/>}/>
                <Route element={<MainLayout/>}>
                    <Route path="posts" element={<PostsPage/>}/>
                    <Route path="posts/:id" element={<PostDetailPage/>}/>

                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/users/:id/albums" element={<UserAlbumsPage/>}/>
                    <Route path="/users/:id/todos" element={<UserTodosPage/>}/>
                    <Route path="/users/:id/posts" element={<UserPostsPage/>}/>

                    <Route path="/albums" element={<AlbumsPage/>}/>
                    <Route path="albums/:id/photos" element={<AlbumPhotosPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};