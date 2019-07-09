import React from 'react';

export default (props) => {
  const { placeholder, name } = props;

  return (
    <div className="form-group ">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">NG</span>
        </div>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">+234</span>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder={placeholder}
          name={name}
          aria-describedby="basic-addon1"
          autoComplete="off"
        />
      </div>
    </div>
  );
};
