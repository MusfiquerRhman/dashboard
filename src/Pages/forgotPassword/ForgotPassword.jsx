import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userApi from '../../API/auth';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';

const ForgotPassword = () => {
    const [userEmail, handleChangeUserEmail] = useInputState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const classes = style();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = async (e) => {
        const res = await userApi.forgotPassword(userEmail);
        if (res === -1) {
            enqueueSnackbar("Error Logining in!", { variant: 'error' });
        } else if (res.status === 200) {
            setIsAuthenticated(true);
            enqueueSnackbar(res.data.message, { variant: 'success' });
        }
        else if (res.status === 422) {
            enqueueSnackbar("Validation Error!", { variant: 'error' });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    });

    return (
        <div>
            <Paper elevation={6} className={classes.formBox}>
                <form className={classes.form}>
                    <Typography variant="h3">
                        Reset Your Password:
                    </Typography>

                    <Box sx={{ width: '100%' }} >
                        <Grid container item direction="column" spacing={2} xs={12} >
                            <Grid item>
                                <TextField id="login-name"
                                    label="Email Address"
                                    variant="standard"
                                    value={userEmail}
                                    onChange={handleChangeUserEmail}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default ForgotPassword;