import React from 'react';

export default (props) => {
  const {
    imageMessage, name, onKey, handleChange, error, value,
  } = props;

  return (
    <div className="form-group custom-file">
      <input
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
