import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { SubCategoryContext } from "../../../Context APIs/subcategoriesContext";
import { VendorContext } from "../../../Context APIs/vendorContext";
import Row from './CouponsTableRow';
import TableHeadSort from "./TableHeadSort";

const headCells = [
  {
    id: 'coupon_code',
    label: 'Coupon Code'
  },
  {
    id: 'selectedVendor',
    label: 'Vendor Name'
  },
  {
    id: 'start_date',
    label: 'Start Date'
  },
  {
    id: 'end_date',
    label: 'End Date'
  },
  {
    id: 'sub_category_name',
    label: 'Sub Category Name'
  },
  {
    id: 'percentage_off',
    label: 'Deal Type'
  },
  {
    id: 'scheduler',
    label: 'Scheduler'
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function createData(coupon_code, start_date, end_date, is_active, feature_coupon, single_use, coupon_id, vid, scid, sub_category_name, selectedVendor, percentage_off, created_date, updated_date, coupon_description, scheduler) {
  return {
    coupon_code,
    start_date,
    end_date,
    is_active,
    feature_coupon,
    single_use,
    sub_category_name,
    selectedVendor,
    percentage_off,
    coupon_description,
    scheduler,
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
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('end_date');

  const { subCategories } = useContext(SubCategoryContext);
  const { vendors } = useContext(VendorContext)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  let rows = [];

  data.data?.forEach((element) => {
    rows.push(createData(
      element.coupon_code.toLowerCase(),
      element.start_date,
      element.end_date,
      element.is_active,
      element.feature_coupon,
      element.single_use,
      element.coupon_id,
      element.vid,
      element.scid,
      subCategories.find((e) => e.scid === element.scid)?.sub_category_name.toLowerCase(),
      vendors.find((e) => e.vid === element.vid)?.vendor_name.toLowerCase(),
      element.percentage_off,
      element.created_date,
      element.updated_date,
      element.coupon_description,
      element.scheduler
    ))
  })

  return (
    <>
      {rows.length > 0 &&
        <TableContainer component={Paper} sx={{boxShadow: "2px 2px 5px #01010144"}}>
          <Table aria-label="collapsible table">
            <TableHeadSort
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      {rows.length === 0 &&
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          No Data Available
        </Typography>
      }
    </>
  );
}

export default CuponsTable;