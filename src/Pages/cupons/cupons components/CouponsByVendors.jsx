import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import * as cuponsAPI from '../../../API/coupons';
import { VendorContext } from '../../../Context APIs/vendorContext';
import CuponsTable from './CuponsTable';

const CouponsByVendors = () => {
    const [selectedVendorName, setSelectedVendorName] = useState("")
    const [cupons, setCupons] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const { vendors } = useContext(VendorContext)

    const handleClickItem = (vid, vendorName) => {
        setSelectedVendorName(vendorName);

        cuponsAPI.getCouponsByVendor(vid).then(
            res => {
                setCupons(res.data)
                if(res.status !== 200) {
                    enqueueSnackbar(`Connection Error`, { variant: 'error' });
                }
            }
        );
    }

    return (
        <React.Fragment>
            <div style={{marginBottom: '1.5rem'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a Vendor</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedVendorName}
                    label="Select a Vendor"
                    >
                    {vendors.map((element, index) => (
                        <MenuItem key={index} onClick={() => handleClickItem(element.vid, element.vendor_name)} value={element.vendor_name}>{element.vendor_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <CuponsTable data={cupons} />
            </div>
        </React.Fragment>
    )
}

export default CouponsByVendors;