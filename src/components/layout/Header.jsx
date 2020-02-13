import React from 'react';
import {FaMoneyBillWave} from 'react-icons/fa';

export default props => {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="app-header-title">MyInvest</span>
        <FaMoneyBillWave />
      </div>

      <span className="app-header-desc">Dashboard</span>
    </header>
  );
};
