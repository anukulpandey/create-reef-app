import React from 'react'
import {hooks} from "@reef-chain/react-lib";
import Uik from "@reef-chain/ui-kit";
import Navbar from './components/Navbar';
import ReefStateContext from './context/ReefStateContext';
import Greeter from './components/Greeter';

function App() {
  const {
    loading, error, signers, selectedReefSigner,
  } = hooks.useInitReefState(
    'Create Reef App', { },
  );

  return (
    <ReefStateContext.Provider value={{signers,selectedReefSigner}}>
    <div className='app'>
      <Navbar isConnected={signers && signers.length}/>
      <div className='body-container'>
      {error?<>
        <Uik.Card title='npx create-reef-app' titlePosition='center' className='container'>
      {error.code==1?
      <>
        <Uik.Text text={error.message}/>
        <br />
        <Uik.Button text='Download Extension' rounded fill size='large' onClick={()=>window.open(error.url, '_blank')}/>
      </>
       :<>
        {error.message}
      </>}
      </Uik.Card>
      </>:<>
      {loading?
    <div className="loader">
   <Uik.Loading/>
    </div>
   :<Greeter/>}
      </>}
      </div>
    </div>
    </ReefStateContext.Provider>
  )
}

export default App