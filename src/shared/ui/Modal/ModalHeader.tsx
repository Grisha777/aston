import type { ModalHeaderProps } from '../ModalTypes';
import './Modal.css';

export const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
    return (
        <div className="modal-header">
            <h2 className="modal-title">{children}</h2>
            {onClose && (
                <button onClick={onClose} className="modal-close-btn">x</button>
            )}
        </div>
    );
};
