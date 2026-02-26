import { Header } from '../../widgets/LayoutHeader/Header';
import { Footer } from '../../widgets/LayoutFooter/Footer';
import './MainLayout.css'

export const MainLayout = ({ children }: { children: React.ReactNode }) => { 
  return (
    <div className='main-layout'>
      <Header/>
        <main className='main-content'>
          {children}
        </main>
      <Footer/>
    </div>
  );
};
