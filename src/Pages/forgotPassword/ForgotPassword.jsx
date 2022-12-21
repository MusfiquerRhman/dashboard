import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [otp, setOtp] = useState('');
    const [userOTP, handleChangeUserOTP] = useInputState('');
    const [isVerified, setIsVerified] = useState(false);
    const [newPassword, handleChangeNewPassword] = useInputState("");
    const [confirmPassword, handleChangeConfirmPassword] = useInputState("");
    const [passwordResetDone, setPasswordResetDone] = useState(false)

    const classes = style();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = async () => {
        const res = await userApi.sendOTP(userEmail);
        if (res === -1) {
            enqueueSnackbar("Error Logging in!", { variant: 'error' });
        } else if (res.status === 200) {
            setIsOTPSent(true);
            setSessionId(res.data.session_id)
            setOtp(res.data.otp_code)
            enqueueSnackbar(res.data.message, { variant: 'success' });
            console.log(res.data)
        }
        else if (res.status === 422) {
            enqueueSnackbar("Validation Error!", { variant: 'error' });
        }
    }

    const submitOTPForm = async (e) => {
        console.log({otp, userOTP})
        if(otp !== userOTP){
            enqueueSnackbar("Error OTP not matched!", { variant: 'error' });
        }
        else {
            const res = await userApi.verifyOTP(userEmail, sessionId, userOTP);
            if(res === -1){
                enqueueSnackbar("Error OTP not matched!", { variant: 'error' });
            }
            else if (res.status === 200){
                setIsVerified(true);
            }
        }
    }

    const resetPassword = async () => {
        if(newPassword === confirmPassword){
            const res = await userApi.resetPassword(sessionId, newPassword, confirmPassword);
            if (res === -1) {
                enqueueSnackbar("Error Changing Password", { variant: 'error' });
            } else if (res.status === 200) {
                setPasswordResetDone(true)
                enqueueSnackbar(res.data.message, { variant: 'success' });
            }
        }
        else {
            enqueueSnackbar("Password not matched", { variant: 'error' });
        }
    }

    useEffect(() => {
        if (passwordResetDone) {
            navigate('/');
        }
    }, [navigate, passwordResetDone]);

    return (
        <div>
            {(!isVerified && !isOTPSent) && (
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
                                    <Button startIcon={<VpnKeyIcon />} fullWidth onClick={submitForm} variant="contained">Receive OTP</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            )}
            {(!isVerified && isOTPSent) && (
                <Paper elevation={6} className={classes.formBox}>
                    <form className={classes.form}>
                        <Typography variant="h5">
                            Enter the OPT code sent in your email:
                        </Typography>

                        <Box sx={{ width: '100%' }} >
                            <Grid container item direction="column" spacing={2} xs={12} >
                                <Grid item>
                                    <TextField id="login-name"
                                        label="OTP Code"
                                        variant="standard"
                                        value={userOTP}
                                        onChange={handleChangeUserOTP}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <Button startIcon={<VerifiedUserIcon/>} fullWidth onClick={submitOTPForm} variant="contained">Verify OTP</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            )}
            {isVerified && (
                <Paper elevation={6} className={classes.formBox}>
                <form className={classes.form}>
                    <Typography variant="h3">
                        Reset Your Password:
                    </Typography>
    
                    <Box sx={{ width: '100%' }} >
                        <Grid container item direction="column" spacing={2} xs={12} >
                            <Grid item>
                                <TextField id="new-pass"
                                    label="New Password"
                                    variant="standard"
                                    type="password"
                                    value={newPassword}
                                    onChange={handleChangeNewPassword}
                                    required
                                    fullWidth
                                />
                            </Grid>                        
                            <Grid item>
                                <TextField id="confirm-pass"
                                    label="Confirm Password"
                                    type="password"
                                    variant="standard"
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPassword}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={resetPassword} variant="contained">Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
            )}
        </div>
    )
}

export default ForgotPassword;