import { useEffect } from "react";
import { createPortal } from 'react-dom';
import type { ModalProps } from "../ModalTypes";
import './Modal.css';

export const ModalContext = ({isOpen, onClose, children}: ModalProps) => {
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

export { ModalHeader } from './ModalHeader';
export { ModalBody } from './ModalBody';
export { ModalFooter } from './ModalFooter';