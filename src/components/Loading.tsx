interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Yükleniyor...' }: LoadingProps) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
}; 