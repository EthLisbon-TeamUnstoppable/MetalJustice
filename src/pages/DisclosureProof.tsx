import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import styles from "../styles/judge.styles";
import { useWeb3React } from '@web3-react/core';
import {ethers} from 'ethers';
import { withStyles }  from "@material-ui/styles";
import { LocalDispute, LocalDisputes } from '../types';
import { contractAddress } from '../Utils/constants';
import cryptoJudges from '../contract/abi/cryptoJudges';
import { getFromLocalStorage } from '../Utils/localStorage.helper';
import { Button } from '@mui/material';

interface Props { 
  classes: any,
}

const DisclosureProof: React.FC<Props> = ({classes}) => {
  const [account, setAccount] = useState("");
  const [proof, setProofData] = useState<(LocalDispute & {caseId: number}) | undefined>(undefined);
  const {library} = useWeb3React<ethers.providers.Web3Provider>()
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
    
    const caseData = await contract.functions.getCase(account);
    const caseId = caseData[0].caseId.toNumber();
    const disputes = await getFromLocalStorage<LocalDisputes>(account)!;
    const proofs = disputes[caseId];
    setProofData({...proofs, caseId});
  }

  const disclose = async () => {
    const signer = library?.getSigner();
    const contract = new ethers.Contract(contractAddress, cryptoJudges, signer);
    if (!proof) return;
    const {caseId, proofData} = proof;
    const tx = await contract.discloseProof(caseId, proofData,  {gasPrice: 1000000000, gasLimit: 120000});
    await tx.wait();
    history.push('/')
  }

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        disabled={proof === undefined}
        variant="contained"
        color="success"
        style={{color: 'white', width: '290px', height: '50px', marginTop: '19px'}}
        onClick={disclose}
      >
        DISCLOSURE PROOF DATA
      </Button>
    </div>
  )
}

export default withStyles(styles)(DisclosureProof);