import React ,{ useState,useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Button from "./components/Button";
import { checkNetwork } from "./utils/checkNetwork";
import { toastObj } from "./utils/toastObj";
import FlipperContract from "./contracts/flipper.json";
import "./App.css"
import Summary from "./components/Summary";
import Detail from "./components/Detail";
import Value from "./components/Value";

const FlipperContractAddress = FlipperContract.address;
const FlipperContractABI = FlipperContract.abi;

const NETWORK_ID = '2221';

function App() {
    const [isWalletConnected,setIsWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [selectedAddress,setSelectedAddress] = useState(null);
    const [val,setVal] = useState(null);

    const checkExtension = async()=>{
        if(window.ethereum == undefined){
          toast.info("No Wallet Detected!", toastObj);
            return false;
        }
        await initializeProviderAndSigner();
        return true;
    }

    const initializeProviderAndSigner = async()=>{
        let _provider = new ethers.providers.Web3Provider(window.ethereum);
        let _signer = _provider.getSigner(0);
        setProvider(_provider);
        setSigner(_signer);
    }

    const getValue = async()=>{
        const factoryContract = new ethers.Contract(
            FlipperContractAddress,
            FlipperContractABI,
            signer
          ); 

          try {
            const result = await factoryContract.getValue();
            console.log(result);
            setVal(result);
            toast("Fetched Successfully!", toastObj);
          } catch (error) {
            console.log(error)
            toast(error, toastObj);
          }
    }

    const toggleValue = async()=>{
        const factoryContract = new ethers.Contract(
            FlipperContractAddress,
            FlipperContractABI,
            signer
          ); 

          try {
            toast("Transaction Initiated!", toastObj);
            const result = await factoryContract.toggleValue();
            await getValue();
            toast("Transaction Successful!", toastObj);
          } catch (error) {
            toast(error, toastObj);
          }
    }

    const connectWallet = async()=>{
      console.log(checkNetwork(NETWORK_ID))
        if(checkExtension() && await checkNetwork(NETWORK_ID)==true){
          console.log("fuck yea")
          const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setSelectedAddress(selectedAddress);
          console.log(selectedAddress)
          setIsWalletConnected(true);
         
          await window.ethereum.on("accountsChanged",([newAddress])=>{
            toast(`Account Changed to ${newAddress}`,toastObj)
            setSelectedAddress(newAddress)
            console.log("account changed")
          })
          return;
        }
        toast(`Connect to Network Name: Kava EVM Testnet
        New RPC URL: https://evm.testnet.kava.io
        Chain ID: 2221
        Currency Symbol: KAVA
        Explorer URL: https://explorer.testnet.kava.io`,toastObj)
        
}

useEffect(() => {
  if(isWalletConnected){
    toast("Wallet Connected Successfully!", toastObj);
    getValue();
  }
}, [isWalletConnected])

    
  return (
    <div className="main">
    <Header/>
    {!isWalletConnected?
    <>
    <Summary/>
    <Button title="Connect Wallet " func={connectWallet}/>
    <ToastContainer/>
    </>
    :
    <>
    <Detail/>
    
    {val===null?"loading":
    <Value val = {val.toString().toUpperCase()}/>
    }
    <br />
    <div className="btns">

    <Button title="Get Value " func={getValue}/>
    <Button title="Toggle Value" func={toggleValue}/>
    </div>
    <ToastContainer/>
    </>
  }
    
    </div>
  )
}

export default App;