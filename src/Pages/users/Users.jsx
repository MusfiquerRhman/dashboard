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

    useEffect(() => {
        userAPI.adminUserCount().then(res => {
            setAdminUserCount(res.data.count)
        })
    }, []);

    useEffect(() => {
        userAPI.userCount().then(res => {
            setUserCount(res.data.count)
        })
    }, []);

    useEffect(() => {
        userAPI.getAllAdmin().then(res => {
            setAllAdmin(res.data);
        })
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card className={classes.form}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Total Admins: {adminUserCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.form}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
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

