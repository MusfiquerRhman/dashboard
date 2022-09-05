import React, { useContext, useEffect, useState } from 'react';
// MaterialUI Elements
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SubCategoryContext } from '../../../Context APIs/subcategoriesContext';
import { VendorContext } from '../../../Context APIs/vendorContext';
import Style from '../../../Styles/GlobalStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CouponsForm = (props) => {
    const classes = Style();

    const [anchorElSubCategory, setAnchorElSubCategory] = React.useState(null);
    const openSubCategory = Boolean(anchorElSubCategory);

    const handleClickSubCategory = (event) => {
        setAnchorElSubCategory(event.currentTarget);
    };

    const handleCloseSubCategory = () => {
        setAnchorElSubCategory(null);
    };

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
        coupnsDescription,
        handleChangeCouponDescription,
        handleClickSubmit,
    } = props;

    const [selectedVendorName, setSelectedVendorName] = useState('')
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState([])

    const { subCategories } = useContext(SubCategoryContext);
    const { vendors } = useContext(VendorContext);

    useEffect(() => {
        const selectedVendor = vid !== '' ? vendors.find((element) => element.vid === vid)?.vendor_name : '';
        // const subCategoryName = scid !== '' ? subCategories.find((element) => element.scid === scid)?.sub_category_name : '';
        // setSelectedSubCategoryName(subCategoryName)
        setSelectedVendorName(selectedVendor)
    }, [vid, vendors])

    const handleClickItemVendorMenu = (vid, vendor_name) => {
        setSelectedVendorName(vendor_name);
        setVid(vid);
    }

    const handleClickItemSubctegory = (id, sub_category_name) => {
        if(scid.indexOf(id) === -1){
            setSelectedSubCategoryName(prevName => [...prevName, sub_category_name]);
            setScid(prevScid => [...prevScid, id]);
        }
    }

    const handleDeleteSubCategory = (value) => {
        let id = subCategories.find(item => item.sub_category_name === value).scid;
        setSelectedSubCategoryName(prevName => prevName.filter(item => item !== value));
        setScid(prevScid => prevScid.filter(item => item !== id));
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
                    <Button autoFocus color="inherit" onClick={handleClickSubmit}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div>
                    <Paper elevation={6} className={classes.formBox} >
                        <form className={classes.form}>
                            <Typography variant="h4" sx={{ padding: '1rem 3rem' }}>
                                Enter Coupons Details:
                            </Typography>

                            <Box sx={{ width: '100%' }}>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-coupon-code"
                                            label="Coupon Code"
                                            type="text"
                                            variant="standard"
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
                                            label="Percentage off"
                                            type="number"
                                            variant="standard"
                                            value={percentage_off}
                                            onChange={handleChangePercentage_off}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
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
                                <Box sx={{ marginBottom: "1.5rem" }}>
                                    <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
                                        <InputLabel id="demo-simple-select-label">Select a Vendor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedVendorName}
                                            label="Select a Vendor"
                                        >
                                            {vendors.map((element, index) => (
                                                <MenuItem key={index}
                                                    onClick={() => handleClickItemVendorMenu(element.vid, element.vendor_name)}
                                                    value={element.vendor_name}>{element.vendor_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select a Sub-Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedSubCategoryName}
                                            label="Select a Sub-Category"
                                        >
                                            {subCategories.map((element, index) => (
                                                <MenuItem key={index}
                                                    onClick={() => handleClickItemSubctegory(element.scid, element.sub_category_name)}
                                                    value={element.sub_category_name}>{element.sub_category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl> */}


                                    <div className={classes.chip__container}>
                                        <div className='chips'>
                                            {selectedSubCategoryName.map((value) => (
                                                <Chip sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                                    key={value}
                                                    label={value}
                                                    onDelete={() => handleDeleteSubCategory(value)}
                                                />
                                            ))}
                                        </div>
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={openSubCategory ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openSubCategory ? 'true' : undefined}
                                                onClick={handleClickSubCategory}
                                                startIcon={<AddIcon />}
                                                sx={{ borderRadius: '2rem' }}
                                            >
                                                Add
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorElSubCategory}
                                                open={openSubCategory}
                                                onClose={handleCloseSubCategory}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                {subCategories.map((element, index) => (
                                                    <MenuItem key={index}
                                                        onClick={() => handleClickItemSubctegory(element.scid, element.sub_category_name)}
                                                        value={element.sub_category_name}>{element.sub_category_name}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                    </div>
                                </Box>
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Start Date"
                                            value={start_date}
                                            disablePast
                                            onChange={(newValue) => {
                                                setStartDate(new Date(newValue).toISOString().substring(0, 10));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <br />
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="End Date"
                                            value={end_date}
                                            disablePast
                                            onChange={(newValue) => {
                                                setEnddate(new Date(newValue).toISOString().substring(0, 10));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-coupon-code"
                                            label="Coupon Description"
                                            type="text"
                                            variant="standard"
                                            value={coupnsDescription}
                                            onChange={handleChangeCouponDescription}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Button fullWidth variant="contained" onClick={handleClickSubmit}>Submit</Button>
                                </Grid>
                            </Box>
                        </form>
                    </Paper>
                </div >
            </DialogContent>
        </Dialog>
    )
}

export default CouponsForm;