import { ThemeProvider } from '../shared/lib/theme/ThemeProvider';
import { AppRouter } from './providers/router/router';
import './App.css';

export const App = () => {
    return (
        <ThemeProvider>
            <AppRouter/>
        </ThemeProvider>
    )
}