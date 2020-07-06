import React from "react";

const Form = (props) => {
  return (
    <form className="form__search">
      <input
        className="form__input"
        type="text"
        value={props.value}
        placeholder="Enter city"
        onChange={props.change}
      />
    </form>
  );
};

export default Form;
