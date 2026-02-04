import { Header } from '../../widgets/LayoutHeader/Header';
import { Footer } from '../../widgets/LayoutFooter/Footer';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header/>
        <main>{children}</main>
    <Footer/>
  </>
);
