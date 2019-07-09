import React from 'react';

export default (props) => {
  const { children, title } = props;

  return (
    <div className="kt-login__signin">
      <div className="kt-login__head">
        <h3 className="kt-login__title">{title}</h3>
      </div>
      <div className="kt-login__form">
        <form className="kt-form" action="#">
          {children}
        </form>
      </div>
    </div>
  );
};
