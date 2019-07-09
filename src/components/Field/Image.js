import React from 'react';

export default (props) => {
  const { imageMessage, name } = props;

  return (
    <div className="form-group">
      <input
        className="form-control"
        name={name}
        type="file"
      />
      <label
        className="custom-file-label custom-file-label-auth"
        htmlFor="customFile"
      >{imageMessage}
      </label>
    </div>
  );
};
