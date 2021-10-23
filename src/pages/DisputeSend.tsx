import React, { useContext, useState } from 'react';
import { withStyles }  from "@material-ui/styles";
import styles from "../styles/app.styles";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { isAddress } from 'ethers/lib/utils';

interface Props { classes: any }


const DisputeSend: React.FC<Props> = ({ classes }: Props) => {
  const [opponentAddr, setOpponentAddr] = useState("");
  const [collateralSize, setCollateralSize] = useState("0.1");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [proof, setProof] = useState("");
  const [validations, setValidations] = useState({
    addr: false,
    collateral: true,
    disputeDescription: false,
    proofData: false
  });

  const isError = ():boolean => Object.values(validations).some(value => value === false );
  const onChangeValue = (value: string, setFunc: React.Dispatch<React.SetStateAction<string>>) => setFunc(value);
  const updateValidation = (key: keyof typeof validations, value: boolean) => {
    if (validations[key] !== value) {
      setValidations({...validations, [key]: value});
    }
  }


  const sendDispute = () => {
    // I need to take a keccak hash of proof
    // store the proof and hash in local storage
    // send the data to smart contract
    // redirect user to the new page where I will disclosure the proof from local storage (in case if user will go afk)
  }

  return (
    <div className={classes.root}>
      <div className={classes.layout}>
      <Typography variant="body1">
        Welcome USER 1
      </Typography>
      <Typography variant="h2" style={{fontSize: '1.875rem'}}>
      Send a dispute resolution request to your opponent
      </Typography>
      <TextField
        className={classes.textInputField}
        error={!validations["addr"]}
        helperText= {validations["addr"] ? "" : "Invalid ETH address"}
        label="ETH address of opponent"
        value = {opponentAddr}
        variant="filled"
        onChange={(e) => {
          updateValidation("addr", isAddress(e.target.value));
          onChangeValue(e.target.value, setOpponentAddr)
        }}
      />
      <TextField 
        className={classes.textInputField}
        label="Size of collateral"
        error={!validations["collateral"]}
        helperText= {validations["collateral"] ? "" : "Invalid collateral" }
        type="number"
        value = {collateralSize}
        variant="filled"
        onChange={(e) => {
          updateValidation("collateral", (Number(e.target.value) ?? -1) >= 0 )
          onChangeValue(e.target.value, setCollateralSize)
        }}
      />
      <TextField 
        className={classes.textInputField}
        label="Dispute Description"
        value = {disputeDescription}
        error={!validations["disputeDescription"]}
        helperText= {validations["disputeDescription"] ? "" : "Please enter dispute description"}
        variant="filled"
        onChange={(e) => {
          updateValidation("disputeDescription", e.target.value !== "");
          onChangeValue(e.target.value, setDisputeDescription)
        }}
      />
      <TextField 
        className={classes.textInputField}
        error={!validations["proofData"]}
        helperText= {validations["proofData"] ? "" : "Please pass your proof to the judge"}
        multiline
        rows={4}
        label="Proof data for the judge
        (only visible for the judge)"
        value = {proof}
        variant="filled"
        onChange={(e) => {
          updateValidation("proofData", e.target.value !== "");
          onChangeValue(e.target.value, setProof)
        }}
      />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          disabled={isError()}
          variant="contained"
          color="success"
          style={{color: 'white', width: '385px', height: '50px', marginTop: '19px'}}
        >
          SEND DISPUTE RESOLUTION REQUEST
        </Button>
      </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(DisputeSend);