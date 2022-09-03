import React from 'react';

function Spinner({ isLoading }) {
  return isLoading ? <div className='spinner' /> : <></>;
}

export default Spinner;
