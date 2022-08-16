import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#E8804B",
            light: "#E8804B",
            dark: "#E8804B",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#30C3CD",
            light: "#30C3CD",
            dark: "#30C3CD",
            contrastText: "#FFFFFF"
        },
        error: {
            main: "#DC0000"
        },
        background: {
            default: "#FFFFFF",
            paper: "#F3F3F3"
        },
        text: {
            primary: "#000000",
            secondary: "#222222",
            disabled: "#55555",
            icon: "#000000"
        },
        action: {
            disabledBackground: '#AAAAAA',
            disabled: '#000000'
        }
    },
});

export default theme;