import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import * as vendorsAPI from '../../API/vendors';
import VendorCards from './vendor Components/VendorCards';

const FeaturedVendors = React.memo(() => {
    const [vendors, setVendors] = useState([]);
    useEffect(() => {
        vendorsAPI.getFeaturedVendors().then(result => {
            setVendors(result.data);
        });
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {vendors?.map((element, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} direction="row" justifyContent="space-between">
                        <VendorCards key={index} element={element} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
})

export default FeaturedVendors;