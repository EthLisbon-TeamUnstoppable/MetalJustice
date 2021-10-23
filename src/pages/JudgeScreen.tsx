import React, { useState } from 'react';
import styles from "../styles/judge.styles";

import { Divider, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import { withStyles }  from "@material-ui/styles";
import { Dispute } from '../types';
import ResultScreen from './ResultScreen';

interface Props { classes: any }

const JudgeScreen: React.FC<Props> = ({classes}) => {
  const [resultSent, setResultSent] = useState(false);
  const [dispute, setDispute] = useState<Dispute>(
    {
      disputeNum: 2234,
      colateral: 0.5,
      description: 'User number 2 stole my meme and published on twitter as his own meme',
      participants: [
        {
          address: '0x235p4346453060',
          proof: 'You can check that by twitter post date my tweet with meme was earlier'
        },
        {
          address: '0xab32cdef423410',
          proof: 'My tweet has much more liked therefore it’s my meme'
        }
      ]
    }
  );

  const sentResult = (chosenParticipant: number) => {
    setResultSent(true);


  }

  const JudgeHeader = ({judge, disputeNum}: {judge: string, disputeNum?: number}) => (
      <div className={classes.screenHeaderTop}>
        <Typography variant="body1">
          Welcome {judge}
        </Typography>
        <Typography variant="h3" style={{fontSize: '30px'}}>
          Dispute #{disputeNum}
        </Typography>
      </div>
  )

  const DisputeDescription = ({colateralSize, disputeDescription}: {colateralSize?: number, disputeDescription?: string}) => (
    <div className={classes.screenDisputeDesc}>
      <div className={classes.disputeDescBlock}>
        <Typography variant="overline">
          Dispute description
        </Typography>
        <Typography variant="body1" style={{fontWeight: 800}}>
          {disputeDescription ?? '-'}
        </Typography>
      </div>
      <div>
        <Typography variant="overline">
          Colateral Size
        </Typography>
        <Typography variant="h5" style={{fontWeight: 800, fontSize: '20px'}}>
          {colateralSize ? colateralSize + ' ETH' : '-'}
        </Typography>
      </div>
    </div>
  )

  const ParticipantCard = ({participant, address, proof}: {participant: number, address: string, proof: string}) => (
    <Card className={classes.participantCard}>
      <div className={classes.participantCardTop}>
        <Typography variant="overline">
          User {participant} eth address
        </Typography>
        <Typography variant="h6" style={{fontWeight: 800}}>
          {address}
        </Typography>
      </div>
      <div className={classes.participantCardBottom}>
        <Typography variant="overline">
          Proof data
        </Typography>
        <Typography variant="h6" style={{fontWeight: 800}}>
          {proof}
        </Typography>
      </div>
      <Button
          variant="contained"
          color="success"
          style={{color: 'white', width: '263px', height: '50px', marginTop: '19px'}}
          onClick={() => {sentResult(participant)}}
        >
          Set user {participant} as winner
        </Button>
    </Card>
  )

    const RenderDispute = ({dispute}: {dispute?: Dispute}) => (
      dispute ? (
        <>
          {dispute.participants.map((participant, index) => 
            <ParticipantCard 
              key={ index } 
              participant={index + 1}
              address={participant.address}
              proof={participant.proof}/>
          )}
        </>
      ) : <>
        <Typography variant="h2" style={{mixBlendMode: 'soft-light'}}>
          No active disputes
        </Typography>
       </>
    )


  return (
    <div className={classes.main} style={ resultSent ? {backgroundColor: '#ffffff'} : {}}>
      <div className={classes.screenHeader} style = { resultSent ? {height: '130px'} : {}}>
        <JudgeHeader judge="Judge 1" disputeNum={dispute?.disputeNum}/>
        <Divider className={classes.divider}/>
        {resultSent 
          ? <> </> 
          : <DisputeDescription colateralSize={dispute?.colateral} disputeDescription={dispute?.description}/>
        }
      </div>
      <div className={dispute ? classes.disputeBody : classes.screenEmptyDispute} style={resultSent ? {minHeight: 'inherit' } : {}}>
        {resultSent ? 
        <ResultScreen positive={true} isJudgeScreen={true} dispute={dispute}/>
        :
        <RenderDispute dispute={dispute} />
        }
        
      </div>
    </div>
  )
}

export default withStyles(styles)(JudgeScreen);