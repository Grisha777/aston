import { useState, useCallback } from 'react';
import './PostLengthFilter.css';
import { Button } from '../../../shared/ui/Button/Button';

interface PostLengthFilterProps {
    onFilterChange: (min: number, max: number) => void;
}

export const PostLengthFilter = ({ onFilterChange }: PostLengthFilterProps) => {
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(0);

    const handleMinChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value) || 0;
            setMinLength(value);
            onFilterChange(value, maxLength);
        },
        [maxLength, onFilterChange]
    );

    const handleMaxChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value) || 0;
            setMaxLength(value);
            onFilterChange(minLength, value);
        },
        [minLength, onFilterChange]
    );

    const handleReset = useCallback(() => {
        setMinLength(0);
        setMaxLength(0);
        onFilterChange(0, 0);
    }, [onFilterChange]);

    return (
        <div className="filter-container">
            <h3 className="filter-title">Фильтр по длине заголовка</h3>
            <div className="filter-inputs">
                <div className="filter-input-group">
                    <label htmlFor="minLength" className="filter-label">
                        Минимум символов:
                    </label>
                    <input
                        type="number"
                        id="minLength"
                        value={minLength}
                        onChange={handleMinChange}
                        min="0"
                        className="filter-input"
                    />
                </div>

                <div className="filter-input-group">
                    <label htmlFor="maxLength" className="filter-label">
                        Максимум символов:
                    </label>
                    <input
                        type="number"
                        id="maxLength"
                        value={maxLength}
                        onChange={handleMaxChange}
                        min="0"
                        className="filter-input"
                    />
                </div>
            </div>

            {(minLength > 0 || maxLength > 0) && (
                <Button onClick={handleReset}>Сбросить фильтр</Button>
            )}
        </div>
    );
};
