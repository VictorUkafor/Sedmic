import React from 'react';

export default (props) => {
  const {
    selectMessage, name, error, value,
    options, handleChange, onKey, icon,
  } = props;

  const selects = options.map(
    (option, index) => (
      <option
        key={index}
        value={option}
      >{option}
      </option>
    ),
  );

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
        <select
          style={{ backgroundColor: '#f7f8fa' }}
          className="custom-select form-control"
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          onKeyUp={onKey}
        >
          <option value="">{selectMessage}</option>
          {selects}
        </select>
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
