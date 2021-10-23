import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material'
import { ThemeSpacing } from './theme';

export default createStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputField: {
    backgroundColor: '#E5E5E5',
    marginTop: ThemeSpacing(4.25) + "!important"
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: ThemeSpacing(12),
    height: '100%',
    maxWidth: '600px'
  },
  renderInfoBlock: {
    marginTop: '26px'
  }
}));