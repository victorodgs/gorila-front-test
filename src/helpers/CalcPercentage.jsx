import React from 'react';

export default props => {
  const value = (props.value / props.absolute) * 100;
  if (value === NaN) {
    return '0';
  } else {
    return value;
  }
};
