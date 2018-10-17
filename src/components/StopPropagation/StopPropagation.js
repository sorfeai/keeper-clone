import React from 'react';
import PropTypes from 'prop-types';


const StopPropagation = ({ children }) => {
  const handleClick = (ev) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};


StopPropagation.propTypes = {
  children: PropTypes.element.isRequired,
};


export { StopPropagation };
