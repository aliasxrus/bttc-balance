import fetch from 'node-fetch';
import BigNumber from "bignumber.js";
BigNumber.config({EXPONENTIAL_AT: 32});

// Тут меняем на свои URL
const btfsUrls = `http://127.0.0.1:8080
http://127.0.0.1:8081`;

const start = async () => {
  for (const btfs of btfsUrls.split('\n')) {
    try {
      await getInfo(btfs);
    } catch (e) {
      console.error('ERROR:', btfs + '/dashboard', e);
    }
  }
};

const getInfo = async btfsUrl => {
  const id = await fetch(`${btfsUrl}/api/v1/id`, {
    method: 'POST',
  })
      .then(res => res.json());

  const info = await fetch(`${btfsUrl}/api/v1/storage/stats/info?l=false`, {
    method: 'POST',
  })
      .then(res => res.json());

  const version = await fetch(`${btfsUrl}/api/v1/version`, {
    method: 'POST',
  })
      .then(res => res.json());

  const bttbalance = await fetch(`${btfsUrl}/api/v1/cheque/bttbalance?arg=${id.BttcAddress}`, {
    method: 'POST',
  })
      .then(res => res.json());

  const host = await fetch(`${btfsUrl}/api/v1/storage/contracts/list/host`, {
    method: 'POST',
  })
      .then(res => res.json());

  const list = await fetch(`${btfsUrl}/api/v1/settlement/list`, {
    method: 'POST',
  })
      .then(res => res.json());


  console.log(`BTFS:`, `${btfsUrl}/dashboard`);
  console.log(`ID:`, id.ID, 'Version:', version.Version, 'System:', version.System);
  console.log(`Host score:`, info.host_stats ? info.host_stats.score : '-', 'ChainID:', id.ChainID, 'Contracts:', host.contracts.length);
  if (info.host_stats) {
    console.log(`Storage GB cap:`, parseFloat(info.host_stats.storage_cap / 1024 / 1024 / 1024).toFixed(2), 'Used:', parseFloat(info.host_stats.storage_used / 1024 / 1024 / 1024).toFixed(2));
  }
  console.log(`BttcAddress:`, id.BttcAddress, 'BTT balance:', new BigNumber(bttbalance.balance).shiftedBy(-18).toFormat());
  console.log(`VaultAddress:`, id.VaultAddress, 'Uncashed WBTT:', new BigNumber(list.totalReceived).shiftedBy(-18).toFormat());
  console.log();
}

start();
