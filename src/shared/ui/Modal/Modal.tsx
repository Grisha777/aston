import { useState } from 'react';
import { ModalContext, ModalHeader, ModalBody, ModalFooter } from './ModalContext';
import { Button } from '../Button/Button';

export const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>О проекте</Button>

            <ModalContext isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalHeader onClose={() => setIsOpen(false)}>О проекте</ModalHeader>

                <ModalBody>
                    <p><strong>Проект "Посты"</strong></p>
                    <p>Тут будет вся информаия о проекте "Посты".</p>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
                </ModalFooter>
            </ModalContext>
        </>
    );
};
