import React, { useEffect, useState } from 'react'
import { web3Enable ,web3Accounts } from "@polkadot/extension-dapp";
import { reefState ,network,tokenUtil} from '@reef-chain/util-lib';
import Uik from "@reef-chain/ui-kit";
import axios from 'axios';
import { getGqlUrl } from './utils/gqlUtils';
import { parseAccounts } from './utils/accountUtils';

function App() {
  
  const [isAccountSelectorOpen, setAccountSelector] = useState(false)
  const [allAccounts,setAllAccounts] = useState([]);
  const [selectedNetwork,setSelectedNetwork] = useState('testnet');
  const [selectedProvider,setSelectedProvider] = useState(undefined);
  const [ isMainnet, setIsMainnet ] = useState(false);
  const [selectedAddress,setSelectedAddress]=useState(null);
  const [currentBalance,setCurrentBalance] = useState("fetching...");
  const [page, setPage] = useState(1);
  const [data,setData] = useState([])
  const [nfts,setNfts] = useState([]);

  useEffect(()=>{
    const initReefState =async ()=>{

      let allExtensions = await web3Enable("Reef");
      let injectedSigner = undefined;

      if(allExtensions[0] && allExtensions[0].signer) injectedSigner = allExtensions[0].signer;

      const _allAccounts = await web3Accounts();
      setAllAccounts(_allAccounts);

      reefState.initReefState({
        network:network.AVAILABLE_NETWORKS[selectedNetwork],
        jsonAccounts:{
          accounts:_allAccounts,
          injectedSigner
        }
      })

      setSelectedAddress(_allAccounts[0].address);
      reefState.setSelectedAddress(_allAccounts[0].address);
    }
    
    initReefState();
  },[selectedNetwork,selectedProvider])

  useEffect(()=>{
    try {
      reefState.selectedProvider$.subscribe(provider=>setSelectedProvider(provider));
    } catch (error) {
      console.log(error)
    }
  },[selectedNetwork])

  const toggleNetwork =()=>{
    if(selectedNetwork==='mainnet'){
      reefState.setSelectedNetwork(network.AVAILABLE_NETWORKS.testnet);
      setSelectedNetwork('testnet')
      setIsMainnet(false);
    }else{
      reefState.setSelectedNetwork(network.AVAILABLE_NETWORKS.mainnet);
      setSelectedNetwork('mainnet')
      setIsMainnet(true);
    }
  }


  useEffect(()=>{
    const fetchAccountBalance = async()=>{
      const accountBalanceQry = `query accountBalanceQry {
        accounts(limit: 1, where: {id_eq: "${selectedAddress}"}) {
          availableBalance
        }
      }`;
  
      try {
        const qryRes = await axios.post(getGqlUrl(selectedNetwork),{query:accountBalanceQry});
        setCurrentBalance((qryRes.data.data.accounts[0].availableBalance/10**18).toString().split(".")[0])
      } catch (error) {
      }
    }
    const fetchTokens = async()=>{
      try {
        reefState.selectedTokenBalances$.subscribe(val=>{
          setData(val);
        })
      } catch (error) {
      }
    }
    const fetchNfts = async()=>{
      try {
        reefState.selectedNFTs$.subscribe(val=>{
         setNfts(val)
         console.log(val)
        })
      } catch (error) {
      }
    }
    fetchAccountBalance();
    fetchTokens();
    fetchNfts();
    
  },[selectedAddress,selectedNetwork])

  return (
    <>
    <div className='balance-account-selector'>
    <Uik.Button
    className='balance-account-selector-btn'
  rounded
    size="large"
    text={allAccounts.map((val)=>{
      if(val.address===selectedAddress){
        return <div key={val.address}>
          {val.meta.name}
        </div>
      }
    })}
    fill
    onClick={() => setAccountSelector(true)}
  />
    <Uik.ReefAmount value={currentBalance + " REEF"} />
    </div>
<div className='toggle-switch'>
<Uik.ReefLogo />
{/* <Uik.Text text='Dashboard' type='title' className='toggle-switch-title'/> */}
</div>


  <Uik.AccountSelector
    isOpen={isAccountSelectorOpen}
    accounts={parseAccounts(allAccounts)}
    selectedAccount={allAccounts.filter(item=>item.address==selectedAddress)[0]}
    onClose={() => setAccountSelector(false)}
    onSelect={account => {
      setSelectedAddress(account.address);
      reefState.setSelectedAddress(account.address);
      setAccountSelector(false);
    }}
  />
  <div className='assets-table'>
    <br />
    <div className='headline-toggle'>
  <Uik.Text text='Your digital assets' type='title' className='headline-toggle-headline'/>
  <Uik.Toggle
    onText='Mainnet'
    offText='Testnet'
    // label='Toggle Network'
    value={isMainnet}
    onChange={toggleNetwork}
  />
    </div>
  <br />
  {data!=null ?
  <div className='table-and-nfts'>
  <Uik.Table
  className='table-and-nfts__table'
    seamless
    pagination={{
      current: page,
      count: 2,
      onChange: setPage
    }}
  >
    <Uik.THead>
      <Uik.Tr>
        <Uik.Th>Icon</Uik.Th>
        <Uik.Th>Name</Uik.Th>
        <Uik.Th>Symbol</Uik.Th>
        <Uik.Th>Balance</Uik.Th>
      </Uik.Tr>
    </Uik.THead>

    <Uik.TBody>
      {
        data && data.map(item => (
          <Uik.Tr key={item}>
            
           <Uik.Td ><Uik.Avatar image={item.iconUrl} size="small"/></Uik.Td>
           <Uik.Td >{ item.name}</Uik.Td>
           <Uik.Td >{ item.symbol}</Uik.Td>
           <Uik.Td >{ typeof item.balance === "string"? item.balance : parseInt(item.balance._hex,16)/10**18}</Uik.Td>
          </Uik.Tr>
        ))
      }
    </Uik.TBody>
  </Uik.Table>
  <div className='table-and-nfts__nfts'>
      {nfts && nfts.map((val)=>{
        return <div key={val.address}>
        <Uik.Avatar image={val.iconUrl} size="extra-large"/>
        </div>
      })}
    </div>
    </div>:
  <>
  <Uik.Loading text='fetching assets...'/>
  </>
  }
  </div>
  
    </>
  )
}

export default App