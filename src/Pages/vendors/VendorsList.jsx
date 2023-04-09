import Grid from '@mui/material/Grid';
import React, { useContext } from 'react';
import { VendorContext } from '../../Context APIs/vendorContext';
import VendorCards from './vendor Components/VendorCards';

const VendorsList = React.memo(() => {
    const { vendors } = useContext(VendorContext)

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                {vendors?.map((element, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} >
                        <VendorCards key={index} element={element} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
})

export default VendorsList;