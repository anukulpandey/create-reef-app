import React, { useContext } from 'react';
import Uik from '@reef-chain/ui-kit';
import AccountPill from './AccountPill';
import ReefStateContext from '../context/ReefStateContext';
import {balanceUtils} from "@reef-chain/util-lib";
import { BigNumber } from 'ethers';

function Navbar(props) {
  const { selectedReefSigner } = useContext(ReefStateContext);

  return (
    <div className="navbar-container">
      <Uik.ReefLogo className='reef-logo' />
      <div className="accounts-pill">
        {props.isConnected ?<div className='navbar-switch'>
          <AccountPill/>
          <div className="navbar-balance">
          <Uik.ReefAmount value={selectedReefSigner?balanceUtils.toReefBalanceDisplay(selectedReefSigner.balance):'Loading'} />
          </div>
        </div>  :<></>}
      </div>
      
    </div>
  );
}

export default Navbar;
