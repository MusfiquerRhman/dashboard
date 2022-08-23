import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import * as couponsAPI from '../../../API/coupons';
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import { SubCategoryContext } from "../../../Context APIs/subcategoriesContext";
import useInputState from '../../../Hooks/UseInputHook';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';
import CouponsForm from './CuponsForm';

const Row = (props) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { subCategories } = useContext(SubCategoryContext);

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
    const [end_date, setEnddate] = useState(new Date());
    const [vid, setVid] = useState('');
    const [scid, setScid] = useState('');
    const updateDate = new Date();
    const subCategoryName = subCategories.find((element) => element.scid === row.history.scid)?.sub_category_name;


    const handleClickOpenUpdate = (row) => {
        setCouponCode(row.coupon_code);
        setPercentageOff(row.percentage_off);
        setSingle_use(row.single_use);
        setFeature_coupon(row.feature_coupon);
        setIsActive(row.is_active);
        setStartDate(row.start_date);
        setEnddate(row.end_date);
        setVid(row.history.vid);
        setScid(row.history.scid)
        setUpdateOpen(true);
    }

    const handleChangeSingle_use = (event) => {
        setSingle_use(event.target.checked);
    };

    const handleChangeFeature_coupon = (event) => {
        setFeature_coupon(event.target.checked);
    };

    const handleChangeIs_Active = (event) => {
        setIsActive(event.target.checked);
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

    const updateForm = async () => {
        //coupon_id, vendor_id, subcategory_id, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date, updateDate
        // console.log({"Coupons Id": row.history.coupon_id, "vid": vid, "sid": scid, "coupon code": coupon_code, "off": percentage_off, 
        //     'single': single_use, 'feature': feature_coupon, 'start': start_date, 'end': end_date, 'update': updateDate})
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
            updateDate).then(res => {
                console.log(res)
                if (res.status === 200) {
                    enqueueSnackbar(`Successfully updated`, { variant: 'info' });
                    window.location.reload();
                }
                else {
                    enqueueSnackbar(`Failed to Update`, { variant: 'error' });
                }
            });
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
                setVid={setVid}
                setScid={setScid}
                scid={scid}
                vid={vid}
                handleClickSubmit={updateForm}
            />

            <ConfrimDeleteDialogue
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                name={row.coupon_code}
                deleteForm={deleteForm}
            />

            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <StyledTableCell align="center" component="th" scope="row">{row.coupon_code}</StyledTableCell>
                <StyledTableCell align="center">{row.start_date}</StyledTableCell>
                <StyledTableCell align="center">{row.end_date}</StyledTableCell>
                <StyledTableCell align="center">{subCategoryName}</StyledTableCell>
                <StyledTableCell align="center">{row.percentage_off}</StyledTableCell>
                <StyledTableCell align="center">{row.feature_coupon ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center">{row.is_active ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center">{row.single_use ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>
                <StyledTableCell align="center"><Button variant="text" onClick={() => handleClickOpenUpdate(row)}><EditIcon /></Button></StyledTableCell>
                <StyledTableCell align="center"><Button variant="text" onClick={handleClickOpenDelete} color="error"><DeleteForeverIcon /></Button></StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}

export default Row;