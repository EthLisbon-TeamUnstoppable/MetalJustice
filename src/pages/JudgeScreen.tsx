import React, { useState, useEffect } from 'react';
import styles from "../styles/judge.styles";
import {useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import {ethers} from 'ethers';
import cryptoJudges from '../contract/abi/cryptoJudges';

import { Divider, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import { withStyles }  from "@material-ui/styles";
import { Dispute, CaseStates } from '../types';
import ResultScreen from './ResultScreen';
import { contractAddress } from '../Utils/constants';


interface Props { classes: any }

const JudgeScreen: React.FC<Props> = ({classes}) => {
  const [account, setAccount] = useState("");
  const [resultSent, setResultSent] = useState(false);
  const [dispute, setDispute] = useState<Dispute>();

  const { library } = useWeb3React<ethers.providers.Web3Provider>()
  const history = useHistory();

  useEffect(() => {
    getCurrentAccount()
  }, []);

  useEffect(() => {
    getCaseData()
  }, [library, account])

  const protectLibraryDeclaration = () => {
    if (!library) {
      console.error("should redirect NOW!");
      return history.push("/");
    }
    return library!;
  }


  const getCurrentAccount = async () => {
    let library = protectLibraryDeclaration();
    if (!library) {
      console.log("no library in getcurrentAccoutn");
      return;
    }
    const accounts = await library.listAccounts();
    setAccount(accounts[0]);
  }

  const getCaseData = async () => {
    let library = protectLibraryDeclaration();
    if (!library || !account) {
      if (!library) {
        console.log("NO LIBRARY IN GET CASE");
      }
      if (!account) {
        console.log("NO ACCOUNT IN GET CASE");
      }
      return;
    }
    const signer = library?.getSigner();
    const contract = new ethers.Contract(contractAddress, cryptoJudges, signer);
    
    const caseData = await contract.functions.getCase(account).then(casedata => casedata[0]);
    const caseId = caseData.caseId.toNumber();
    
    const state = caseData.state as number;
    if (state > CaseStates.Judging) {
      console.error("Last case has been solved, no new cases");
      setDispute(undefined);
      return;
    }

    const totalColat = caseData.opponent.collateral.toNumber() + caseData.requester.collateral.toNumber();
    const dispute:Dispute = {
      disputeNum: caseId,
      colateral: ethers.utils.formatEther(totalColat.toString()),
      description: caseData.description,
      participants: [
        {
          address: caseData.requester.addr,
          proof: caseData.requester.proof
        },
        {
          address: caseData.opponent.addr,
          proof: caseData.opponent.proof
        }
      ]
    };
    setDispute(dispute);
  }

  const sentResult = async (result: boolean) => {
    const signer = library?.getSigner();
    const contract = new ethers.Contract(contractAddress, cryptoJudges, signer);
    const tx = await contract.setDecision(dispute!.disputeNum, result);
    await tx.wait();
    setResultSent(true);
    setDispute(undefined);
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

  const DisputeDescription = ({colateralSize, disputeDescription}: {colateralSize?: string, disputeDescription?: string}) => (
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
          onClick={() => {sentResult(participant === 1)}}
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
        <ResultScreen positive={true} isJudgeScreen={true} dispute={dispute!}/>
        :
        <RenderDispute dispute={dispute} />
        }
        
      </div>
    </div>
  )
}

export default withStyles(styles)(JudgeScreen);