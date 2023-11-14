import React, { useContext, useEffect, useState } from 'react'
import Uik from "@reef-chain/ui-kit";
import greeter from "../utils/Greeter.json";
import ReefStateContext from '../context/ReefStateContext';
import { ethers } from 'ethers';

function Greeter() {

    const {selectedReefSigner} = useContext(ReefStateContext)
    const [greeting,setGreeting] = useState('Hello world!');
    const [ value, setValue ] = useState("")
    const [ btnVal, setBtnVal ] = useState("Update Greeting")

 useEffect(()=>{
    const fetchGreeting=async()=>{
        const contractInstance = new ethers.Contract(greeter.address,greeter.abi,selectedReefSigner.signer);
        setGreeting(await contractInstance.greeting());
    }
    if(selectedReefSigner){
        fetchGreeting();
        const intervalId = setInterval(fetchGreeting, 10000);
        return () => clearInterval(intervalId);
    }
 },[selectedReefSigner])

 const updateGreeting = async()=>{
    if(selectedReefSigner){
        try {
            setBtnVal("Processing ...")
            const contractInstance = new ethers.Contract(greeter.address,greeter.abi,selectedReefSigner.signer);
        const res = await contractInstance.setGreeting(value);
        console.log(res);
        } catch (error) {
            console.log(error)
        }
        
    }
 }

  return (
    <Uik.Card title='Greeter' titlePosition='center' className='greeter-container'>
      <div className='greeter-heading'>
      This is a sample Greeter dApp , deployed <a href="https://testnet.reefscan.com/contract/0xb3a4D1e2C0872a69C280556474C56FE6898b6383">here</a>, you can update the value of greeting by inputting a text below and pressing the button!
        </div>  
 <Uik.Divider text='Greeting' />
      {greeting}

 <Uik.Divider text='Update Greeting' className='divider' />
 <Uik.Input
    label='Enter Greeting'
    value={value}
    onInput={e => setValue(e.target.value)}
  />
  <br />
  <Uik.Button text={btnVal} fill className='greeter-btn' onClick={updateGreeting}/>
    </Uik.Card>
  )
}

export default Greeter