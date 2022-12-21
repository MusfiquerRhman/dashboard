import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import * as React from 'react';
import accountImg from '../../Assets/icons8-account.png';
import { StyledTableCell, StyledTableRow } from '../../Styles/GlobalStyles';
import style from './userStyles';

function createData(admin_status, created_on, email, fullname, id, phone, profile_logo_path, status, zip) {
  return { admin_status, created_on, email, fullname, id, phone, profile_logo_path, status, zip};
}

const AdminTable = (admins) => {
    const classes = style();
    let rows = [];
    
    admins.users?.forEach(admin => {
        rows.push(
            createData(
                admin.admin_status,
                new Date(admin.created_on),
                admin.email,
                admin.fullname,
                admin.id,
                admin.phone,
                admin.profile_logo_path,
                admin.status,
                admin.zip,
            )
        )
    })

  return (
    <TableContainer component={Paper} sx={{boxShadow: "2px 2px 5px #01010144"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Full Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone No</StyledTableCell>
            <StyledTableCell align="center">Admin Status</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Created On</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="center">
                {row.profile_logo_path?.length > 0 ? (
                    <img src={row.profile_logo_path} alt="Admin" className={classes.categoryImg} />
                  ) : (
                    <img src={accountImg} alt="Admin" className={classes.categoryImg} />
                  )
                }
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.fullname?.length > 0 ? row.fullname : <HorizontalRuleIcon />}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.admin_status ? <CheckIcon /> : <ClearIcon />}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">{row.created_on.toLocaleDateString() + " " + row.created_on.toLocaleTimeString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;