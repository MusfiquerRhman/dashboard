import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Link } from 'react-router-dom';

import * as userApi from '../../API/auth';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';

const Login = () => {
    const [userEmail, handleChangeUserEmail] = useInputState("");
    const [password, handleChangePassword] = useInputState("");
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = async (e) => {
        if(!(/^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail))) {
            enqueueSnackbar("Enter a valid email", { variant: 'error' });
            return;
        }

        if(password.length < 1){
            enqueueSnackbar("Enter a valid password", { variant: 'error' });
            return;
        }

        const res = await userApi.login(userEmail, password);
        if (res === -1) {
            enqueueSnackbar("Error Logging in!", { variant: 'error' });
        } else if (res.status === 200) {
            localStorage.setItem('userInformations', JSON.stringify(res.data));
            localStorage.setItem('last_login', new Date().getTime());
            window.location.reload();
        }
        else if (res.status === 422) {
            enqueueSnackbar("Validation Error!", { variant: 'error' });
        }
    }

    return (
        <div>
            <Paper elevation={6} className={classes.formBox}>
                <form className={classes.form}>
                    <Typography variant="h3">
                        Login:
                    </Typography>

                    <Box sx={{ width: '100%' }} >
                        <Grid container item direction="column" spacing={2} xs={12} >
                            <Grid item>
                                <TextField id="login-name"
                                    label="User Email"
                                    variant="standard"
                                    value={userEmail}
                                    onChange={handleChangeUserEmail}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="login-company"
                                    label="Password"
                                    variant="standard"
                                    value={password}
                                    type="password"
                                    onChange={handleChangePassword}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Login</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Do not have an account?
                                </Typography>
                                <Button fullWidth variant="contained" ><Link to="/registration">new registration</Link></Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Forgot password?
                                </Typography>
                                <Button fullWidth variant="outlined" ><Link to="/forgotpassword">Reset Password</Link></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Login;