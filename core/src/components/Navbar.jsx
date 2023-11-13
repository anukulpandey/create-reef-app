import React from 'react';
import Uik from '@reef-chain/ui-kit';

function Navbar(props) {
  return (
    <div className="navbar-container">
      <Uik.ReefLogo className='reef-logo' />
      <div className="accounts-pill">
        {props.isConnected ? <>Connected</> : <></>}
      </div>
    </div>
  );
}

export default Navbar;
