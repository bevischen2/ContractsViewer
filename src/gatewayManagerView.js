import React from 'react';
import {
  ContractMethodSend,
  ContractMethodCall,
  ContractMethodCallView,
  ContractMethodArrayCallView,
  ETHBalanceView,
} from './web3-helper';

class GatewayManagerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: props.contract,
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
        const text = '擁有者地址：' + data;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCallView {...props} />;
  }

  renderPauser() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Pausers',
      desc: 'pauser列表',
      method: 'pausers',
      indexes: [0, 1, 2].map((i) => [i]),
    };
    return <ContractMethodArrayCallView {...props} />;
  }

  renderTokenHub() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Token Hub',
      desc: 'Token Hub的合約地址',
      method: 'tokens',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderSignerHub() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Signer Hub',
      desc: 'Signer Hub的合約地址',
      method: 'signerHub',
      args: []
    };
    return <ContractMethodCallView {...props} />;
  }

  renderThreshold() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Threshold',
      desc: '最少需要多少Signer簽核',
      method: 'threshold',
      args: [],
    };
    const callView = <ContractMethodCallView{...props} />;

    props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      desc: 'set threshold',
      method: 'setThreshold',
      args: [
        {
          type: 'number',
          title: 'threshold',
          value: 0,
        },
      ],
    };
    const sendView = <ContractMethodSend {...props} />;

    return (
      <div>
        {callView}
        {/* {sendView} */}
      </div>
    );
  }

  renderDepositCount() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Deposit Count',
      desc: '用戶deposit eth、erc20、erc721執行完成的次數',
      method: 'depositCount',
      args: [],
    };
    return <ContractMethodCallView {...props} />;
  }

  renderDeposits() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Deposits',
      desc: '用戶存入資訊查詢',
      method: 'deposits',
      args: [
        {
          type: 'number',
          title: 'index',
          value: 0,
        },
      ],
      renderText: (data) => {
        const text = '存入者：' + data.owner + '\n' +
        '合約地址：' + data.token + '\n' +
        '合約標準：' + data.standard + '\n' +
        '數量/nft id: ' + data.number;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCall {...props} />;
  }

  renderWithdrawals() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      title: 'Withdrawals',
      desc: '用戶提領資訊查詢',
      method: 'withdrawals',
      args: [
        {
          type: 'number',
          title: 'withdrawal id',
          value: 0,
        },
      ],
      renderText: (data) => {
        if (data.recipient === '0x0000000000000000000000000000000000000000') { 
          return <div className='new-line'>此提領id尚未使用</div>;
        }

        const text = '提領者：' + data.recipient + '\n' +
        '合約地址：' + data.token + '\n' +
        '合約標準：' + data.standard + '\n' +
        '數量/nft id: ' + data.number;
        return <div className='new-line'>{text}</div>;
      }
    };
    return <ContractMethodCall {...props} />;
  }

  render() {
    return (
      <div>
        <h2>Gateway Manager</h2>
        <div>合約地址：{this.state.contract._address}</div>
        {this.renderETHBalance()}
        {this.renderOwner()}
        {this.renderPauser()}
        {this.renderTokenHub()}
        {this.renderSignerHub()}
        {this.renderThreshold()}
        {this.renderDepositCount()}
        {this.renderDeposits()}
        {this.renderWithdrawals()}
      </div>
    );
  }
}

export { GatewayManagerView };