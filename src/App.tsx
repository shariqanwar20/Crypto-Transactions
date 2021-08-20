import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { getAccountBalance, sendTransaction } from "./Web3";
import { tokenAddresses } from "./constants";
import { Formik } from 'formik';
// const dotenv = require("dotenv")
// const { REACT_APP_PRIVATE_KEY_WALLET } = process.env

declare let window: any;

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [balance, setBalance] = useState("");
  const [walltetAddresses, setWalletAddresses] = useState([""])

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
            setBalance(await getAccountBalance(web3, _walltetAddresses[0]));
            setWalletAddresses(_walltetAddresses)
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
      setBalance(await getAccountBalance(web3!, walltetAddresses[0]));
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async(values: any) => {
    console.log("transaction pending => ", values);
    const transaction = await sendTransaction(web3!, walltetAddresses[0], values.toAddress, values.amountToSend)
    setBalance(await getAccountBalance(web3!, walltetAddresses[0]))
  }

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
        <Formik
      initialValues={{
        toAddress: "",
        amountToSend: 0
      }}
      // validationSchema={validationSchema}
      onSubmit={(values: any) => {
        handleSubmit(values)
      }}
    >
      {({ values, touched, errors, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
                  <input type="text" onChange={handleChange} value={values.toAddress} name="toAddress" placeholder="Enter address to send ether/dai" />
                  <input type="number" onChange={handleChange} value={values.amountToSend} name="amountToSend" placeholder="number of tokens to send" />
                  <button type="submit">
                    Send
                  </button>
                  </form>
      )}
      </Formik>

      </header>
      <button onClick={handleLogin}>Connect with metamask</button>
    </div>
  );
}

export default App;
