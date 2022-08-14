import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Row from './CouponsTableRow';


function createData(coupon_code, start_date, end_date, is_active, feature_coupon, single_use, coupon_id, vid, scid, sub_category_name, percentage_off, created_date, updated_date) {
  return {
    coupon_code,
    start_date,
    end_date,
    is_active,
    feature_coupon,
    single_use,
    sub_category_name,
    percentage_off,
    history:
    {
      coupon_id: coupon_id,
      vid: vid,
      scid: scid,
      created_date: created_date,
      updated_date: updated_date,
    },
  };
}


const CuponsTable = (data) => {
  let rows = [];

  data.data.forEach((element) => {
    rows.push(createData(
      element.coupon_code,
      element.start_date,
      element.end_date,
      element.is_active,
      element.feature_coupon,
      element.single_use,
      element.coupon_id,
      element.vid,
      element.scid,
      element.sub_category_name,
      element.percentage_off,
      element.created_date,
      element.updated_date
    ))
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Coupon Code</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Sub Category Name</TableCell>
            <TableCell align="right">Percentage Off</TableCell>
            <TableCell align="right">Featured</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Single Use</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CuponsTable;