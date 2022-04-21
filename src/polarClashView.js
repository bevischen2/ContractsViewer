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

class PolarClashView extends React.Component {
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

  renderPausers() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Pausers',
      desc: 'pauser列表',
      method: 'pausers',
      indexes: [0, 1, 2].map((i) => [i]),
      renderText: (data) => {
        return renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink);
      }
    };
    return <ContractMethodArrayCallView {...props} />;
  }

  renderMinters() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Minters',
      desc: 'minter列表',
      method: 'minters',
      indexes: [0, 1, 2].map((i) => [i]),
      renderText: (data) => {
        return renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink);
      }
    };
    return <ContractMethodArrayCallView {...props} />;
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

  renderPublicSeriesConfig() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Public Series Config',
      desc: '公售設定',
      method: 'seriesConfig',
      indexes: [0, 1, 2, 3].map((i) => [0, i]),
      renderText: (data) => {
        const startTime = data.startTime !== '0' ? `${new Date(data.startTime * 1000)}` : '尚未設置';
        const endTime = data.endTime !== '0' ? `${new Date(data.endTime * 1000)}` : '無限制';
        const price = this.state.web3.utils.fromWei(data.price) + ' ethers';
        const text = '開始id：' + data.startId + '\n' +
          '最大數量：' + data.maxSize + '\n' +
          '開始時間：' + startTime + '\n' +
          '結束時間：' + endTime + '\n' +
          '價格：' + price;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodArrayCallView {...props} />;
  }

  renderBreederSeriesConfig() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Breeder Series Config',
      desc: 'Breed販售設定',
      method: 'seriesConfig',
      indexes: [0, 1, 2, 3, 4].map((i) => [1, i]),
      renderText: (data) => {
        const startTime = data.startTime !== '0' ? `${new Date(data.startTime * 1000)}` : '尚未設置';
        const endTime = data.endTime !== '0' ? `${new Date(data.endTime * 1000)}` : '無限制';
        const price = this.state.web3.utils.fromWei(data.price) + ' ethers';
        const text = '開始id：' + data.startId + '\n' +
          '最大數量：' + data.maxSize + '\n' +
          '開始時間：' + startTime + '\n' +
          '結束時間：' + endTime;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodArrayCallView {...props} />;
  }

  renderPublicSeriesMintedCount() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Public Series Minted Count',
      desc: '公售系列已販售數量',
      method: 'seriesMintedCount',
      indexes: [0, 1, 2, 3].map((i) => [0, i]),
    };
    return <ContractMethodArrayCallView {...props} />;
  }

  renderBreedSeriesMintedCount() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Breed Series Minted Count',
      desc: 'Breed系列已販售數量',
      method: 'seriesMintedCount',
      indexes: [0, 1, 2, 3, 4].map((i) => [1, i]),
    };
    return <ContractMethodArrayCallView {...props} />;
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
        return <div className='new-line'>
          <span>
            單次mint最大數量：{data.maxBatchSize}<br />
            Breeder： {renderVerifiedAddress(this.state.verifiedAddress, data.breeder, this.state.etherscanLink)}
          </span>
        </div>;
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
        <h2>Polar Clash</h2>
        <div>
          合約地址： {renderAddress(this.state.contract._address, this.state.etherscanLink)}
        </div>
        {this.renderETHBalance()}
        {this.renderOwner()}
        {this.renderPausers()}
        {this.renderMinters()}
        {this.renderName()}
        {this.renderSymbol()}
        {this.renderSaleConfig()}
        {this.renderPublicSeriesConfig()}
        {this.renderBreederSeriesConfig()}
        {this.renderPublicSeriesMintedCount()}
        {this.renderBreedSeriesMintedCount()}
        {this.renderTokensOfOwner()}
        {this.renderTotalSupply()}
        {this.renderBalanceOf()}
        {this.renderOwnerOf()}
        {this.renderTokenURI()}
      </div>
    );
  }
}

export { PolarClashView };