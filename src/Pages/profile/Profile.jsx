import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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

    useEffect(() => {
        userAPI.getUserProfile().then((user) => {
            setPhoneNo(user.data.phone)
            setEmail(user.data.email)
            setFullName(user.data.fullname === null ? "" : user.data.fullname)
            setZip(user.data.zip === null ? "" : user.data.zip);
        })
    }, [])

    const submitForm = async (e) => {
        const res = await userAPI.updateUserProfile(fullName, phoneNo, zip);
        if (res === -1) {
            enqueueSnackbar("Error; Try again", { variant: 'error' });
        }
        else if (res.status === 200) {
            enqueueSnackbar("Account successfully updated", { variant: 'success' });
        }
    }

    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const deleteForm = async () => {
        const res = await userAPI.deleteUserProfile();
        console.log(res);
        if (res === -1) {
            enqueueSnackbar("Error; Try again", { variant: 'error' });
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
                            </Grid>                            <Grid item>
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
                            <Grid item>
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
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Update</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Caution, Action can't be reversed
                                </Typography>
                                <Button fullWidth variant="contained" color="error" onClick={handleClickOpenDelete}>Delete Account</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Profile;


