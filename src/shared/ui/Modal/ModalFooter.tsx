import type { ModalFooterProps } from '../ModalTypes';
import './Modal.css';

export const ModalFooter = ({ children }: ModalFooterProps) => {
    return <div className="modal-footer">{children}</div>;
};
