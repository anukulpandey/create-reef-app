import React, { useContext, useState } from 'react'
import Uik from "@reef-chain/ui-kit";
import ReefStateContext from '../context/ReefStateContext';
import { utils } from '@reef-chain/react-lib';


function AccountPill() {
    const [isOpen, setOpen] = useState(false)
    const { selectedReefSigner,signers } = useContext(ReefStateContext);
  return (
    <>
    <Uik.Button text={utils.shortAddress(selectedReefSigner.address)} rounded fill size='small' onClick={()=>setOpen(true)}/>
    <Uik.AccountSelector
    isOpen={isOpen}
    accounts={signers}
    selectedAccount={selectedReefSigner}
    onClose={() => setOpen(false)}
    onSelect={account => selectAccount(account)}
  />
    </>
  )
}

export default AccountPill