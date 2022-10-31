import React, { useState } from 'react';
// MaterialUI Elements
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Style from '../../../Styles/GlobalStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VendorForm = (props) => {
    const classes = Style();
    const [displayImage, setDisplayImage] = useState("");

    const {
        formType,
        updateOpen,
        handleCloseUpdate,
        handleClickVendor,
        name,
        handleChangeName,
        email,
        handleChangeEmail,
        phone,
        handleChangePhone,
        description,
        handleChangeDescription,
        street1,
        handleChangeStreet1,
        street2,
        handleChangeStreet2,
        city,
        handleChangeCity,
        state,
        handleChangeState,
        hours,
        handleChangeHours,
        zip_code,
        handleChangeZip_code,
        website,
        handleChangeWebsite,
        requirements,
        handleChangeRequirements,
        handleChangeis_active,
        is_active,
        handleChangefeature_vendor,
        feature_vendor,
        setImage,
    } = props;

    const imageSelectHandeler = (files) => {
        setImage(files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDisplayImage(reader.result);
            }
        };
        if (files[0] && files[0].type.match("image.*")) {
            reader.readAsDataURL(files[0]);
        }
    };

    let imageSelectedMsg = (
        <Typography variant="h6" className={classes.imagetext}>
            Select an Image
        </Typography>
    );
    if (displayImage !== "") {
        imageSelectedMsg = (
            <img src={displayImage} className={classes.image} alt="product" />
        );
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="span">
                        {formType} Vendor
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClickVendor}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Box>
                    <Paper elevation={6} className={classes.formBox} >
                        <form className={classes.form}>
                            <Typography variant="h4" sx={{ padding: '1rem 3rem' }}>
                                Enter Vendor Details:
                            </Typography>

                            <Box sx={{ width: '100%' }}>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-name"
                                            label="Name"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={name}
                                            onChange={handleChangeName}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={email}
                                            onChange={handleChangeEmail}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-phone"
                                            label="Phone number"
                                            type="tel"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={phone}
                                            onChange={handleChangePhone}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-description"
                                            label="Description"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={description}
                                            onChange={handleChangeDescription}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-street1"
                                            label="Street 1"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={street1}
                                            onChange={handleChangeStreet1}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-street2"
                                            label="Street 2"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={street2}
                                            onChange={handleChangeStreet2}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-city"
                                            label="City"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={city}
                                            onChange={handleChangeCity}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-state"
                                            label="State"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state}
                                            onChange={handleChangeState}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-hours"
                                            label="Hours"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={hours}
                                            onChange={handleChangeHours}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-zip"
                                            label="Zip Code"
                                            type="number"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={zip_code}
                                            onChange={handleChangeZip_code}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-website"
                                            label="Website"
                                            type="url"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={website}
                                            onChange={handleChangeWebsite}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-requirements"
                                            label="Requirements"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={requirements}
                                            onChange={handleChangeRequirements}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p style={{fontSize: '1.15rem'}}>Select the appropriate box: </p>
                                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                                    <Grid container item direction="column" spacing={2} xs={12}>
                                        <Grid item>
                                            <Checkbox
                                                label="Is Active"
                                                onChange={handleChangeis_active}
                                                checked={is_active}
                                                /> <span>Active</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                        <Grid item>
                                            <Checkbox
                                                label="Feture Vendor"
                                                onChange={handleChangefeature_vendor}
                                                checked={feature_vendor}
                                                /> <span>Feature Vendor</span>
                                        </Grid>
                                    </Grid>
                                </div>
                                {imageSelectedMsg}
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            sx={{ marginTop: "1rem" }}
                                            startIcon={<CameraAltIcon />}
                                        >
                                            Select a vendor image
                                            <input
                                                name="image"
                                                type="file"
                                                onChange={(e) => {
                                                    imageSelectHandeler(e.target.files);
                                                }}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button fullWidth variant="contained" onClick={handleClickVendor}>Submit</Button>
                                </Grid>
                            </Box>
                        </form>
                    </Paper>
                </Box >
            </DialogContent>
        </Dialog>
    )
}

export default VendorForm;