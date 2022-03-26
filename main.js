import Web3 from "web3";
import BigNumber from "bignumber.js";
BigNumber.config({EXPONENTIAL_AT: 32});
const web3 = new Web3(Web3.givenProvider || "https://rpc.bt.io");

// Тут меняем на свои адреса
const wallets = `0x0B6dE2FB2873cbf6220784BDB70F9d4388553621
0x01d20d116c45634a3ae51f134804273eb466c5ca
0x73568e787b9a0aa52c417536615ed647f8f5d895
0xaac40485171774a08a9c326d584e877ecf44fe87`;

const start = async () => {
  for (const wallet of wallets.split('\n')) {
    const balance = await web3.eth.getBalance(wallet.trim());
    console.log('Address:', wallet, 'Balance:', new BigNumber(balance).shiftedBy(-18).toFormat());
  }
};

start();
