import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';
import Row from './CouponsTableRow';

function createData(coupon_code, start_date, end_date, is_active, feature_coupon, single_use, coupon_id, vid, scid, sub_category_name, percentage_off, created_date, updated_date, coupon_description) {
  return {
    coupon_code,
    start_date,
    end_date,
    is_active,
    feature_coupon,
    single_use,
    sub_category_name,
    percentage_off,
    coupon_description,
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
      element.updated_date,
      element.coupon_description,
    ))
  })

  return (
    <>
      {rows.length > 0 &&
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Coupon Code</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Sub Category Name</StyledTableCell>
                <StyledTableCell align="center">Percentage Off</StyledTableCell>
                <StyledTableCell align="center">Featured</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">Single Use</StyledTableCell>
                <StyledTableCell align='center'>Coupons Description</StyledTableCell>
                <StyledTableCell align="center">Update Coupon</StyledTableCell>
                <StyledTableCell align="center">Delete Coupon</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      {rows.length === 0 &&
        <Typography variant="h5" gutterBottom sx={{textAlign: 'center'}}>
          No Data
        </Typography>
      }
    </>
  );
}

export default CuponsTable;