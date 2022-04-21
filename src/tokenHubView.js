import React from 'react';
import {
  ContractMethodSend,
  ContractMethodCall,
  ContractMethodCallView,
  ContractMethodDynamicArrayCallView,
  ContractMethodArrayCallView,
  ETHBalanceView,
} from './web3-helper';
import { renderAddress, renderVerifiedAddress } from './helper';

class TokenHubView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: props.contract,
      verifiedAddress: props.verifiedAddress,
      etherscanLink: props.etherscanLink,
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
        return <div>
          擁有者地址： {renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink)}
        </div>;
      }
    };
    return <ContractMethodCallView {...props} />;
  }

  render721Tokens() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: '721 Tokens',
      desc: '註冊的ERC721合約列表',
      sourceMethod: this.state.contract.methods.getCount(721),
      method: 'tokens',
      args: [721],
      renderText: (data) => {
        return renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink);
      }
    };
    return <ContractMethodDynamicArrayCallView {...props} />;
  }

  render20Tokens() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: '20 Tokens',
      desc: '註冊的ERC20合約列表',
      sourceMethod: this.state.contract.methods.getCount(20),
      method: 'tokens',
      args: [20],
      renderText: (data) => {
        return renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink);
      }
    };
    return <ContractMethodDynamicArrayCallView {...props} />;
  }

  renderContains() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Contains',
      desc: '檢查該合約是否註冊',
      method: 'contains',
      args: [
        {
          type: 'string',
          title: '合約地址',
          value: '',
        },
      ],
      renderText: (data) => {
        if (data) {
          return '該合約已註冊';
        } else {
          return '該合約尚未註冊';
        }
      }
    };
    return <ContractMethodCall {...props} />;
  }

  render() {
    return (
      <div>
        <h2>Token Hub</h2>
        <div>
          合約地址： {renderAddress(this.state.contract._address, this.state.etherscanLink)}
        </div>
        {this.renderOwner()}
        {this.render721Tokens()}
        {this.render20Tokens()}
        {this.renderContains()}
      </div>
    );
  }
}

export { TokenHubView };