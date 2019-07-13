import React from 'react';

export default (props) => {
  const {
    placeholder, name, handleChange, onKey, error,
    location: { country, country_calling_code },
  } = props;

  return (
    <div className="form-group ">
      <div className="input-group">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{
              backgroundImage: `url('https://www.countryflags.io/${country}/flat/64.png')`,
              backgroundSize: 'cover',
            }}
            id="basic-addon1"
          >{country}
          </span>
        </div>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">{country_calling_code}</span>
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
          style={{ color: 'red' }}
        >{error}
        </div>
      )}
    </div>
  );
};
