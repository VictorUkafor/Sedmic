import React from 'react';

export default (props) => {
  const {
    styleName, value, onClick, disabled,
  } = props;

  return (
    <div className="kt-login__actions">
      <button
        type="submit"
        id="kt_login_signin_submit"
        className={`btn btn-brand btn-pill btn-elevate ${styleName}`}
        onClick={onClick}
        disabled={disabled}
      >{value}
      </button>
    </div>
  );
};
