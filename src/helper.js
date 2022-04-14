export function verifyAddress(verifiedAddress, address) {
  if (address === '0x0000000000000000000000000000000000000000') {
    return '尚未設定';
  } else if (address in verifiedAddress) {
    return address + ` [${verifiedAddress[address]}]`;
  } else {
    return address + ` [未知]`;
  }
}