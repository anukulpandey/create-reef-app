export const checkNetwork = async(NETWORK_ID)=>{
    if(window.ethereum.networkVersion === NETWORK_ID) return true;
    return false;
}