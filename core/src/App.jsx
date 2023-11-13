import React from 'react'
import {hooks} from "@reef-chain/react-lib";
import Uik from "@reef-chain/ui-kit";
import Navbar from './components/Navbar';

function App() {
  const {
    loading, error, signers, selectedReefSigner,
  } = hooks.useInitReefState(
    'Create Reef App', { },
  );
  console.log(loading)
  return (
    <div className='app'>
      <Navbar isConnected={signers && signers.length}/>
      {loading?
    <div className="loader">
   <Uik.Loading/>
    </div>
   :<>Not loading</>}
    </div>
  )
}

export default App