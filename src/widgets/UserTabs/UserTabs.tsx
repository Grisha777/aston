import { NavLink } from 'react-router-dom';
import './UserTabs.css';

interface UserTabsProps {
    userId: number;
}

export const UserTabs = ({ userId }: UserTabsProps) => {

    return (
      <div className="user-tabs">
        <div className="tabs-header">
          <h2 className="tabs-title">Профиль пользователя #{userId}</h2>
        </div>
        <nav className="tabs-nav">

        <NavLink to={`/users/${userId}/posts`} className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}end>
          Посты
        </NavLink>
        <NavLink to={`/users/${userId}/albums`} className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>
          Альбомы
        </NavLink>

        <NavLink to={`/users/${userId}/todos`} className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>
          Задачи
        </NavLink>
        </nav>
      </div>
    );
};
