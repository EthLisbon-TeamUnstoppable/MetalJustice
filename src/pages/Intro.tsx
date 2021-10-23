import React, { useState, useEffect, useContext } from 'react';
import { withStyles }  from "@material-ui/styles";
import styles from "../styles/intro.styles";
import { Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ethers } from "ethers";

interface Props { classes: any }

declare global {
  interface Window {
      ethereum: any
  }
}

const Intro: React.FC<Props> = ({ classes }: Props) => {
  const [connected, setConnected] = useState(false);

  const fetchProvider = async () => {
    const answ = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setConnected(true);
  }

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
        <Button
          variant="contained"
          disabled={connected}
          color="success"
          style={{color: 'white', width: '185px', height: '50px', marginTop: '19px'}}
          onClick={() => fetchProvider()}
        >
          Connect
        </Button>
        <div style={{display: 'flex'}}>
          <Button
            disabled={!connected}
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', marginTop: '19px', marginRight: '20px'}}
            onClick={() => history.push('/dispute-send')}
          >
            CREATE DISPUTE
          </Button>
          <Button
            disabled={!connected}
            variant="contained"
            color="success"
            style={{color: 'white', width: '185px', height: '50px', marginTop: '19px', marginRight: '20px'}}
            onClick={() => history.push('/judge')}
          >
            LOGIN AS JUDGE
          </Button>
          <Button
            disabled={!connected}
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