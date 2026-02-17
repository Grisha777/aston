import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../shared/lib/theme/ThemeProvider';
import { MainLayout } from '../shared/layouts/MainLayout';
import { AppRouter } from './providers/router/router';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainLayout>
          <AppRouter/>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};
