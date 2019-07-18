import React from 'react';

export default (props) => {
  const {
    selectMessage, name, error, value,
    options, handleChange, onKey,
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
      <select
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
