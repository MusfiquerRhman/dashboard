import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as couponsAPI from '../../../API/coupons';
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import CouponsForm from './CuponsForm';

const Row = (props) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const handleClickOpenUpdate = () => {
        setUpdateOpen(true);
    }

    const handleCloseUpdate = () => {
        setUpdateOpen(false);
    }

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const [coupon_code, handleChangeCoupon_code] = useInputState('')
    const [percentage_off, handleChangePercentage_off] = useInputState('');
    const [single_use, setSingle_use] = useState(false)
    const [feature_coupon, setFeature_coupon] = useState(false)
    const [start_date, handleChangeStart_date, setStartDate] = useInputState(new Date());
    const [end_date, handleChangeEnd_date, setEnddate] = useInputState(new Date());
    const updated_date = new Date();

    const handleChangeSingle_use = (event) => {
        setSingle_use(event.target.checked);
    };

    const handleChangeFeature_coupon = (event) => {
        setFeature_coupon(event.target.checked);
    };

    // useEffect(() => {
    //     console.log(coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date)
    // }, [coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date]);


    const deleteForm = async () => {
        const res = await couponsAPI.deleteCoupon(row.history.vid);
        if (res.status === 200) {
            enqueueSnackbar(`Successfully Deleted`, { variant: 'info' });
            window.location.reload();
        }
        else {
            enqueueSnackbar(`Failed to Deleted`, { variant: 'error' });
        }
        setDeleteOpen(false);
    }

    // const updateForm = async () => {
    //     // coupon_id, vendor_id, subcategory_id, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date, updated_date
    //     const res = couponsAPI.updateCoupons(row.history.coupon_id, row.history.vid, row.history.scid, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date, updated_date)
    // }

    return (
        <React.Fragment>
            <CouponsForm
                coupon_code={coupon_code}
                handleChangeCoupon_code={handleChangeCoupon_code}
                percentage_off={percentage_off}
                handleChangePercentage_off={handleChangePercentage_off}
                single_use={single_use}
                handleChangeSingle_use={handleChangeSingle_use}
                feature_coupon={feature_coupon}
                handleChangeFeature_coupon={handleChangeFeature_coupon}
                start_date={start_date}
                end_date={end_date}
                formType="update"
                handleCloseUpdate={handleCloseUpdate}
                updateOpen={updateOpen}
                setStartDate={setStartDate}
                setEnddate={setEnddate}
            />

            <ConfrimDeleteDialogue
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                name={row.coupon_code}
                deleteForm={deleteForm}
            />

            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.coupon_code}
                </TableCell>
                <TableCell align="right">{row.start_date}</TableCell>
                <TableCell align="right">{row.end_date}</TableCell>
                <TableCell align="right">{row.sub_category_name}</TableCell>
                <TableCell align="right">{row.percentage_off}</TableCell>
                <TableCell align="right">{row.feature_coupon ? <CheckIcon /> : <CloseIcon />}</TableCell>
                <TableCell align="right">{row.is_active ? <CheckIcon /> : <CloseIcon />}</TableCell>
                <TableCell align="right">{row.single_use ? <CheckIcon /> : <CloseIcon />}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" gutterBottom component="div">
                                More Details...
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Coupon ID</TableCell>
                                        <TableCell>Vendor ID</TableCell>
                                        <TableCell align="right">Sub Category ID</TableCell>
                                        <TableCell align="right">Created Date</TableCell>
                                        <TableCell align="right">Update Date</TableCell>
                                        <TableCell align="right">Delete Coupon</TableCell>
                                        <TableCell align="right">Update Coupon</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={1}>
                                        <TableCell>{row.history.coupon_id}</TableCell>
                                        <TableCell align="right">{row.history.vid}</TableCell>
                                        <TableCell align="right">{row.history.scid}</TableCell>
                                        <TableCell align="right">{row.history.created_date}</TableCell>
                                        <TableCell align="right">{row.history.updated_date}</TableCell>
                                        <TableCell align="right"><Button variant="text" onClick={handleClickOpenDelete}><DeleteForeverIcon /></Button></TableCell>
                                        <TableCell align="right"><Button variant="text" onClick={handleClickOpenUpdate}><EditIcon /></Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row;