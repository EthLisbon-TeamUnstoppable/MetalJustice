import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material'
import { ThemeSpacing } from './theme';

export default createStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: '192px',
    height: '77px',
    marginTop: '87px'
  },
  gif: {
    marginTop: '59px'
  }
}));