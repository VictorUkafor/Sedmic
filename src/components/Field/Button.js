import React from 'react';

export default (props) => {
  const { styleName, value } = props;

  return (
    <div className="kt-login__actions">
      <button
        type="button"
        id="kt_login_signin_submit"
        className={`btn btn-brand btn-pill btn-elevate ${styleName}`}
      >{value}
      </button>
    </div>
  );
};
