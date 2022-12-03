import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as userApi from '../../API/auth';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';


const ResetPassword = () => {
    const classes = style();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const query = new URLSearchParams(useLocation().search);

    const [newPassword, handleChangeNewPassword] = useInputState("");
    const [confirmPassword, handleChangeConfirmPassword] = useInputState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const submitForm = async (e) => {
        if(newPassword === confirmPassword){
            const res = await userApi.resetPassword(query.get("reset_password_token"), newPassword, confirmPassword);
            if (res === -1) {
                enqueueSnackbar("Error Changing Password", { variant: 'error' });
            } else if (res.status === 200) {
                setIsAuthenticated(true);
                enqueueSnackbar(res.data.message, { variant: 'success' });
            }
        }
        else {
            enqueueSnackbar("Password not matched", { variant: 'error' });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    });

    return (
        <div style={{marginTop: '5rem'}}>
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
                            <Button fullWidth onClick={submitForm} variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Paper>
    </div>
    )
}

export default ResetPassword;