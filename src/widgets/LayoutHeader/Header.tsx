import { useState } from "react";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Button } from "../../shared/ui/Button/Button";
import { Modal } from "../../shared/ui/Modal/Modal";
import './Header.css'

export const Header = () => {
    const [isOpen, setIsAboutOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">Шапка</h1>
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
        </header>
    );
};
