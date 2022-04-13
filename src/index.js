import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import { PolarClashAstroView } from './polarClashAstorView';
import { PolarClashView } from './polarClashView';
import { GatewayManagerView } from './gatewayManagerView';
import { HoneyPotView } from './honeyPotView';
import { SignerHubView } from './signerHubView';
import { TokenHubView } from './tokenHubView';

import { Tabs } from 'react-simple-tabs-component'
// (Optional) if you don't want to include bootstrap css stylesheet
import 'react-simple-tabs-component/dist/index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      chainId: null,
      accounts: [],
      web3: null,
      artifacts: {
        gatewayManager: null,
        polarClashAstro: null,
        polarClash: null,
        honeyPot: null,
        signerHub: null,
        tokenHub: null,
      },
      contracts: {
        gatewayManager: null,
        polarClashAstro: null,
        polarClash: null,
        honeyPot: null,
        signerHub: null,
        tokenHub: null,
      }
    };

    // binding actions
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
  }

  async componentDidMount() {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();

    await this.detectMetamaskEthereumProvider(provider);
    provider.on('chainChanged', this.handleChainChanged);

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    provider.on('accountsChanged', this.handleAccountsChanged);

    await this.loadContracts();
  }

  async detectMetamaskEthereumProvider(provider) {
    if (provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      } else {
        this.state.provider = provider;
        this.state.web3 = new Web3(provider);
        const chainId = await provider.request({ method: 'eth_chainId' })
        this.state.chainId = this.state.web3.utils.hexToNumber(chainId);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  }

  handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();

    console.log('handleChainChanged: ' + _chainId);
    console.log(this.state.web3.utils.hexToNumber(_chainId));
  }

  // For now, 'eth_accounts' will continue to always return an array
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');

      this.setState({ accounts: [] });
    } else if (accounts !== this.state.accounts) {
      this.setState({ accounts: accounts });
      // Do any other work!
    }
  }

  connect() {
    this.state.provider
      .request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  async loadContracts() {
    // load artifacts.
    let aritfactsURL;
    switch (this.state.chainId) {
      case 80001:
        aritfactsURL = './polygonMumbai.network.json';
        break;
      case 3:
        aritfactsURL = './ropsten.network.json';
        break;
      case 4:
        aritfactsURL = './rinkeby.network.json';
        break;
      default:
        break
    }
    let res = await fetch(aritfactsURL, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const artifacts = await res.json();

    // load contract.
    const web3 = this.state.web3;
    let artifact = artifacts.contracts.GatewayManager;
    this.state.artifacts.gatewayManager = artifact;
    this.state.contracts.gatewayManager = new web3.eth.Contract(artifact.abi, artifact.address);
    artifact = artifacts.contracts.PolarClashAstro;
    this.state.artifacts.polarClashAstro = artifact;
    this.state.contracts.polarClashAstro = new web3.eth.Contract(artifact.abi, artifact.address);
    artifact = artifacts.contracts.PolarClash;
    this.state.artifacts.polarClash = artifact;
    this.state.contracts.polarClash = new web3.eth.Contract(artifact.abi, artifact.address);
    artifact = artifacts.contracts.HoneyPot;
    this.state.artifacts.honeyPot = artifact;
    this.state.contracts.honeyPot = new web3.eth.Contract(artifact.abi, artifact.address);
    artifact = artifacts.contracts.SignerHub;
    this.state.artifacts.signerHub = artifact;
    this.state.contracts.signerHub = new web3.eth.Contract(artifact.abi, artifact.address);
    artifact = artifacts.contracts.TokenHub;
    this.state.artifacts.tokenHub = artifact;
    this.state.contracts.tokenHub = new web3.eth.Contract(artifact.abi, artifact.address);
  }

  renderTabs() {
    const tabs = [
      () => {
        return (
          <div>{this.rendePolarClashAstro()}</div>
        )
      },
      () => {
        return (
          <div>{this.rendePolarClash()}</div>
        )
      },
      () => {
        return (
          <div>{this.renderGatewayManager()}</div>
        )
      },
      () => {
        return (
          <div>{this.renderHoneyPot()}</div>
        )
      },
      () => {
        return (
          <div>{this.renderSignerHub()}</div>
        )
      },
      () => {
        return (
          <div>{this.renderTokenHub()}</div>
        )
      },
    ]

    return [
      {
        label: 'Polar Clash Astro',
        Component: tabs[0]
      },
      {
        label: 'Polar Clash',
        Component: tabs[1]
      },
      {
        label: 'Gateway Manager',
        Component: tabs[2]
      },
      {
        label: 'Honey Pot',
        Component: tabs[3]
      },
      {
        label: 'Signer Hub',
        Component: tabs[4]
      },
      {
        label: 'Token Hub',
        Component: tabs[5]
      },
    ]
  }

  rendePolarClashAstro() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.polarClashAstro,
    };
    return <PolarClashAstroView {...props} />;
  }

  rendePolarClash() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.polarClash,
      artifacts: this.state.artifacts,
    };
    return <PolarClashView {...props} />;
  }

  renderGatewayManager() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.gatewayManager,
      artifacts: this.state.artifacts,
    };
    return <GatewayManagerView {...props} />;
  }

  renderHoneyPot() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.honeyPot,
      artifacts: this.state.artifacts,
    };
    return <HoneyPotView {...props} />;
  }

  renderSignerHub() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.signerHub,
      artifacts: this.state.artifacts,
    };
    return <SignerHubView {...props} />;
  }

  renderTokenHub() {
    let props = {
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contracts.tokenHub,
      artifacts: this.state.artifacts,
    };
    return <TokenHubView {...props} />;
  }

  render() {
    if (!this.state.provider || this.state.accounts.length === 0) {
      return (
        <div>
          v1.0.13
          <br />
          <button onClick={async () => { this.connect() }} >Connect</button>
        </div>
      );
    }

    return (
      <div>
        <div>Connected. {this.state.accounts[0]}</div>
        <Tabs tabs={this.renderTabs()} />
      </div>
    );
  }
}

// ========================================

createRoot(document.getElementById('root')).render(<App />);
