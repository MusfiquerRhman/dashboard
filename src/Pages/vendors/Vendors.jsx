import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import React, { useCallback, useReducer, useState } from 'react';
import * as vendorAPI from '../../API/vendors';
import style from '../../Styles/GlobalStyles';
import FeaturedVendors from './FeaturedVendors';
import VendorsList from './VendorsList';
import VendorForm from './vendor Components/VendorForm';
import { ACTION_TYPE, INITIAL_STATE, vendorReducer } from './vendorReducer';

const Vendor = () => {
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();

    const [state, dispatch] = useReducer(vendorReducer, INITIAL_STATE);

    const [updateAdd, setUpdateAdd] = useState(false);    
    const [file, setImage] = useState("");
    const [value, setValue] = useState('1');

    let isLoggedIn = localStorage.getItem('userInformations') !== null;

    if(isLoggedIn){
        if(new Date().getTime() - parseInt(localStorage.getItem('last_login')) > 21600000){ // 6 Hours
            localStorage.removeItem('userInformations');
            localStorage.removeItem('last_login');
            window.location.reload();
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseAdd = () => {
        setUpdateAdd(false);
    }

    const handleClickOpenAdd = () => {
        setUpdateAdd(true);
    }

    const handleClickAddVendor = useCallback(async () => {
        if(file === ""){
            enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
        }
        else {
            const res = await vendorAPI.addVendor(state, file);
            if (res.status === 200) {
                enqueueSnackbar(`Successfully Added New Vendor`, { variant: 'info' });
                window.location.reload();
            }
            else {
                enqueueSnackbar(`Failed to Add new Vendor`, { variant: 'error' });
            }
            setUpdateAdd(false);
        }
    }, [enqueueSnackbar, file, state])

    return (
        <React.Fragment>
            <VendorForm 
                formType="Add"
                updateOpen={updateAdd}
                handleCloseUpdate={handleCloseAdd}
                handleClickVendor={handleClickAddVendor}
                
                state={state}
                dispatch={dispatch}
                ACTION_TYPE={ACTION_TYPE}

                setImage={setImage}
            />

            <Box className={classes.form}>
                <Box className={classes.header}>
                    <h1>All Vendors</h1>
                    <Button className={classes.button} 
                        variant="contained" 
                        onClick={handleClickOpenAdd} 
                        startIcon={<AddIcon />}
                    >
                        Add a new Vendor
                    </Button>
                </Box>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="fullWidth"
                            aria-label="tabs"

                            TabIndicatorProps={{
                                sx: {
                                    display: 'none'
                                }
                            }}

                            sx={{
                                background: '#018F8F',
                                color: '#FFFFFF',
                                "& button": {
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',

                                    "&:not(last-child)": {
                                        borderRight: '1px solid #30C3CD'
                                    }
                                },
                                "& button:hover": {
                                    color: '#FFFFFF',
                                    background: '#30C3CD'
                                },
                                "& button:focus": {
                                    color: '#FFFFFF',
                                    background: "#E8804B"
                                },
                                "& button:active": {
                                    color: '#FFFFFF',
                                    background: "#E8804B"
                                },
                                "& button.Mui-selected": {
                                    color: '#FFFFFF',
                                    background: "#E8804B"
                                }
                            }}
                        >
                            <Tab label="All Vendors" value="1" />
                            <Tab label="Featured Vendors" value="2" />
                        </Tabs>
                    </Box>
                    <p className='info'><i>
                        Click on the down arrow icon in the bottom of each card to view more details about the vendor, 
                        click on the pen icon to update the information of that vendor, click the red trash icon to delete
                    </i></p>
                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="1">< VendorsList /></TabPanel>
                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="2">< FeaturedVendors /></TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    )
}

export default Vendor;