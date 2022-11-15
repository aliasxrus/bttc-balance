import {ethers} from "ethers";
const provider = new ethers.providers.JsonRpcProvider('https://rpc.bt.io');

// Тут меняем на свои адреса
const wallets = `0x0B6dE2FB2873cbf6220784BDB70F9d4388553621
0x01d20d116c45634a3ae51f134804273eb466c5ca
0x73568e787b9a0aa52c417536615ed647f8f5d895
0xaac40485171774a08a9c326d584e877ecf44fe87`;

// При необходимости пополнить балансы:
// 1. Укажите приватный ключ кошелька откуда производить перевод
const privateKey = '1000000000000000000000000000000000000000000000000000000000000000';

// 2. Сумму перевода в BTT
const amount = 10000;

// 3. Переводить если баланс BTT меньше данной суммы (для отключения указать -1)
const minBalance = -1;

const start = async () => {
  const signer = new ethers.Wallet(privateKey, provider);

  for (const wallet of wallets.split('\n')) {
    let balance = await provider.getBalance(wallet.trim());
    console.log('Address:', wallet, 'Balance:', ethers.utils.commify(ethers.utils.formatEther(balance.toString())));

    if (minBalance === -1 || balance.gt(ethers.utils.parseUnits(String(minBalance)).toString())) continue;
    const {from, to} = await signer.sendTransaction({
      to: wallet.trim(),
      value: ethers.utils.parseEther(String(amount)),
    });

    console.log('Transfer:', amount, from, '->', to)
  }
};

start();
