import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { getEthBalance } from "./Web3";
declare let window: any;

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const connectToMetamask = async () => {
      /* check metamask installation */
      if (typeof window.ethereum !== undefined) {
        console.log("metamask is installed");
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        /* if user is already logged in get his balance */
        web3.eth.getAccounts().then(async (accounts) => {
          if (accounts.length > 0) {
            /* get user's balance */
            setBalance(await getEthBalance(web3));
          }
        })
      } else {
        console.log("Install metamask");
      }
    };
    connectToMetamask();
  }, []);

  const handleLogin = async () => {
    try {
      await window.ethereum.enable();
      /* get user's balance */
      setBalance(await getEthBalance(web3!));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {balance}
        </a>
      </header>
      <button onClick={handleLogin}>Connect with metamask</button>
    </div>
  );
}

export default App;
