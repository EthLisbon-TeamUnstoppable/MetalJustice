import React, { useState } from 'react';
import { withStyles }  from "@material-ui/styles";
import styles from "../styles/app.styles";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

type Props = { 
  classes: any, 
  opponentAddr: string,
  collateralSize: string,
  disputeDescription: string 
}

const DisputeRequest: React.FC<Props> = ({ classes, ...props}: Props) => {
  const [proof, setProof] = useState("");
  
  
  const tempDefaultProps = {
    opponentAddr: "0x235p4346453060",
    collateralSize: "0.5",
    disputeDescription: "User number 2 stole my meme and published on twitter as hiw own meme"
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
      <RenderInfoBlock label="Opponent eth address" value={tempDefaultProps.opponentAddr}/>
      <RenderInfoBlock label="Colateral size" value={`${tempDefaultProps.collateralSize} ETH`}/>
      <RenderInfoBlock label="Dispute description" value={tempDefaultProps.disputeDescription}/>
      <TextField 
        className={classes.textInputField}
        multiline
        rows={4}
        label="Proof data for the judge
        (only visible for the judge)"
        value = {proof}
        variant="filled"
        onChange={(e) => onChangeValue(e.target.value, setProof)}
      />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="contained"
          color="success"
          style={{color: 'white', width: '290px', height: '50px', marginTop: '19px', marginRight: '19px'}}
        >
          ACCEPT DISPUTE
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{color: 'white', width: '290px', height: '50px', marginTop: '19px'}}
        >
          DECLINE
        </Button>
      </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(DisputeRequest);