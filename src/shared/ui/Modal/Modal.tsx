import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css'
import { Button } from '../Button/Button';

export interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

export const Modal = ({isOpen, onClose, children}: ModalProps) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    
        return () => {
            document.body.style.overflow = 'unset';
        };
    },[isOpen]);
    
    if (!isOpen) { 
        return null;
    }
    
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

Modal.Header = ({ children, onClose }: ModalProps) => {
    return (
        <div className="modal-header">
            <h2 className="modal-title">{children}</h2>
            {onClose && (
                <Button onClick={onClose} className="modal-close-button">x</Button>
            )}
        </div>
    );
};

Modal.Body = ({ children }: ModalProps) => {
    return <div className="modal-body">{children}</div>;
};

Modal.Footer = ({ children }: ModalProps) => {
    return <div className="modal-footer">{children}</div>;
};