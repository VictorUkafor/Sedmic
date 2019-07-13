import React from 'react';

export default (props) => {
  const {
    type, placeholder, name, error,
    handleChange, onKey,
  } = props;

  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type || 'text'}
        placeholder={placeholder}
        name={name}
        id={name}
        onKeyUp={onKey}
        onChange={handleChange}
        autoComplete="off"
      />
      {error && (
        <div
          className="alert alert-light"
          role="alert"
          style={{ color: 'red', fontWeight: '700' }}
        >{error}
        </div>
      )}
    </div>
  );
};
