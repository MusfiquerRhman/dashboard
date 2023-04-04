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
import imageCompression from 'browser-image-compression';
import { useSnackbar } from 'notistack';
import Style from '../../../Styles/GlobalStyles';

const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 200,
    useWebWorker: true
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VendorForm = React.memo((props) => {
    const classes = Style();
    const [displayImage, setDisplayImage] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [submitted, setSubmitted] = useState(false)

    const {
        formType,
        updateOpen,
        handleCloseUpdate,
        handleClickVendor,
        state,
        dispatch,
        ACTION_TYPE,
        setImage,
    } = props;
    
    //(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})

    const validateForm = () => {
        if(state.name.length < 2) {
            enqueueSnackbar("Enter a valid Name", { variant: 'error' });
            return;
        }
        
        if(state.email !== '' && !(/^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email))) {
            enqueueSnackbar("Enter a valid Email", { variant: 'error' });
            return;
        }
        
        if(state.phone !== '' && !(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/.test(state.phone))){
            enqueueSnackbar("Enter a valid Phone Number", { variant: 'error' });
            return;
        }
        
        if(state.zipCode !== '' && state.zipCode.length !== 5){
            enqueueSnackbar("Enter a valid Zip Code", { variant: 'error' });
            return;
        }

        if(state.website !== '' && !(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(state.website))){
            enqueueSnackbar("Enter a valid Website URL", { variant: 'error' });
            return;
        }

        if(state.facebook !== '' && !(/https?:\/\/((?:www.)?facebook.com)\/[a-zA-Z0-9/]/.test(state.facebook))){
            enqueueSnackbar("Enter a valid facebook URL", { variant: 'error' });
            return;
        }

        if(state.youtube !== '' && !(/https?:\/\/((?:www.)?youtube.com)\/[@a-zA-Z0-9/]/.test(state.youtube))){
            enqueueSnackbar("Enter a valid Youtube URL", { variant: 'error' });
            return;
        }

        if(state.instagram !== '' && !(/https?:\/\/((?:www.)?instagram.com)\/[a-zA-Z0-9/]/.test(state.instagram))){
            enqueueSnackbar("Enter a valid Instagram URL", { variant: 'error' });
            return;
        }

        if(state.twitter !== '' && !(/https?:\/\/((?:www.)?twitter.com)\/[a-zA-Z0-9/]/.test(state.twitter))){
            enqueueSnackbar("Enter a valid twitter URL", { variant: 'error' });
            return;
        }

        if(displayImage === ""){
            enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
            return;
        }

        setSubmitted(true);
        enqueueSnackbar(`Submitting, Please wait`, { variant: 'info' });

        handleClickVendor();
    }

    const onChangeInput = (event) => {
        dispatch({
            type: ACTION_TYPE.CHANGE_INPUT,
            payload: {
                name: event.target.name,
                value: event.target.value
            }
        })
    }

    const handleChangeCheck = (event) => {
        dispatch({
            type: ACTION_TYPE.CHANGE_INPUT,
            payload: {
                name: event.target.name,
                value: event.target.checked
            }
        })
    };

    const imageSelectHandler = async (files) => {
        try {
            const compressedFile = await imageCompression(files[0], options);
            setImage(compressedFile);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setDisplayImage(reader.result);
                }
            };
            if (files[0] && files[0].type.match("image.*")) {
                reader.readAsDataURL(files[0]);
            }
        } catch (error) {
            enqueueSnackbar(`Failed to compress image`, { variant: 'error' });
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
                    <Button autoFocus color="inherit" onClick={validateForm}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Box>
                    <Paper elevation={6} className={classes.formBox} >
                        <form className={classes.form}>
                            <Typography variant="h4" sx={{ padding: '1rem 0' }}>
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
                                            value={state.name}
                                            onChange={onChangeInput}
                                            name='name'
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
                                            value={state.email}
                                            onChange={onChangeInput}
                                            name='email'
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
                                            value={state.phone}
                                            onChange={onChangeInput}
                                            name='phone'
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
                                            value={state.description}
                                            onChange={onChangeInput}
                                            name='description'
                                            multiline
                                            rows={7}
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
                                            value={state.street1}
                                            onChange={onChangeInput}
                                            name='street1'
                                            multiline
                                            rows={2}
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
                                            value={state.street2}
                                            onChange={onChangeInput}
                                            name='street2'
                                            multiline
                                            rows={2}
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
                                            value={state.city}
                                            onChange={onChangeInput}
                                            name='city'
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
                                            value={state.state}
                                            onChange={onChangeInput}
                                            name='state'
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
                                            value={state.hours}
                                            name='hours'
                                            onChange={onChangeInput}
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
                                            value={state.zipCode}
                                            onChange={onChangeInput}
                                            name='zipCode'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <TextField id="registration-website"
                                            label="Website"
                                            type="url"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.website}
                                            onChange={onChangeInput}
                                            name='website'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p className='info' style={{marginBottom: '1rem'}}><i>
                                    Append https://www before the URl, ex: https://www.bestoflagoon.com
                                </i></p>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-requirements"
                                            label="Requirements"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.requirements}
                                            onChange={onChangeInput}
                                            name='requirements'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <TextField id="registration-facebook"
                                            label="Facebook"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.facebook}
                                            onChange={onChangeInput}
                                            name='facebook'
                                            placeholder='https://www.facebook.com/abc'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p className='info' style={{marginBottom: '1rem'}}><i>
                                    Append https://www before the URl, ex: https://www.facebook.com/abc
                                </i></p>
                                <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <TextField id="registration-instagram"
                                            label="Instagram"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.instagram}
                                            onChange={onChangeInput}
                                            name='instagram'
                                            placeholder='https://www.instagram.com/abc'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p className='info' style={{marginBottom: '1rem'}}><i>
                                    Append https://www before the URl, ex: https://www.instagram.com/abc
                                </i></p>
                                <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <TextField id="registration-youtube"
                                            label="Youtube"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.youtube}
                                            onChange={onChangeInput}
                                            name='youtube'
                                            placeholder='https://www.youtube.com/@abc'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p className='info' style={{marginBottom: '1rem'}}><i>
                                    Append https://www before the URl, ex: https://www.youtube.com/@abc
                                </i></p>
                                <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <TextField id="registration-twitter"
                                            label="Twitter"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.twitter}
                                            onChange={onChangeInput}
                                            name='twitter'
                                            placeholder='https://twitter.com/abc'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <p className='info' style={{marginBottom: '1rem'}}><i>
                                    Append https://www before the URl, ex: https://twitter.com/abc
                                </i></p>
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <TextField id="registration-bestOfLoganPicks"
                                            label="Best of Logan Picks"
                                            type="text"
                                            variant="outlined"
                                            sx={{backgroundColor: '#30C3CD20'}}
                                            value={state.bestOfLoganPicks}
                                            onChange={onChangeInput}
                                            name='bestOfLoganPicks'
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
                                                onChange={handleChangeCheck}
                                                name='isActive'
                                                checked={state.isActive}
                                                /> <span>Active</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                        <Grid item>
                                            <Checkbox
                                                label="Feature Vendor"
                                                name='featureVendor'
                                                onChange={handleChangeCheck}
                                                checked={state.featureVendor}
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
                                                    imageSelectHandler(e.target.files);
                                                }}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button disabled={submitted} fullWidth variant="contained" onClick={validateForm}>Submit</Button>
                                </Grid>
                            </Box>
                        </form>
                    </Paper>
                </Box >
            </DialogContent>
        </Dialog>
    )
})

export default VendorForm;