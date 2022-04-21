
export const EtherscanLinks = {
  '1': 'https://etherscan.io/address/',
  '3': 'https://ropsten.etherscan.io/address/',
  '4': 'https://rinkeby.etherscan.io/address/',
  '5': 'https://goerli.etherscan.io/address/',
  '42': 'https://kovan.etherscan.io/address/',
  '137': 'https://polygonscan.com/address/',
  '80001': 'https://mumbai.polygonscan.com/address/',
  '56': 'https://bscscan.com/address/',
  '97': 'https://testnet.bscscan.com/address/',
};

export function renderAddress(address, etherscanLink) {
  return <span>
    {address}<br />
    <a href={etherscanLink + address} target="_blank">View on Etherscan</a>
  </span>;
}

export function renderVerifiedAddress(verifiedAddress, address, etherscanLink) {
  if (address === '0x0000000000000000000000000000000000000000') {
    return '尚未設定';
  } else if (address in verifiedAddress) {
    return <span>
      {address} [{verifiedAddress[address]}]<br />
      <a href={etherscanLink + address} target="_blank">View on Etherscan</a>
    </span>;
  } else {
    return <span>
      {address} <b>[未知]</b><br />
      <a href={etherscanLink + address} target="_blank">View on Etherscan</a>
    </span>;
  }
}

export function verifyAddress(verifiedAddress, address, etherscanLink) {
  if (address === '0x0000000000000000000000000000000000000000') {
    return '尚未設定';
  } else if (address in verifiedAddress) {
    return <span>
      <a href={etherscanLink + address} target="_blank">View on Etherscan</a>
      <br />{address} [{verifiedAddress[address]}]
    </span>;
  } else {
    return <span>
      <a href={etherscanLink + address} target="_blank">View on Etherscan</a>
      <br />{address} [未知]
    </span>;
  }
}