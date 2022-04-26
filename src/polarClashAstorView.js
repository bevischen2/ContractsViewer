import React from 'react';
import {
  ContractMethodSend,
  ContractMethodCall,
  ContractMethodDynamicArrayCall,
  ContractMethodCallView,
  ContractMethodArrayCallView,
  ContractMethodDynamicArrayCallView,
  ETHBalanceView,
} from './web3-helper';
import { renderAddress, renderVerifiedAddress } from './helper';

class PolarClashAstroView extends React.Component {
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

  renderETHBalance() {
    let props = {
      web3: this.state.web3,
      account: this.state.contract._address,
    };
    return <ETHBalanceView {...props} />;
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

  renderName() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Name',
      desc: '合約Name',
      method: 'name',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderSymbol() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Symbol',
      desc: '合約Symbol',
      method: 'symbol',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderSaleConfig() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Sale Config',
      desc: '販售設定',
      method: 'saleConfig',
      args: [],
      renderText: (data) => {
        const startTime = data.saleStartTime !== '0' ? `${new Date(data.saleStartTime * 1000)}` : '尚未設置';
        const endTime = data.saleEndTime !== '0' ? `${new Date(data.saleEndTime * 1000)}` : '無限制';
        const price = this.state.web3.utils.fromWei(data.price) + ' ethers';
        const text = '最大數量：' + data.maxSize + '\n' +
          '開始時間：' + startTime + '\n' +
          '結束時間：' + endTime + '\n' +
          '價格：' + price;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCallView {...props} />;
  }

  renderTotalSupply() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Total Supply',
      desc: '目前mint數量',
      method: 'totalSupply',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderWhitelist() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Whitelist',
      desc: '白名單查詢',
      method: 'whitelist',
      args: [
        {
          type: 'string',
          title: '用戶地址',
          value: '',
        },
      ],
      renderText: (data) => {
        const text = '該用戶剩餘可鑄造數量：' + data;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCall {...props} />;
  }

  renderBalanceOf() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Balance Of',
      desc: '用戶擁有的nft數量',
      method: 'balanceOf',
      args: [
        {
          type: 'string',
          title: '用戶地址',
          value: '',
        },
      ],
      renderText: (data) => {
        const text = '數量: ' + data;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCall {...props} />;
  }

  renderOwnerOf() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Owner Of',
      desc: '該nft的擁有者',
      method: 'ownerOf',
      args: [
        {
          type: 'number',
          title: 'nft id',
          value: 0,
        },
      ],
      renderText: (data) => {
        const text = '擁有者地址： ' + data;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCall {...props} />;
  }

  renderTokenURI() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Token URI',
      desc: '該nft metadata的網址',
      method: 'tokenURI',
      args: [
        {
          type: 'number',
          title: 'nft id',
          value: 0,
        },
      ]
    };
    return <ContractMethodCall {...props} />;
  }

  renderTokensOfOwner() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Tokens Of Owner',
      desc: '查詢用戶的nft列表',
      sourceMethod: this.state.contract.methods.balanceOf,
      method: 'tokenOfOwnerByIndex',
      args: [
        {
          type: 'string',
          title: '用戶地址',
          value: '',
        },
      ],
    };
    return <ContractMethodDynamicArrayCall {...props} />;
  }

  render() {
    return (
      <div>
        <h2>Polar Clash Astro</h2>
        <div>
          合約地址： {renderAddress(this.state.contract._address, this.state.etherscanLink)}
          &nbsp;&nbsp;
          <a href='https://opensea.io/collection/polar-clash-astro' target='_blank' rel="noreferrer">
            View on OpenSea
          </a>
        </div>
        {this.renderETHBalance()}
        {this.renderOwner()}
        {this.renderName()}
        {this.renderSymbol()}
        {this.renderSaleConfig()}
        {this.renderTotalSupply()}
        {this.renderWhitelist()}
        {this.renderTokensOfOwner()}
        {this.renderBalanceOf()}
        {this.renderOwnerOf()}
        {this.renderTokenURI()}
      </div>
    );
  }
}

export { PolarClashAstroView };