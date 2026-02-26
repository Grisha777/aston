import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { Button } from "../Button/Button";
import './Modal.css';

export const Modal = () => {
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset'

        return () => {
            document.body.style.overflow = 'hidden'
        };
    },[isOpen]);

    if (!isOpen) return <Button onClick={()=> setOpen(true)}>О проекте</Button>

    return createPortal(
        <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">О проекте</h2>
                    <Button onClick={() => setOpen(false)}>х</Button>
                </div>
                <div className="modal-body">
                    <p><strong>Проект</strong></p>
                    <p>Тут будет вся информаия о проекте "Посты".</p>
                </div>
                <div className="modal-footer">
                    <Button onClick={() => setOpen(false)}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}