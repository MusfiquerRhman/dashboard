import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Style from '../../Styles/GlobalStyles';
import ActiveAndFutureCoupons from './cupons components/ActiveAndFutureCoupons';
import AllCupons from './cupons components/AllCupons';
import CouponsByVendors from './cupons components/CouponsByVendors';
import ExpiredCoupons from './cupons components/ExpiredCoupons';
import FeaturedCoupons from './cupons components/FeaturedCoupons';

const Cupons = () => {
    const classes = Style()
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.form}>
            <h1>Coupons list</h1>
            <div>
                <Typography variant="h5" gutterBottom component="div">
                    Cupon Filters
                </Typography>
                <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                    <TabContext value={value} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="All Coupons" value="1" />
                            <Tab label="Featured Coupons" value="2"  />
                            <Tab label="Expired Coupons" value="3"  />
                            <Tab label="Active and future coupons" value="4"  />
                            <Tab label="Coupons by Vendors" value="5"  />

                        </Tabs>
                        <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="1">< AllCupons /></TabPanel>
                        <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="2">< FeaturedCoupons /></TabPanel>
                        <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="3">< ExpiredCoupons /></TabPanel>
                        <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="4">< ActiveAndFutureCoupons /></TabPanel>
                        <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="5">< CouponsByVendors /></TabPanel>
                    </TabContext>
                </Box>
            </div>

        </div>
    )
}

export default Cupons;

