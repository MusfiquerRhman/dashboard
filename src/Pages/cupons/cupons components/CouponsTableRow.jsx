import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import * as couponsAPI from '../../../API/coupons';
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';
import CouponsForm from './CouponUpdateForm';

const Row = React.memo((props) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const handleCloseUpdate = () => {
        setUpdateOpen(false);
    }

    const { row } = props;

    const [coupon_code, handleChangeCoupon_code, setCouponCode] = useInputState('')
    const [percentage_off, handleChangePercentage_off, setPercentageOff] = useInputState('');
    const [single_use, setSingle_use] = useState(false)
    const [feature_coupon, setFeature_coupon] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [start_date, setStartDate] = useState(new Date());
    const [scheduler, handleChangeScheduler, setScheduler] = useInputState('')
    const [end_date, setEnddate] = useState(new Date());
    const [coupon_description, setcoupon_description] = useState('');
    const [vid, setVid] = useState('');
    const [scid, setScid] = useState('');
    const updateDate = new Date();

    const handleClickOpenUpdate = useCallback((row) => {
        setCouponCode(row.coupon_code);
        setPercentageOff(row.percentage_off);
        setSingle_use(row.single_use);
        setFeature_coupon(row.feature_coupon);
        setIsActive(row.is_active);
        setStartDate(row.start_date);
        setEnddate(row.end_date);
        setVid(row.history.vid);
        setScid(row.history.scid)
        setcoupon_description(row.coupon_description)
        setScheduler(row.scheduler);
        setUpdateOpen(true);
    }, [setCouponCode, setPercentageOff, setScheduler])

    const handleChangeSingle_use = useCallback((event) => {
        setSingle_use(event.target.checked);
    }, []);

    const handleChangeFeature_coupon = useCallback((event) => {
        setFeature_coupon(event.target.checked);
    }, []);

    const handleChangeIs_Active = useCallback((event) => {
        setIsActive(event.target.checked);
    }, []);

    const handleChangeCouponDescription = useCallback((event) => {
        setcoupon_description(event.target.value)
    }, []);

    const deleteForm = async () => {
        const res = await couponsAPI.deleteCoupon(row.history.coupon_id);
        if (res.status === 200) {
            enqueueSnackbar(`Successfully Deleted`, { variant: 'success' });
            window.location.reload();
        }
        else {
            enqueueSnackbar(`Failed to Delete`, { variant: 'error' });
        }
        setDeleteOpen(false);
    }

    const updateForm = async () => {
        couponsAPI.updateCoupons(
            row.history.coupon_id,
            vid,
            scid,
            coupon_code,
            percentage_off,
            single_use,
            feature_coupon,
            start_date,
            end_date,
            updateDate,
            coupon_description,
            scheduler,
            ).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar(`Successfully updated`, { variant: 'success' });
                    window.location.reload();
                }
                else {
                    enqueueSnackbar(`Failed to Update`, { variant: 'error' });
                }
            }
        );
    }

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
                isActive={isActive}
                handleChangeIs_Active={handleChangeIs_Active}
                handleChangeScheduler={handleChangeScheduler}
                scheduler={scheduler}
                setVid={setVid}
                setScid={setScid}
                scid={scid}
                vid={vid}
                coupnsDescription={coupon_description}
                handleChangeCouponDescription={handleChangeCouponDescription}
                handleClickSubmit={updateForm}
            />

            <ConfrimDeleteDialogue
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                name={row.coupon_code}
                deleteForm={deleteForm}
            />

            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <StyledTableCell align="center" component="th" scope="row" sx={{textTransform: 'capitalize'}}>{row.coupon_code}</StyledTableCell>
                <StyledTableCell align="center" sx={{textTransform: 'capitalize'}}>{row.selectedVendor}</StyledTableCell>
                <StyledTableCell align="center">{row.start_date}</StyledTableCell>
                <StyledTableCell align="center">{row.end_date}</StyledTableCell>
                <StyledTableCell align="center" sx={{textTransform: 'capitalize'}}>{row.sub_category_name}</StyledTableCell>
                <StyledTableCell align="center">{row.percentage_off}</StyledTableCell>
                <StyledTableCell align="center" sx={{textTransform: 'capitalize'}}>{row.scheduler}</StyledTableCell>
                <StyledTableCell align="center">{row.feature_coupon ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center">{row.is_active ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center">{row.single_use ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center" sx={{textTransform: 'capitalize'}}>{row.coupon_description}</StyledTableCell>
                <StyledTableCell align="center" sx={{display: 'flex'}}>
                    <Button variant="text" onClick={() => handleClickOpenUpdate(row)}><EditIcon /></Button>
                    <Button variant="text" onClick={handleClickOpenDelete} color="error"><DeleteForeverIcon /></Button>
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
})

export default Row;