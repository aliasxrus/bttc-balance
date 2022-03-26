import Web3 from "web3";
import BigNumber from "bignumber.js";
BigNumber.config({EXPONENTIAL_AT: 32});
const web3 = new Web3(Web3.givenProvider || "https://rpc.bt.io");

const keys = `41ce45ced3cc956761272ceb80482bffcc791012033c87bbd7af5ed808dc851c
989fac5b2823fdd2600cb9195043215c0234d942b9936505e076fbfbf38aafa4
ecef55ee7debb2eb413c94b2b9ef9d109c91077ea56d0cceba9e0a403d74c831`;

const start = async () => {
  for (const key of keys.split('\n')) {
    const account = web3.eth.accounts.privateKeyToAccount(key.trim());

    const balance = await web3.eth.getBalance(account.address);
    console.log('Address:', account.address, 'Key:', key);
    console.log('Balance:', new BigNumber(balance).shiftedBy(-18).toFormat(), '\n');
  }
};

start();
