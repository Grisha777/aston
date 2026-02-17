import { ThemeSwitcher } from '../../features/ThemeSwitcher/ui/ThemeSwitcher';
import { Modal } from '../../shared/ui/Modal/Modal';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Posts App</h1>
          <nav className="header-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Все посты
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          <Modal />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
