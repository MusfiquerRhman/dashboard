import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import * as cuponsAPI from '../../../API/coupons';
import { VendorContext } from '../../../Context APIs/vendorContext';
import CuponsTable from './CuponsTable';

const CouponsByVendors = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedVendorName, setSelectedVendorName] = useState("")
    const [cupons, setCupons] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const { vendors } = useContext(VendorContext)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {selectedVendorName === '' ? "Select a vendor" : `Selected Vendor: ${selectedVendorName}`}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {vendors.map((element, index) => (
                        <MenuItem key={index} onClick={() => handleClickItem(element.vid, element.vendor_name)}>{element.vendor_name}</MenuItem>
                    ))}
                </Menu>
            </div>
            <div>
                <CuponsTable data={cupons} />
            </div>
        </React.Fragment>
    )
}

export default CouponsByVendors;