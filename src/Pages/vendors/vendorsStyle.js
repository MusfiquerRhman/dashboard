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
        marginRight: "2rem"
    }, 
    title: {
        fontSize: "1.2rem",
        marginRight: "1rem",
    },
    value: {
        fontSize: "1.2rem",
        color: "#263238",
    }
}));

export default style;