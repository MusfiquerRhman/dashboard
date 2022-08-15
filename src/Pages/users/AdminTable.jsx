import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import style from './userStyles';

function createData(admin_status, created_on, email, fullname, id, phone, profile_logo_path, status, zip) {
  return { admin_status, created_on, email, fullname, id, phone, profile_logo_path, status, zip};
}

const AdminTable = (admins) => {
    const classes = style();
    let rows = [];
    
    admins.users.forEach(admin => {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Admin Status</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created On</TableCell>
            <TableCell align="right">Zip</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right"><img src={row.profile_logo_path} alt="Admin" className={classes.categoryImg} /></TableCell>
              <TableCell align="right">{row.fullname}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.admin_status ? <CheckIcon /> : <ClearIcon />}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.created_on.toLocaleDateString() + " " + row.created_on.toLocaleTimeString()}</TableCell>
              <TableCell align="right">{row.zip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;