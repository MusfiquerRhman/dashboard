import { makeStyles } from "@mui/styles";

const style = makeStyles((theme) => ({
    titileContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    vendorImg: {
        height: "4rem",
        width: "4rem",
        borderRadius: '50%',
    }, 
    title: {
        fontSize: "1rem",
        paddingRight: "1rem",
        color: '#e65100'
    },
    value: {
        fontSize: "1rem",
        color: "#263238",
        overflowWrap: 'break-word',
        textAlign: 'center'
    }, 
    icon: {
        height: '100%',
    },
    // emptyIcon: {
    //     margin: '0',
    //     paddingTop: '10px'
    // },
    website: {
        fontSize: "1rem",
        color: "#018F8F",
        overflowWrap: 'break-word',
        textDecoration: 'underline'
    }
}));

export default style;