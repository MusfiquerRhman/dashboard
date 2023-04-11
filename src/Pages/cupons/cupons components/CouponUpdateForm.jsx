import React, { useContext, useEffect, useState } from 'react';
// MaterialUI Elements
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { SubCategoryContext } from '../../../Context APIs/subcategoriesContext';
import { VendorContext } from '../../../Context APIs/vendorContext';
import Style from '../../../Styles/GlobalStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CouponsForm = React.memo((props) => {
    const classes = Style();
    const { enqueueSnackbar } = useSnackbar();

    const {
        coupon_code,
        handleChangeCoupon_code,
        percentage_off,
        handleChangePercentage_off,
        single_use,
        handleChangeSingle_use,
        feature_coupon,
        handleChangeFeature_coupon,
        start_date,
        end_date,
        setStartDate,
        setEnddate,
        handleCloseUpdate,
        updateOpen,
        formType,
        isActive,
        handleChangeIs_Active,
        setVid,
        setScid,
        vid,
        scid,
        scheduler,
        handleChangeCouponScheduler,
        coupnsDescription,
        handleChangeCouponDescription,
        handleClickSubmit,
    } = props;


    let date = new Date();
    let day = date.getDate();
    if(day < 10) day = `0${day}`;
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let year = date.getFullYear();
    let today = `${year}-${month}-${day}`

    const [submitted, setSubmitted] = useState(false)
    const [selectedVendorName, setSelectedVendorName] = useState('')
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('')

    const { subCategories } = useContext(SubCategoryContext);
    const { vendors } = useContext(VendorContext);


    const validateCoupons = () => {
        if (coupon_code.length < 1) {
            enqueueSnackbar(`Enter a valid coupon code`, { variant: 'error' });
            return;
        }

        if (percentage_off.length < 1) {
            enqueueSnackbar(`Enter a valid deal type`, { variant: 'error' });
            return;
        }


        if (selectedVendorName.length < 1) {
            enqueueSnackbar(`Enter a valid vendor`, { variant: 'error' });
            return;
        }

        if (selectedSubCategoryName.length < 1) {
            enqueueSnackbar(`Enter a valid subcategory`, { variant: 'error' });
            return;
        }

        if (coupnsDescription.length < 1) {
            enqueueSnackbar(`Enter a valid description`, { variant: 'error' });
            return;
        }

        if (new Date(end_date) < new Date(start_date)) {
            enqueueSnackbar(`End Date must be equal or greater than start date`, { variant: 'error' });
            return;
        }

        setSubmitted(true);
        enqueueSnackbar(`Submitting, Please wait`, { variant: 'info' });

        handleClickSubmit();

        setTimeout(() => {
            setSubmitted(false);
        }, 2000);
    }

    useEffect(() => {
        const selectedVendor = vid !== '' ? vendors.find((element) => element.vid === vid)?.vendor_name : '';
        const subCategoryName = scid !== '' ? subCategories.find((element) => element.scid === scid)?.sub_category_name : '';
        setSelectedSubCategoryName(subCategoryName)
        setSelectedVendorName(selectedVendor)
    }, [vid, scid, vendors, subCategories])

    const handleClickItemVendorMenu = (vid, vendor_name) => {
        setSelectedVendorName(vendor_name);
        setVid(vid);
    }

    const handleClickItemSubctegory = (scid, sub_category_name) => {
        setSelectedSubCategoryName(sub_category_name);
        setScid(scid);
    }

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleChangeEndDate = (e) => {
        setEnddate(e.target.value);
    }


    return (
        <Dialog
            fullScreen
            open={updateOpen}
            onClose={handleCloseUpdate}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseUpdate}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {formType} Coupons
                    </Typography>
                    <Button autoFocus color="inherit" onClick={validateCoupons}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div>
                    <Paper elevation={6} className={classes.formBox} >
                        <form className={classes.form}>
                            <Typography variant="h4" sx={{ padding: '1rem 0' }}>
                                Update Coupon Details:
                            </Typography>

                            <Box sx={{ width: '100%' }}>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-coupon-code"
                                            label="Coupon Code"
                                            type="text"
                                            variant="outlined"
                                            sx={{ backgroundColor: '#30C3CD20' }}
                                            value={coupon_code}
                                            onChange={handleChangeCoupon_code}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-percentage_off"
                                            label="Deal Type"
                                            type="text"
                                            variant="outlined"
                                            sx={{ backgroundColor: '#30C3CD20' }}
                                            value={percentage_off}
                                            onChange={handleChangePercentage_off}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p style={{ fontSize: '1.15rem' }}>Select the appropriate box/s: </p>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <Grid container item direction="column" spacing={2} xs={12}>
                                        <Grid item>
                                            <Checkbox
                                                label="Is Active"
                                                onChange={handleChangeSingle_use}
                                                checked={single_use}
                                            /> <span>Single Use</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="column" spacing={2} xs={12}>
                                        <Grid item>
                                            <Checkbox
                                                label="Feture Vendor"
                                                onChange={handleChangeFeature_coupon}
                                                checked={feature_coupon}
                                            /> <span>Feature Coupon</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                        <Grid item>
                                            <Checkbox
                                                label="Feture Vendor"
                                                onChange={handleChangeIs_Active}
                                                checked={isActive}
                                            /> <span>Is Active</span>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Box sx={{ marginBottom: "1.5rem" }}>
                                    <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
                                        <InputLabel id="demo-simple-select-label">Select a Vendor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedVendorName}
                                            label="Select a Vendor"
                                            sx={{ backgroundColor: '#30C3CD20' }}
                                        >
                                            {vendors?.map((element, index) => (
                                                <MenuItem key={index}
                                                    onClick={() => handleClickItemVendorMenu(element.vid, element.vendor_name)}
                                                    value={element.vendor_name}
                                                >
                                                    {element.vendor_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select a Sub-Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedSubCategoryName}
                                            label="Select a Sub-Category"
                                            sx={{ backgroundColor: '#30C3CD20' }}
                                        >
                                            {subCategories?.map((element, index) => (
                                                <MenuItem key={index}
                                                    onClick={() => handleClickItemSubctegory(element.scid, element.sub_category_name)}
                                                    value={element.sub_category_name}
                                                >
                                                    {element.sub_category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <Box sx={{ marginBottom: "1rem", width: '50%', marginRight: '0.5rem' }}>
                                        <div className='input--container'>
                                            <label htmlFor='date'>Start Date</label>
                                            <input id='date' className='input--date'
                                                type="date"
                                                name={'Start Date'}
                                                min={today}
                                                value={start_date}
                                                onChange={handleChangeStartDate}
                                            />
                                        </div>
                                    </Box>
                                    <br />
                                    <Box sx={{ marginBottom: "1rem", width: '50%', marginLeft: '0.5rem' }}>
                                        <div className='input--container'>
                                            <label htmlFor='date'>End Date</label>
                                            <input id='date' className='input--date'
                                                type="date"
                                                name={'end Date'}
                                                min={start_date}
                                                value={end_date}
                                                onChange={handleChangeEndDate}
                                            />
                                        </div>
                                    </Box>
                                </div>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-coupon-code"
                                            label="Coupon Description"
                                            type="text"
                                            value={coupnsDescription}
                                            onChange={handleChangeCouponDescription}
                                            required
                                            fullWidth
                                            multiline
                                            rows={7}
                                            variant="outlined"
                                            sx={{ backgroundColor: '#30C3CD20' }}
                                        />
                                    </Grid>
                                </Grid>

                                <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
                                    <InputLabel id="demo-simple-select-label">Scheduler</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-scheduler"
                                        id="demo-simple-scheduler"
                                        value={scheduler}
                                        label="Scheduler"
                                        onChange={handleChangeCouponScheduler}
                                        sx={{ backgroundColor: '#30C3CD20' }}
                                    >
                                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                                    </Select>
                                </FormControl>

                                <Grid item>
                                    <Button disabled={submitted} fullWidth variant="contained" onClick={validateCoupons}>Submit</Button>
                                </Grid>
                            </Box>
                        </form>
                    </Paper>
                </div >
            </DialogContent>
        </Dialog>
    )
})

export default CouponsForm;