import React from 'react';

export default (props) => {
  const {
    styleName, value, onClick,
    disabled, loading,
  } = props;

  return (
    <div className="kt-login__actions">
      {(!disabled) && (
        <button
          type="submit"
          id="kt_login_signin_submit"
          className={`btn btn-brand btn-pill btn-elevate ${styleName}`}
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {value}
        </button>
      )}
    </div>
  );
};
