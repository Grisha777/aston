import type { ModalBodyProps } from '../ModalTypes';
import './Modal.css';

export const ModalBody = ({ children }: ModalBodyProps) => {
    return <div className="modal-body">{children}</div>;
};
