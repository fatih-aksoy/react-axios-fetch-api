import React, { useState } from "react";

const Card = ({ name, username }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <button onClick={handleClick}>Show</button>
      {show ? (
        <p>
          {name} {username}
        </p>
      ) : (
        <p>{name} </p>
      )}
    </>
  );
};

export default Card;
