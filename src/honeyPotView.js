import React from 'react';
import {
  ContractMethodSend,
  ContractMethodCall,
  ContractMethodCallView,
  ContractMethodArrayCallView,
  ETHBalanceView,
} from './web3-helper';
import { renderAddress, renderVerifiedAddress } from './helper';

class HoneyPotView extends React.Component {
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

  renderPC() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Polar Clash',
      desc: 'Polar Clash地址，breed的nft合約。',
      method: 'polarClash',
      args: [],
      renderText: (data) => {
        return <div>
          合約地址： {renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink)}
        </div>;
      }
    };
    return <ContractMethodCallView {...props} />;
  }

  renderGM() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Gateway Manager',
      desc: 'Gateway Manager地址，用來收取breed的hon。',
      method: 'gatewayManager',
      args: [],
      renderText: (data) => {
        return <div>
          合約地址： {renderVerifiedAddress(this.state.verifiedAddress, data, this.state.etherscanLink)}
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

  renderMaxSupply() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Max Supply',
      desc: '發行上限',
      method: 'maxSupply',
      args: []
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

  renderDecimals() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Decimals',
      desc: '小數位數',
      method: 'decimals',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderBreedConfigs() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Breed Configs',
      desc: 'Breed 購買設定',
      method: 'breedConfigs',
      indexes: [0, 1, 2, 3, 4].map((i) => [i]),
      renderText: (data) => {
        const quantity = data.nftQuantity;
        const price = data.hpPrice;
        const text = 'Polar Clash要求數量：' + quantity + '\n' +
          '價格：' + price + ' HON';
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodArrayCallView {...props} />;
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

  render() {
    return (
      <div>
        <h2>Honey Pot</h2>
        <div>
          合約地址： {renderAddress(this.state.contract._address, this.state.etherscanLink)}
        </div>
        {this.renderOwner()}
        {this.renderPausers()}
        {this.renderMinters()}
        {this.renderPC()}
        {this.renderGM()}
        {this.renderName()}
        {this.renderSymbol()}
        {this.renderMaxSupply()}
        {this.renderTotalSupply()}
        {this.renderDecimals()}
        {this.renderBreedConfigs()}
        {this.renderBalanceOf()}
      </div>
    );
  }
}

export { HoneyPotView };