import React from 'react'

function Summary() {
  return (
    <div className='summary'>
      <p><span className='highlight'>Kava</span> is an open-source, multi-chain DeFi platform that enables the creation of dApps and the issuance of stablecoins. It is built on the Cosmos Network, which is a decentralized network of independent parallel blockchains.</p>

<p><span className='highlight'>Flipper Dapp</span>  is a simple <span className='highlight'>dApp</span> built on the <span className='highlight'>Kava testnet</span>. It allows users to flip a digital value . This Dapp is a good example of how smart contracts can be used to create simple yet powerful dapps. The smart contract code is executed on the Kava blockchain, which ensures that the value flipping process is trustless and transparent.</p>

<p>The Dapp allows anyone to interact with the smart contract by using a web3-enabled browser such as <span className='highlight'>MetaMask</span>. The user can flip the value by sending a transaction to the smart contract address on the Kava blockchain. The transaction is then validated and executed by the Kava blockchain, which updates the value stored in the smart contract.</p>
    </div>
  )
}

export default Summary
