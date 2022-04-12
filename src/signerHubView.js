import React from 'react';
import {
  ContractMethodSend,
  ContractMethodCall,
  ContractMethodCallView,
  ContractMethodDynamicArrayCallView,
  ContractMethodArrayCallView,
  ETHBalanceView,
} from './web3-helper';

class SignerHubView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: props.contract,
      artifacts: props.artifacts,
    };
  }

  renderOwner() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Owner',
      desc: '合約擁有者',
      method: 'owner',
      args: [],
      renderText: (data) => {
        const text = '擁有者地址：' + data;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCallView {...props} />;
  }

  renderTokenHub() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Token Hub',
      desc: '設定的token hub',
      method: 'tokenHub',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderPCSigners() {
    const tokenAddress = this.state.artifacts.polarClash.address;
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Polar Clash Signers',
      desc: `token address: ${tokenAddress} [ Polar Clash ]\nPolar Clash 的簽署者`,
      sourceMethod: this.state.contract.methods.getCount(tokenAddress),
      method: 'getAt',
      args: [tokenAddress],
    };
    return <ContractMethodDynamicArrayCallView {...props} />;
  }

  renderPCASigners() {
    const tokenAddress = this.state.artifacts.polarClashAstro.address;
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Polar Clash Astro Signers',
      desc: `token address: ${tokenAddress} [ Polar Clash Astro ]\nPolar Clash Astro 的簽署者`,
      sourceMethod: this.state.contract.methods.getCount(tokenAddress),
      method: 'getAt',
      args: [tokenAddress],
    };
    return <ContractMethodDynamicArrayCallView {...props} />;
  }

  renderHONSigners() {
    const tokenAddress = this.state.artifacts.honeyPot.address;
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Honey Pot Signers',
      desc: `token address: ${tokenAddress} [ Honey Pot ]\nHoney Pot 的簽署者`,
      sourceMethod: this.state.contract.methods.getCount(tokenAddress),
      method: 'getAt',
      args: [tokenAddress],
    };
    return <ContractMethodDynamicArrayCallView {...props} />;
  }

  renderContains() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Contains',
      desc: '檢查該簽署者是否註冊',
      method: 'contains',
      args: [
        {
          type: 'string',
          title: '合約地址',
          value: '',
        },
        {
          type: 'string',
          title: '簽署者地址',
          value: '',
        },
      ],
      renderText: (data) => {
        if (data) {
          return '該簽署者已註冊';
        } else {
          return '該簽署者尚未註冊';
        }
      }
    };
    return <ContractMethodCall {...props} />;
  }

  render() {
    return (
      <div>
        <h2>Signer Hub</h2>
        <div>合約地址：{this.state.contract._address}</div>
        {this.renderOwner()}
        {this.renderTokenHub()}
        {this.renderPCSigners()}
        {this.renderPCASigners()}
        {this.renderHONSigners()}
        {this.renderContains()}
      </div>
    );
  }
}

export { SignerHubView };