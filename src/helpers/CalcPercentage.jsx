import React from 'react';

export default props => {
  const value = ((props.value / props.absolute) * 100).toFixed(2);
  if (isNaN(value)) {
    return '0%';
  } else {
    return value + '%';
  }
};
