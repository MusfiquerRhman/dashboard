import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useState } from 'react';
import * as couponsAPI from '../../../API/coupons';
import { VendorContext } from '../../../Context APIs/vendorContext';
import CuponsTable from './CuponsTable';

const CouponsByVendors = React.memo(() => {
    const [selectedVendorName, setSelectedVendorName] = useState("")
    const [coupons, setCoupons] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const { vendors } = useContext(VendorContext)

    const handleClickItem = useCallback((vid, vendorName) => {
        setSelectedVendorName(vendorName);

        couponsAPI.getCouponsByVendor(vid).then(
            res => {
                setCoupons(res.data)
                if(res.status !== 200) {
                    enqueueSnackbar(`Connection Error`, { variant: 'error' });
                }
            }
        );
    }, [enqueueSnackbar])

    return (
        <React.Fragment>
            <div style={{marginBottom: '1.5rem'}}>
                <p style={{fontSize: '1.15rem'}}>Select a vendor to see related coupons: </p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a Vendor</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedVendorName}
                    label="Select a Vendor"
                    sx={{backgroundColor: '#30C3CD20'}}
                    >
                    {vendors?.map((element, index) => (
                        <MenuItem key={index} onClick={() => handleClickItem(element.vid, element.vendor_name)} value={element.vendor_name}>{element.vendor_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <CuponsTable data={coupons} />
            </div>
        </React.Fragment>
    )
})

export default CouponsByVendors;