import { type FC } from 'react';
import React from 'react';
import './withLoading.css';

interface WithLoadingProps {
    isLoading: boolean;
}

export const withLoading = <loadingPosts extends object>( WrappedComponent: FC<loadingPosts>) => {
    return class WithLoading extends React.Component<loadingPosts & WithLoadingProps> {
    render() {
        const { isLoading, ...props } = this.props;
            
        if (isLoading) {
            return <div className="loading">Загрузка...</div>;
        }            
        return <WrappedComponent {...(props as loadingPosts)}/>;
    }
  };
};
