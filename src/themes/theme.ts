import { createMuiTheme } from '@material-ui/core/styles';
import '../assets/fonts.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333',
        },
        secondary: {
            main: '#ddd',
        },
        text: {
            primary: '#333',
            secondary: '#717171',
        }
    },
    typography: {
        fontFamily: "'Pangolin', sans-serif",
        fontSize: 12,
        h6: {
            fontSize: '0.875rem'
        },
        body1: {
            fontSize: '0.75rem',
        },
        body2: {
            fontSize: '0.67rem',
            fontStyle: 'italic',
        }
    }
});

export { theme };