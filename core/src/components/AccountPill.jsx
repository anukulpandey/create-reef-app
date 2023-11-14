import React, { useContext, useState } from 'react'
import Uik from "@reef-chain/ui-kit";
import ReefStateContext from '../context/ReefStateContext';
import { availableNetworks, utils,hooks } from '@reef-chain/react-lib';
import { reefState } from '@reef-chain/util-lib';


function AccountPill() {
  
    const [isOpen, setOpen] = useState(false)
    const { selectedReefSigner,signers } = useContext(ReefStateContext);

    const selectNetwork = (key)=> {
      const toSelect = availableNetworks[key];
      reefState.setSelectedNetwork(toSelect);
  };

  const selectAccount = (account)=>{
    reefState.setSelectedAddress(account.address)
  }

  const selectedNetwork = hooks.useObservableState(reefState.selectedNetwork$);

  return (
    <div className='account-pill-btn'>
    <Uik.Button text={selectedReefSigner.name} rounded fill size='small' onClick={()=>setOpen(true)} className='account-pill-btn-name'/>
    <Uik.Button text={utils.shortAddress(selectedReefSigner.address)} rounded size='small' onClick={()=>setOpen(true)} className='account-pill-btn-address'/>
    <Uik.AccountSelector
    isOpen={isOpen}
    accounts={signers}
    selectedAccount={selectedReefSigner}
    onNetworkSelect={selectNetwork}
    selectedNetwork={selectedNetwork?selectedNetwork.name:availableNetworks.mainnet.name}
    onClose={() => setOpen(false)}
    onSelect={account => selectAccount(account)}
  />
    </div>
  )
}

export default AccountPill