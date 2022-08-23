import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#018F8F",
            light: "#30C3CD",
            dark: "#30C3CD",

            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#E8804B",
            light: "#E8804B",
            dark: "#e65100",
            contrastText: "#FFFFFF"
        },
        error: {
            main: "#DC0000"
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF"
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