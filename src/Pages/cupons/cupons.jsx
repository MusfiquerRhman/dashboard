import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as couponsAPI from '../../API/coupons';
import useInputState from '../../Hooks/UseInputHook';
import Style from '../../Styles/GlobalStyles';
import ActiveAndFutureCoupons from './cupons components/ActiveAndFutureCoupons';
import AllCupons from './cupons components/AllCupons';
import CouponsByVendors from './cupons components/CouponsByVendors';
import CouponsForm from './cupons components/CuponsForm';
import ExpiredCoupons from './cupons components/ExpiredCoupons';
import FeaturedCoupons from './cupons components/FeaturedCoupons';

const Cupons = () => {
    const classes = Style()
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [addOpen, setAddOpen] = useState(false);
    const handleCloseAdd = () => {
        setAddOpen(false);
    }

    const handleClickOpenAdd = () => {
        setAddOpen(true);
    }

    const [coupon_code, handleChangeCoupon_code] = useInputState('')
    const [percentage_off, handleChangePercentage_off] = useInputState('');
    const [single_use, setSingle_use] = useState(false)
    const [feature_coupon, setFeature_coupon] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEnddate] = useState(new Date());
    const [vid, setVid] = useState('');
    const [scid, setScid] = useState('');

    const handleChangeSingle_use = (event) => {
        setSingle_use(event.target.checked);
    };

    const handleChangeFeature_coupon = (event) => {
        setFeature_coupon(event.target.checked);
    };

    const handleChangeIs_Active = (event) => {
        setIsActive(event.target.checked);
    };


    const addForm = async () => {
        couponsAPI.addCoupons(vid, scid, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date).then(res => {
            console.log(res)
            if (res.status === 200) {
                enqueueSnackbar(`Successfully Added`, { variant: 'info' });
                window.location.reload();
            }
            else {
                enqueueSnackbar(`Failed to Add`, { variant: 'error' });
            }
        });
    }

    return (
        <>
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
                formType="Add"
                handleCloseUpdate={handleCloseAdd}
                updateOpen={addOpen}
                setStartDate={setStartDate}
                setEnddate={setEnddate}
                isActive={isActive}
                handleChangeIs_Active={handleChangeIs_Active}
                setVid={setVid}
                setScid={setScid}
                vid = ''
                scid = ''
                handleClickSubmit={addForm}
            />

            <div className={classes.form}>
                <div className={classes.header}>
                    <h1>All Coupons</h1>
                    <Button className={classes.button} variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>Add a new Coupon</Button>
                </div>
                <div>
                    <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                        <TabContext value={value} >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="All Coupons" value="1" />
                                <Tab label="Featured Coupons" value="2" />
                                <Tab label="Expired Coupons" value="3" />
                                <Tab label="Active and future coupons" value="4" />
                                <Tab label="Coupons by Vendors" value="5" />

                            </Tabs>
                            <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="1">< AllCupons /></TabPanel>
                            <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="2">< FeaturedCoupons /></TabPanel>
                            <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="3">< ExpiredCoupons /></TabPanel>
                            <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="4">< ActiveAndFutureCoupons /></TabPanel>
                            <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="5">< CouponsByVendors /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </>

    )
}

export default Cupons;

