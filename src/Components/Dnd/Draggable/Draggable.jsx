import React from "react";

const Draggable = props => {
  /*------------------------------------------*/
  const drag = e => {
    e.dataTransfer.setData("transfer", e.target.id);
  };
  /*------------------------------------------*/
  const noAllowDrop = e => {
    e.stopPropagation();
  };
  /*------------------------------------------*/
  const { children, id } = props;
  return (
    <div
      children={children}
      id={id}
      draggable="true"
      onDragStart={drag}
      onDragOver={noAllowDrop}
    />
  );
};

export default Draggable;
