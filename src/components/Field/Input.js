import React from 'react';

export default (props) => {
  const { type, placeholder, name } = props;

  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type || 'text'}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
      />
    </div>
  );
};
