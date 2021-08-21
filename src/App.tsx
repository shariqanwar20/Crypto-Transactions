import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import {Main} from "./components/Main";
import React, { useEffect, useState } from "react";
import { getAccountBalance, sendTransaction } from "./Web3";
import Web3 from "web3";
import { tokenAddresses, tokenType, transactionType } from "./constants";

declare let window: any;

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState<tokenType>(tokenType.dai)
  const [walltetAddresses, setWalletAddresses] = useState([""]);

  /* connect to metamask and display balance based on the token selected */
  useEffect(() => {
    const connectToMetamask = async () => {
      /* check metamask installation */
      if (typeof window.ethereum !== undefined) {
        console.log("metamask is installed");
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        /* if user is already logged in get his balance */
        web3.eth.getAccounts().then(async (_walltetAddresses) => {
          if (_walltetAddresses.length > 0) {
            /* get user's balance */
            setBalance(await getAccountBalance(web3, _walltetAddresses[0],  token === tokenType.dai? tokenAddresses.dai.address : undefined));

            setWalletAddresses(_walltetAddresses);
          }
        });
      } else {
        console.log("Install metamask");
      }
    };
    connectToMetamask();
  }, [token]);

  const handleLogin = async () => {
    try {
      await window.ethereum.enable();
      /* get user's balance */
      setBalance(await getAccountBalance(web3!, walltetAddresses[0],  token === tokenType.dai? tokenAddresses.dai.address : undefined));
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (values: transactionType) => {
    console.log("transaction pending => ", values);
    await sendTransaction(
      web3!,
      walltetAddresses[0],
      values.toAddress,
      values.amountToSend,
      token === tokenType.dai? tokenAddresses.dai.address : undefined
    );
    setBalance(await getAccountBalance(web3!, walltetAddresses[0],  token === tokenType.dai? tokenAddresses.dai.address : undefined));
  };

  return (
    <>
      <Navbar handleLogin={handleLogin} balance={balance} />
      <Main handleSubmit={handleSubmit} setToken={setToken} />
      <Footer />
    </>
  );
}

export default App;
