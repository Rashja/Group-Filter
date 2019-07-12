import React, { useState } from "react";
import "material-icons/iconfont/material-icons.scss";
const Droppable = props => {
  /*--------------------------- States ----------------------------*/
  const [getReverseFilter, setGetReverseFilter] = useState([]);
  /*----------------------------- Drop ----------------------------*/
  const drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    setGetReverseFilter([...getReverseFilter, data]);
    props.GetMode(data);
  };
  /*----------------------------------------------------------------*/
  const allowDrop = e => {
    e.preventDefault();
  };
  /*----------------------------------------------------------------*/
  const handleClick = e => {
    props.GetReverseFilter(e.target.innerText);
    setGetReverseFilter(getReverseFilter.filter(f => f !== e.target.innerText));
  };
  /*----------------------------------------------------------------*/
  const { id, style } = props;
  return (
    <div
      className="panel"
      id={id}
      onDrop={drop}
      onDragOver={allowDrop}
      style={style}
    >
      <header className="panel-heading">Drag your items here</header>
      <div className="panel-body">
        {getReverseFilter.length > 0 &&
          getReverseFilter.map((el, index) => (
            <button
              className="btn darkGreen-btn mx-5 mb-10"
              key={index}
              onClick={handleClick}
              children={el}
            />
          ))}
      </div>
    </div>
  );
};

export default Droppable;
