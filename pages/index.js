import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors'
import { useState } from "react";

export default function Home() {
  const { activate } = useWeb3React();
  const [isConnected, setIsConnected] = useState(false);
  
  const connectWallet = async () => {
    try {
      if (!isConnected) {
        await activate(connectors.walletLink);
        setIsConnected(true);
      } else {
        alert("Wallet is already connected!")
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="my-div">
      { isConnected ?
        (
          <h3>Wallet has been successfully connecAed.</h3>
        ) : (
          <h3>Please connect wallet before continuing</h3>
        )
      }
      { !isConnected && <button onClick={() => connectWallet()} className="my-button">Connect Wallet</button> }
    </div>
  )
}