import type { ReactNode, MouseEventHandler } from 'react';
import './ItemList.css';

export interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    keyExtractor: (item: T) => string | number;
    title?: string;
    emptyMessage?: string;
    onItemClick?: (item: T, index: number) => void;
    className?: string;
    layout?: 'grid' | 'list';
}

export const ItemList = <T,>({
  items, keyExtractor,
  renderItem, title,
  emptyMessage = 'Список пуст',
  onItemClick, className = '',
  layout = 'list',
}: ItemListProps<T>) => {
    if (items.length === 0) {
        return (
            <div className={`item-list empty ${className}`}>
                {title && <h3 className="item-list-title">{title}</h3>}
                <div className="item-list-empty">{emptyMessage}</div>
            </div>
        );
    }

    const handleClick = (item: T, index: number): MouseEventHandler<HTMLDivElement> => {
        return (e) => {
            e.stopPropagation();
            
            if ((e.target as HTMLElement).closest('')) {
                return;
            }
            
            onItemClick?.(item, index);
        };
    };


  return (
    <div className={`item-list ${layout === 'grid' ? 'item-list-grid' : ''} ${className}`}>
      {title && <h3 className="item-list-title">{title}</h3>}

      <div className={`item-list-content ${layout === 'grid' ? 'item-list-content-grid' : ''}`}>
        {items.map((item, index) => (
          <div key={keyExtractor(item)}
            className={`item-list-item ${onItemClick ? 'item-list-item-clickable' : ''}`}
            onClick={onItemClick ? handleClick(item, index) : undefined}
            role={onItemClick ? 'button' : undefined}
            tabIndex={onItemClick ? 0 : undefined}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};
