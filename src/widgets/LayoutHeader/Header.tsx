import { ThemeSwitcher } from '../../features/ThemeSwitcher/ui/ThemeSwitcher';
import { Modal } from '../../shared/ui/Modal/Modal';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';

export const Header = () => {
  const [isOpen, setIsAboutOpen] = useState(false);
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Posts App</h1>
          <nav className="header-nav">
            <NavLink to="/"className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Главная
            </NavLink>
            <NavLink to="/posts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Все посты
            </NavLink>

            <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Пользователи
            </NavLink>

            <NavLink to="/albums"className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              Альбомы
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <Button onClick={() => setIsAboutOpen(true)}>О проекте</Button>
            <Modal isOpen={isOpen} onClose={() => setIsAboutOpen(false)}>
              <Modal.Header onClose={() => setIsAboutOpen(false)}>
                О проекте
              </Modal.Header>
              <Modal.Body>
                <p><strong>Проект "Посты"</strong></p>
                <p>Тут будет вся информаия о проекте "Посты".</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setIsAboutOpen(false)} className="footer-close-button">
                  Закрыть
                </Button>
              </Modal.Footer>
            </Modal>
            <ThemeSwitcher/>
          </div>
        </div>
      </div>
    </header>
  );
};
