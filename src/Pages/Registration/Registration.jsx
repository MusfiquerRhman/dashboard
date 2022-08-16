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
import * as authApi from '../../API/auth';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';

function Registration() {
    const navigate = useNavigate();
    const classes = style();

    const [password, handleChangePassword] = useInputState("");
    const [confrimPassword, handleChangeConfrimPassword] = useInputState("");
    const [phoneNo, handleChangePhoneNo] = useInputState("");
    const [email, handleChangeEmail] = useInputState("");
    const [isRegistrated, setIsRegistrated] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const admin_status = 'True';

    const submitForm = async (e) => {
        e.preventDefault();
        if (password === confrimPassword) {
            const res = await authApi.registration(email, password, phoneNo, admin_status);
            if (res === -1) {
                enqueueSnackbar("Error; Try again", { variant: 'error' });
            }
            else if (res.status === 200) {
                setIsRegistrated(true);
                enqueueSnackbar("Account successfully registered", { variant: 'success' });
            }
            else if (res.status === 422) {
                enqueueSnackbar("Validation error", { variant: 'error' });
            }
        }
        else {
            enqueueSnackbar("Passwords not matched", { variant: 'error' });
        }
    }

    useEffect(() => {
        if (isRegistrated) {
            navigate('/login');
        }
    });

    return (
        <div>
            <Paper elevation={6} className={classes.formBox} >
                <form className={classes.form}>

                    <Typography variant="h3">
                        New Registration:
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        <Grid container item direction="column" spacing={2} xs={12}>
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
                                <TextField id="registration-pass"
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    value={password}
                                    onChange={handleChangePassword}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-confrimPass"
                                    label="Confrim Password"
                                    variant="standard"
                                    value={confrimPassword}
                                    onChange={handleChangeConfrimPassword}
                                    type="password"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Registration</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Already have an account?
                                </Typography>
                                <Button fullWidth variant="contained" ><Link to="/login">Login</Link></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Registration;