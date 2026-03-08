import { useState, useCallback, type PropsWithChildren } from 'react';
import './PostLengthFilter.css';
import { Button } from '../../../shared/ui/Button/Button';

interface PostLengthFilterProps {
    onFilterChange: (min: number, max: number) => void;
}

export const PostLengthFilter = ({ onFilterChange }: PropsWithChildren<PostLengthFilterProps>) => {
    const [minLength, setMinLength] = useState(0);
    const [maxLength, setMaxLength] = useState(0);

    const handleMinChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = parseInt(e.target.value);
            setMinLength(value);
            onFilterChange(value, maxLength === 0 ? Infinity : maxLength);
        },
        [maxLength, onFilterChange]
    );

    const handleMaxChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = parseInt(e.target.value);
            setMaxLength(value);
            onFilterChange(minLength === 0 ? 0 : minLength, value === 0 ? Infinity : value);
        },
        [minLength, onFilterChange]
    );

    const handleReset = useCallback(() => {
        setMinLength(0);
        setMaxLength(0);
        onFilterChange(0, 0);
    }, [onFilterChange]);

    const showReset = minLength > 0 || maxLength > 0

    return (
        <div className="filter-container">
            <h3 className="filter-title">Фильтр по длине заголовка</h3>
            <div className="filter-inputs">
                <div className="filter-input-group">
                    <label htmlFor="minLength" className="filter-label">
                        Минимум символов:
                    </label>
                    <select
                        id="minLength"
                        value={minLength}
                        onChange={handleMinChange}
                        className="filter-select"
                    >
                        <option value="0">Не фильтровать</option>
                        <option value="5">5 и более</option>
                        <option value="10">10 и более</option>
                        <option value="15">15 и более</option>
                        <option value="20">20 и более</option>
                    </select>
                </div>

                <div className="filter-input-group">
                    <label htmlFor="maxLength" className="filter-label">
                        Максимум символов:
                    </label>
                    <select
                        id="maxLength"
                        value={maxLength}
                        onChange={handleMaxChange}
                        className="filter-select"
                    >
                        <option value="0">Не фильтровать</option>
                        <option value="10">До 10</option>
                        <option value="20">До 20</option>
                        <option value="30">До 30</option>
                        <option value="40">До 40</option>
                    </select>
                </div>
            </div>

            {showReset && (
                <Button onClick={handleReset}>Сбросить фильтр</Button>
            )}
        </div>
    );
};