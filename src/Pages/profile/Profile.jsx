import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React, { useEffect, useState } from 'react';
// MaterialUI Elements
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as userAPI from '../../API/user';
import ConfrimDeleteDialogue from '../../Components/ConfrimDeleteDialogue';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';

function Profile() {
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();

    const [phoneNo, handleChangePhoneNo, setPhoneNo] = useInputState("");
    const [email, handleChangeEmail, setEmail] = useInputState("");
    const [fullName, handleChangeFullName, setFullName] = useInputState("");
    const [zip, handleChangeZip, setZip] = useInputState("");
    const [displayImage, setDisplayImage] = useState("");
    const [Image, setImage] = useState('');
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        userAPI.getUserProfile().then((user) => {
            setPhoneNo(user.data.phone)
            setEmail(user.data.email)
            setFullName(user.data.fullname === null ? "" : user.data.fullname);
            setDisplayImage(user.data.profile_logo_path)
            setZip(user.data.zip === null ? "" : user.data.zip);
        })
    }, [setEmail, setFullName, setPhoneNo, setZip])

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

    let imageSelectedMsg = '';
    if (displayImage !== "") {
        imageSelectedMsg = (
            <img src={displayImage} className={classes.image} alt="product" />
        );
    }

    const submitForm = async (e) => {
        if(fullName.length < 1) {
            enqueueSnackbar("Enter a valid name", { variant: 'error' });
            return;
        }

        if(zip.length !== 5) {
            enqueueSnackbar("Enter a valid zip code", { variant: 'error' });
            return;
        }

        if(!(/^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            enqueueSnackbar("Enter a valid email", { variant: 'error' });
            return;
        }

        if(!(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/.test(phoneNo))){
            enqueueSnackbar("Enter a valid Phone Number", { variant: 'error' });
            return;
        }

        setSubmitted(true);
        enqueueSnackbar(`Submitting, Please wait`, { variant: 'info' });

        const res = await userAPI.updateUserProfile(fullName, phoneNo, zip);
        if (res === -1) {
            enqueueSnackbar("Connection Error, Try again", { variant: 'error' });
        }
        else if (res.status === 200) {
            enqueueSnackbar("Account successfully updated", { variant: 'success' });
        }

        if(imageSelectedMsg !== ''){
            const imageUpdateResponse = await userAPI.updateProfilePicture(Image);
            if(imageUpdateResponse === -1){
                enqueueSnackbar("Connection Error, Try again", { variant: 'error' });
            }
            else if (res.status === 200) {
                enqueueSnackbar("Profile Picture successfully updated", { variant: 'success' });
            }
        }

        setTimeout(() => {
            setSubmitted(false);
        }, 2000);
    }

    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const deleteForm = async () => {
        setSubmitted(true)

        const res = await userAPI.deleteUserProfile();
        if (res === -1) {
            enqueueSnackbar("Connection Error, Try again", { variant: 'error' });
            localStorage.removeItem('userInformations');
            window.location.reload();
        }
        else if (res.status === 200) {
            enqueueSnackbar("Account successfully updated", { variant: 'success' });
        }
    }

    return (
        <div>
            <ConfrimDeleteDialogue
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                name={fullName}
                deleteForm={deleteForm}
            />

            <Paper elevation={6} className={classes.formBox} >
                <form className={classes.form}>

                    <Typography variant="h3">
                        Your Profile:
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        <Grid container item direction="column" spacing={2} xs={12}>
                            <Grid item>

                            </Grid>
                            <Grid item>
                                <TextField id="registration-name"
                                    label="Full Name"
                                    type="text"
                                    variant="standard"
                                    value={fullName}
                                    onChange={handleChangeFullName}
                                    required
                                    fullWidth
                                />
                            </Grid>                            
                            <Grid item>
                                <TextField id="registration-zip"
                                    label="Zip Code"
                                    type="number"
                                    variant="standard"
                                    value={zip}
                                    onChange={handleChangeZip}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item>
                                <TextField id="registration-email"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sx={{marginBottom: '1rem'}}>
                                <TextField id="registration-phoneNo"
                                    label="Phone NO"
                                    variant="standard"
                                    type="tel"
                                    value={phoneNo}
                                    onChange={handleChangePhoneNo}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            {imageSelectedMsg}
                            <Grid container item direction="column" spacing={2} xs={12}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            sx={{ marginTop: "1rem" }}
                                            startIcon={<CameraAltIcon />}
                                        >
                                            Select a profile image
                                            <input
                                                name="image"
                                                type="file"
                                                onChange={(e) => {
                                                    imageSelectHandeler(e.target.files);
                                                }}
                                                hidden
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            <Grid item>
                                <Button disabled={submitted} fullWidth onClick={submitForm} variant="contained" >Update</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Caution, Action can't be reversed
                                </Typography>
                                <Button disabled={submitted} fullWidth variant="contained" color="error" onClick={handleClickOpenDelete}>Delete Account</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Profile;


