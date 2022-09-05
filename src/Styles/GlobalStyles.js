import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

const style = makeStyles((theme) => ({
  form: {
    margin: "3rem 1rem",
    padding: "1rem",
    paddingBottom: "1rem",
  },
  formBox: {
    [theme.breakpoints.up("xl")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "10%",
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "22%",
      width: "55%",
    },
  },
  image: {
    marginLeft: "10%",
    width: "80%",
    aspectRatio: "1/1",
  },
  subCategoryMenu: {
    marginLeft: "1rem",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: "3rem",
  },
  chip__container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #018F8F',
    justifyContent: 'space-between',
}
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default style;
