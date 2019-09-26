import React from 'react';

export default (props) => {
  const {
    type, placeholder, name, error,
    handleChange, onKey, icon,
  } = props;

  return (
    <div className="form-group">
      <div className="input-group">
        {icon && (
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">
              <i className={icon} style={{ color: '#003366' }} />
            </span>
          </div>
        )}
        <input
          style={{ backgroundColor: '#f7f8fa' }}
          className="form-control"
          type={type || 'text'}
          placeholder={placeholder}
          name={name}
          id={name}
          onKeyUp={onKey}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
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
