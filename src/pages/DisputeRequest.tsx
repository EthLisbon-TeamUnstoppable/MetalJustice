import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles }  from "@material-ui/styles";
import styles from "../styles/app.styles";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import {ethers} from 'ethers';
import cryptoJudges from '../contract/abi/cryptoJudges';
import { keccak256 as sha3 } from 'js-sha3';
import { contractAddress } from '../Utils/constants';

type Props = { 
  classes: any, 
}

const DisputeRequest: React.FC<Props> = ({ classes}: Props) => {
  const [proof, setProof] = useState("");
  const [caseData, setCase] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const {library} = useWeb3React<ethers.providers.Web3Provider>()
  const history = useHistory();
  // need to get the case data
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
    console.log({account, contractAddress});
    const caseData = await contract.functions.getCase(account);
    setCase(caseData[0]);
    console.log(caseData[0]);
    console.log(caseData[0].caseId.toNumber());
    setLoading(caseData[0] === undefined);
  }

  const declineCase = () => {
    history.push('/');
  }

  const acceptCase =  async () => {
    const proofHash = sha3(proof);
    
    const signer = library?.getSigner();
    const contract = new ethers.Contract(contractAddress,
      cryptoJudges, signer);

    const collateralSize = caseData?.baseCollateral.toString()
    const overrides = {
      value: collateralSize,
      from: account,
      gasPrice: 1000000000, 
      gasLimit: 120000
    }
    const caseId = caseData?.caseId.toString();
    const tx = await contract.acceptCase(caseId, "0x" + proofHash, overrides)
    await tx.wait();
    const tx2 = await contract.discloseProof(caseId, proof, {gasPrice: 1000000000, gasLimit: 120000});
    await tx2.wait();
    history.push('/');
  }

  const RenderInfoBlock = ({label, value}: {label: string, value: string}) => {
    return (
      <div className={classes.renderInfoBlock}>
        <Typography variant="overline" style={{lineHeight: '12px'}}>
          {label}
        </Typography>
        <Typography variant="h6" style={{lineHeight: '30px', fontWeight: 800}}>
          {value}
        </Typography>
      </div>
    );
  }
  const onChangeValue = (value: string, setFunc: React.Dispatch<React.SetStateAction<string>>) => setFunc(value);

  return (
    <div className={classes.root}>
      <div className={classes.layout}>
      <Typography variant="body1">
        Welcome USER 2
      </Typography>
      <Typography variant="h2" style={{fontSize: '1.875rem'}}>
      Dispute resolution request from user1
      </Typography>
      {!loading ?  
        <>
          <RenderInfoBlock label="Opponent eth address" value={caseData?.requester[0] ?? '-'}/>
          <RenderInfoBlock label="Colateral size" value={`${ethers.utils.formatEther(caseData?.baseCollateral.toString())} ETH`}/>
          <RenderInfoBlock label="Dispute description" value={caseData?.description}/>
          <TextField 
            className={classes.textInputField}
            multiline
            error={proof === ""}
            helperText={proof !== "" ? "" : "Please enter your proof statement"}
            rows={4}
            label="Proof data for the judge
            (only visible for the judge)"
            value = {proof}
            variant="filled"
            onChange={(e) => onChangeValue(e.target.value, setProof)}
          />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button
              disabled = {proof === ""}
              variant="contained"
              color="success"
              style={{color: 'white', width: '290px', height: '50px', marginTop: '19px', marginRight: '19px'}}
              onClick={() => acceptCase()}
            >
              ACCEPT DISPUTE
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{color: 'white', width: '290px', height: '50px', marginTop: '19px'}}
              onClick={declineCase}
            >
              DECLINE
            </Button>
          </div>
        </>
        :
        "Loading"}
      </div>
    </div>
  )
}

export default withStyles(styles)(DisputeRequest);