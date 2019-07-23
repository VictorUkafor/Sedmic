import React from 'react';

export default (props) => {
  const {
    placeholder, name, handleChange, onKey, error,
  } = props;

  return (
    <div className="form-group ">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">S-</span>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          onKeyUp={onKey}
          onChange={handleChange}
          aria-describedby="basic-addon1"
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