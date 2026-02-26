import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Modal } from "../../shared/ui/Modal/Modal";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Шапка</h1>
        <div className="header-actions">
          <Modal/>
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  );
};
