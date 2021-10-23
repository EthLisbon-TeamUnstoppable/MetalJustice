import React, { useState, useEffect, useContext } from 'react';
import { withStyles }  from "@material-ui/styles";
import styles from "../styles/intro.styles";
import { Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import {ethers} from 'ethers';

interface Props { classes: any }

declare global {
  interface Window {
      ethereum: any
  }
}

const injected = new InjectedConnector({ supportedChainIds: [4] })

const walletconnect = new WalletConnectConnector({
  rpc: { 4: 'https://rinkeby.infura.io/v3/522c37f0b9a447afb7a77cef290a1cc8' },
  qrcode: true,
  chainId: 4,
  infuraId: '522c37f0b9a447afb7a77cef290a1cc8'
})

const connectorsByName: Record<string, any> = {
  'Metamask': injected,
  'WalletConnect': walletconnect,
}

const Intro: React.FC<Props> = ({ classes }: Props) => {
  const context = useWeb3React<ethers.providers.Web3Provider>()
  const { connector, activate, deactivate, active, error } = context

  const [activatingConnector, setActivatingConnector] = useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector])

  let history = useHistory();
  
  return (
      <div className={classes.root}>
        <img
          src="logo.png"
          alt="logo"
          className={classes.logo}
        />
        <img 
          src="giphy.gif"
          alt="intro gif"
          className={classes.gif}
        />
        <Typography variant="h4" style={{
          marginTop: '34px',
          fontWeight: 500,
        }}>
          Dispute resolution system 
        </Typography>
        <Typography variant="h6" style={{
          width: '308px',
          marginTop: '30px'
        }}>
          MetaJustice is proof of concept of arbitration court on ethereum. 
        </Typography>
        <div style={{display: 'flex'}}>
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          const connected = currentConnector === connector;
          const activating = currentConnector === activatingConnector;
          const disabled = activating || (connected && !error);
          console.log(error);

          return (
            <Button
              variant="contained"
              color="success"
              style={{color: 'white', width: '185px', height: '50px', margin: '19px 9px 0px 9px'}}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 5px'
                }}
              >
                {connected && !error && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </Button>
          )
        })}
        {active && (
          <Button
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', margin: '19px 9px 0px 9px'}}
            onClick={() => {deactivate()}}
          >
            Disconnect
          </Button>
        )}
        </div>
        <div style={{display: 'flex'}}>
          <Button
            disabled={!active}
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', marginTop: '19px', marginRight: '20px'}}
            onClick={() => history.push('/dispute-send')}
          >
            CREATE DISPUTE
          </Button>
          <Button
            disabled={!active}
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', marginTop: '19px', marginRight: '20px'}}
            onClick={() => history.push('/judge')}
          >
            LOGIN AS JUDGE
          </Button>
          <Button
            disabled={!active}
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', marginTop: '19px'}}
            onClick={() => history.push('/dispute-request')}
          >
            YOUR SUMMONS
          </Button>
        </div>
      </div>
  )
}

export default withStyles(styles)(Intro);