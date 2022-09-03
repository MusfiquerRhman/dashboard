import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import * as userAPI from '../../API/user';
import style from '../../Styles/GlobalStyles';
import AdminTable from './AdminTable';

const Users = () => {
    const classes = style();
    const [adminUserCount, setAdminUserCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [allAdmin, setAllAdmin] = useState([]);

    const handleLogOut = async () => {
        userAPI.logout();
        localStorage.removeItem('userInformations');
        window.location.reload();
    }

    useEffect(() => {
        try {
            userAPI.adminUserCount().then(res => {
                setAdminUserCount(res.data.count)
            });
        }
        catch (e) {
            handleLogOut();
        }
    }, []);

    useEffect(() => {
        try {
            userAPI.userCount().then(res => {
                setUserCount(res.data.count)
            });
        }
        catch (e) {
            handleLogOut();
        }
    }, []);

    useEffect(() => {
        try {
            userAPI.getAllAdmin().then(res => {
                setAllAdmin(res.data);
            });
        }
        catch (e) {
            handleLogOut();
        }
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                <Grid item xs={3}>
                    <Card className={classes.form}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Admins: {adminUserCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.form}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Total Users: {userCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <AdminTable users={allAdmin}/>
        </>
    );
}

export default Users;
