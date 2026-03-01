import type { MouseEventHandler, PropsWithChildren } from 'react';
import './Button.css';

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ onClick, className = '', children }: PropsWithChildren<ButtonProps>) => {
    const classNames = `button ${className}`.trim();

    return (
        <button onClick={onClick} className={classNames}>
            {children}
        </button>
    );
};
