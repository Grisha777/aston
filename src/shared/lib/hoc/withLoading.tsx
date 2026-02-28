import { type FC, useEffect, useState } from 'react';
import './withLoading.css';

interface WithLoadingProps {
    isLoading: boolean;
}

export const withLoading = <loadingPosts extends object>( WrappedComponent: FC<loadingPosts>, loadingMessage: string = 'Загрузка...') => {
    const WithLoadingComponent: FC<loadingPosts & WithLoadingProps> = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading || props.isLoading) {
        return <div className="loading">{loadingMessage}</div>;
    }

    return <WrappedComponent {...props}/>;
  };

  WithLoadingComponent.displayName = `WithLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithLoadingComponent;
};
