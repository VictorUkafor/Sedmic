import React from 'react';

export default (props) => {
  const { selectMessage, name, options } = props;

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
      <select className="custom-select form-control" name={name}>
        <option value="">{selectMessage}</option>
        {selects}
      </select>
    </div>
  );
};
