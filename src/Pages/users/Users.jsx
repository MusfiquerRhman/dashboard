import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import * as userAPI from '../../API/user';
import style from '../../Styles/GlobalStyles';
import AdminTable from './AdminTable';

const Users = () => {
    let isLoggedin = localStorage.getItem('userInformations') !== null;

    if(isLoggedin){
        if(new Date().getTime() - parseInt(localStorage.getItem('last_login')) > 21600000){ // 6 Hours
            localStorage.removeItem('userInformations');
            localStorage.removeItem('last_login');
            window.location.reload();
        }
    }
    
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
        <div className={classes.form}>
            <Grid container spacing={4} sx={{justifyContent: 'center', marginBottom: '2rem'}}>
                <Grid item xs={6}>
                    <Card sx={{boxShadow: "1px 1px 3px #01010144", textAlign: 'center', padding: '0.5rem 0'}}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                Total Admins: {adminUserCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{boxShadow: "1px 1px 3px #01010144", textAlign: 'center', padding: '0.5rem 0'}}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                Total Users: {userCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <AdminTable users={allAdmin}/>
        </div>
    );
}

export default Users;
