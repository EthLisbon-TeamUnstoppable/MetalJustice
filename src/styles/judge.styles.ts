import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material'
import { ThemeSpacing } from './theme';

export default createStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
    height: '100%',
    width: '100%'
  },
  mainResult: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  divider: {
    width: '100vw',
    position: 'absolute',
    top: '104px',
    left: '0px',
    margin: '0px !important'
  },
  screenHeader: {
    height: '260px',
    width: '100vw',
    paddingTop: ThemeSpacing(5.5),
    paddingLeft: ThemeSpacing(61.5),
    backgroundColor: '#ffffff'
  },
  screenHeaderTop: {
    height: '104px',
  },
  screenDisputeDesc: {
    display: 'flex'
  },
  disputeBody: {
    minHeight: '440px',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenEmptyDispute: {
    minHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disputeDescBlock: {
    width: '200px',
    marginRight: ThemeSpacing(5)
  },
  participantCard: {
    minHeight: '344px',
    width: '319px',
    padding: '28px',
    marginRight: ThemeSpacing(5),
  },
  participantCardTop: {
    minHeight: '46px',
    marginBottom: '36px',
  },
  participantCardBottom: {
    minHeight: '126px'
  }
}));