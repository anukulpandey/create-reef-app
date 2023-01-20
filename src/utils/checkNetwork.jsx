export const checkNetwork = async(NETWORK_ID)=>{
    if(window.ethereum.networkVersion === NETWORK_ID) return true;
    // alert("Please connect Metamask to "+ NETWORK_ID);
    return false;
}