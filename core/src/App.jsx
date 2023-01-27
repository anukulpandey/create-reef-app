import React ,{ useState,useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Button from "./components/Button";
import { checkNetwork } from "./utils/checkNetwork";
import { toastObj } from "./utils/toastObj";
import GreeterContract from "./contracts/greeter.json";
import "./App.css"
import Summary from "./components/Summary";
import Detail from "./components/Detail";
import Value from "./components/Value";

const GreeterContractAddress = GreeterContract.address;
const GreeterContractABI = GreeterContract.abi;

const NETWORK_ID = '97';

function App() {
    const [isWalletConnected,setIsWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [selectedAddress,setSelectedAddress] = useState(null);
    const [val,setVal] = useState(null);
    const [inputVal,setInputVal] = useState("");

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

    const getMessage = async()=>{
      console.log("clicked me");
        const factoryContract = new ethers.Contract(
            GreeterContractAddress,
            GreeterContractABI,
            signer
          ); 
          console.log(await factoryContract);
          try {
            console.log("i am here")
            const result = await factoryContract.getMessage();
            console.log("result",result);
            setVal(result);
            toast("Fetched Successfully!", toastObj);
          } catch (error) {
            console.log(error)
            toast(error, toastObj);
          }
    }

    const setMessage = async()=>{
        const factoryContract = new ethers.Contract(
            GreeterContractAddress,
            GreeterContractABI,
            signer
          ); 

          try {
            toast("Transaction Initiated!", toastObj);
            const result = await factoryContract.setMessage(inputVal);
            await getMessage();
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
        toast(`Connect to Network Name: BNB Testnet
        New RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
        Chain ID: 97
        Currency Symbol: BNB
        Explorer URL: https://testnet.bscscan.com`,toastObj)
        
}

useEffect(() => {
  if(isWalletConnected){
    toast("Wallet Connected Successfully!", toastObj);
    getMessage();
  }
}, [isWalletConnected])

    
  return (
    <div className="main">
    <Header/>
    {!isWalletConnected?
    <>
    <br />
    <br />
    <Summary/>
    <br /><br />
    <Button title="Connect Wallet " func={connectWallet}/>
    <ToastContainer/>
    </>
    :
    <>
    <Detail detail="MESSAGE"/>
    {val===null?"loading":
    <Value val = {val}/>
    }
   
    <Detail detail="SET MESSAGE"/>
    <input className="setMsg" type="text" onChange={e=>setInputVal(e.target.value)} />
    <br />
    <div className="btns">
    <Button title="Get Message " func={getMessage}/>
    <Button title="Set Message" func={setMessage}/>
    </div>
    <ToastContainer/>
    </>
  }
    </div>
  )
}

export default App;