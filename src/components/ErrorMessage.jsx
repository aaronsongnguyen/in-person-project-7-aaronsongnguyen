const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message || 'Failed to load projects. Please try again.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;