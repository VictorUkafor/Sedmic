import React from 'react';

export default (props) => {
  const {
    imageMessage, name, onKey, icon,
    handleChange, error, value,
  } = props;


  return (
    <div className="form-group custom-file">
      <div className="input-group">
        {icon && (
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">
              <i className={icon} />
            </span>
          </div>
        )}
        <input
          style={{ backgroundColor: '#f7f8fa' }}
          className="custom-file-input"
          name={name}
          type="file"
          id={name}
          onKeyUp={onKey}
          value={value}
          onChange={handleChange}
        />
        <label
          className="custom-file-label custom-file-label-auth"
          htmlFor={name}
        >{imageMessage}
        </label>
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
