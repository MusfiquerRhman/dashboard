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
        marginRight: "1rem",
    },
    value: {
        fontSize: "1rem",
        color: "#263238",
    }, 
    icon: {
        height: '100%',
        
    }
}));

export default style;