import Web3 from "web3";
import { tokenABI } from "../constants";

/* get ether token balancein your wallet */
// export const getEthBalance = async (web3: Web3, walletAddress: string) => {
//   let balance = await web3.eth.getBalance(walletAddress);
//   return web3.utils.fromWei(balance, "ether");
// };

/* get any ERC-20 token balance in your wallet */
export const getAccountBalance = async (
  web3: Web3,
  walletAddress: string,
  contractAddress?: string
) => {
    if (contractAddress === undefined) {
        let balance = await web3.eth.getBalance(walletAddress);
        return web3.utils.fromWei(balance, "ether");
    }
    else {
        const contract = new web3.eth.Contract(tokenABI, contractAddress);
        const balance = await contract.methods.balanceOf(walletAddress).call();
        return web3.utils.fromWei(balance.toString());
    }

};

export const sendTransaction = async (
  web3: Web3,
  walletAddress: string,
  toAddress: string,
  amountToSend: number,
  contractAddress?: string
) => {
  let trans: any, contract: any;
  if (contractAddress !== undefined) {
    contract = new web3.eth.Contract(tokenABI, contractAddress);
  }

  let currentBalance: string = await getAccountBalance(web3, walletAddress, contractAddress)

  if (Number(currentBalance) > amountToSend) {
    contractAddress !== undefined
      ? (trans = await contract.methods
          .transfer(toAddress, web3.utils.toWei(amountToSend.toString()))
          .send({ from: walletAddress }))
      : (trans = await web3.eth.sendTransaction({
          to: toAddress,
          from: walletAddress,
          value: web3.utils.toWei(amountToSend.toString()),
        }));
    console.log("amount send => ", trans);
    return trans;
  } else {
    console.log("not enough balance");
  }
};
