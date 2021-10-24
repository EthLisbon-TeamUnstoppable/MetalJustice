import React from 'react';
import styles from "../styles/judge.styles";

import { Typography } from '@mui/material';
import { withStyles }  from "@material-ui/styles";
import { Dispute } from '../types';

interface Props { 
  classes: any
  positive: boolean
  isJudgeScreen: boolean,
  dispute: Dispute
}

const ResultScreen: React.FC<Props> = ({classes, positive, isJudgeScreen = false, dispute}) => {

  const PositiveOutcome = () => (
    <div style={{
      width: '174px',
      height: '174px',
      marginBottom: '39px'
    }}>
      <img 
        src="positiveResult.png"
        alt="positive result"
        style={{
          borderRadius: '50%',
          height: '100%',
          display: 'block',
          width: '100%',

        }}
      />
      <img
        src="positiveVector.png"
        alt="postiive mark"
        style={{
          position: 'relative',
          bottom: '69px',
          left: '104px'
        }}
      />
    </div>
  );

  const NegativeOutcome = () => (
    <>
      <div style = {{

      }}>
        <img
          src="lost.png"
          alt="negative result"
          style = {{}}
        />
      </div>
    </>
  )


  const JudgeOutcome = () => (
    <div style={{width: '447px', display: 'flex', flexDirection: 'column'}}>
    <Typography variant="h5" style={{ color: "#00C008", fontWeight: 800, marginBottom: '18px'}}>
        +10 TO JUDGE REPUTATION
      </Typography>
      <Typography variant="h5">
        Good job, ser Judge! You earned 10% of the looser’s collateral: {(Number(dispute.colateral) * 0.1).toFixed(8)}ETH
      </Typography>
    </div>
  )

  return (
    <div className={classes.mainResult} style={ isJudgeScreen ? {justifyContent: 'center'} : {}}>
      {positive ? 
        <>
          <PositiveOutcome />
          {isJudgeScreen ? <JudgeOutcome /> : <> </>}
        </>
      :
        <>
          <NegativeOutcome/>
        </>
      }
    </div>
  )
}

export default withStyles(styles)(ResultScreen);