import Web3 from "web3";

export const getEthBalance = async (web3: Web3) => {
    const accounts = await web3.eth.getAccounts();
    let balance = await web3.eth.getBalance(accounts[0]);
    return web3.utils.fromWei(balance, "ether");
}


