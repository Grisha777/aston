import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/LayoutHeader/Header';
import { Footer } from '../../widgets/LayoutFooter/Footer';
import './MainLayout.css';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header/>
      <main className="main-content">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};