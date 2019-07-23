import React from 'react';

export default (props) => {
  const {
    children, title, subTitle, handleSubmit, errorMessage, successMessage,
  } = props;

  return (
    <div className="kt-login__signin">
      <div className="kt-login__head">
        <h3 className="kt-login__title">{title}</h3>
        <div className="kt-login__desc">{subTitle}</div>

        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
          >{errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            className="alert alert-success"
            role="alert"
          >{successMessage}
          </div>
        )}

      </div>
      <div className="kt-login__form">
        <form
          className="kt-form"
          method="post"
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  );
};
