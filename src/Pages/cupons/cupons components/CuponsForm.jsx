import React, { useContext, useState } from 'react';
// MaterialUI Elements
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
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
        handleClickSubmit
    } = props;

    const { subCategories } = useContext(SubCategoryContext);
    const { vendors } = useContext(VendorContext);

    const [selectedVendorName, setSelectedVendorName] = useState("")
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("")

    // for controlling vendor selection menu
    const [anchorElVendorMenu, setAnchorElVendorMenu] = useState(null);

    const openVendorMenu = Boolean(anchorElVendorMenu);
    const handleClickVendorMenu = (event) => {
        setAnchorElVendorMenu(event.currentTarget);
    };
    const handleCloseVendorMenu = () => {
        setAnchorElVendorMenu(null);
    };

    const handleClickItemVendorMenu = (vid, vendor_name) => {
        setSelectedVendorName(vendor_name);
        setVid(vid);
        setAnchorElVendorMenu(null);
    }

    // for controlling subcategory selection menu
    const [anchorElSubCategory, setAnchorElSubCategory] = useState(null);

    const openSubCategory = Boolean(anchorElSubCategory);
    const handleClickSubCategoryMenu = (event) => {
        setAnchorElSubCategory(event.currentTarget);
    };
    const handleCloseSubCategory = () => {
        setAnchorElSubCategory(null);
    };

    const handleClickItemSubctegory = (scid, sub_category_name) => {
        setSelectedSubCategoryName(sub_category_name);
        setScid(scid);
        setAnchorElSubCategory(null);
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
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <Button
                                        id="basic-buttonVendor"
                                        aria-controls={openVendorMenu ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openVendorMenu ? 'true' : undefined}
                                        onClick={handleClickVendorMenu}
                                    >
                                        {selectedVendorName === '' ? "Select a vendor" : `Selected Vendor: ${selectedVendorName}`}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElVendorMenu}
                                        open={openVendorMenu}
                                        onClose={handleCloseVendorMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {vendors.map((element, index) => (
                                            <MenuItem key={index} onClick={() => handleClickItemVendorMenu(element.vid, element.vendor_name)}>{element.vendor_name}</MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                <Box sx={{ marginBottom: "1.5rem" }}>
                                    <Button
                                        id="basic-button"
                                        aria-controls={openSubCategory ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openSubCategory ? 'true' : undefined}
                                        onClick={handleClickSubCategoryMenu}
                                    >
                                        {selectedSubCategoryName === '' ? "Select a Sub-Category" : `Selected Sub-Category: ${selectedSubCategoryName}`}
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
                                            <MenuItem key={index} onClick={() => handleClickItemSubctegory(element.scid, element.sub_category_name)}>{element.sub_category_name}</MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                <Box sx={{ marginBottom: "1rem" }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Start Date"
                                            value={start_date}
                                            onChange={(newValue) => {
                                                setStartDate(newValue);
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
                                            onChange={(newValue) => {
                                                setEnddate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>

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