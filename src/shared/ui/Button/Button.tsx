import './Button.css';

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
}

export const Button = ({onClick, className='', children}: ButtonProps) => {
    const classNames= `button ${className}`.trim()
    return (
        <button onClick={onClick} className={classNames}>
            {children}
        </button>
    )
}