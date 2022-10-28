import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as vendorAPI from '../../API/vendors';
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';
import FeaturedVendors from './FeaturedVendors';
import VendorForm from './vendor Components/VendorForm';
import VendorsList from './VendorsList';

const Vendor = () => {
    const [value, setValue] = useState('1');
    const classes = style();

    const [name, handleChangeName] = useInputState('');
    const [email, handleChangeEmail] = useInputState('');
    const [phone, handleChangePhone] = useInputState('');
    const [description, handleChangeDescription] = useInputState('');
    const [hours, handleChangeHours] = useInputState('');
    const [street1, handleChangeStreet1] = useInputState('');
    const [street2, handleChangeStreet2] = useInputState('');
    const [city, handleChangeCity] = useInputState('');
    const [state, handleChangeState] = useInputState('');
    const [zip_code, handleChangeZip_code] = useInputState('');
    const [website, handleChangeWebsite] = useInputState('');
    const [requirements, handleChangeRequirements] = useInputState('');
    const [is_active, setIs_active] = useState(false);
    const [feature_vendor, setFeature_vendor] = useState(false);
    const [updateAdd, setupdateAdd] = useState(false);    


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { enqueueSnackbar } = useSnackbar();

    const handleChangeis_active = (event) => {
        setIs_active(event.target.checked);
    };

    const handleChangefeature_vendor = (event) => {
        setFeature_vendor(event.target.checked);
    };

    const [file, setImage] = useState("");


    const handleCloseAdd = () => {
        setupdateAdd(false);
    }

    const handleClickOpenAdd = () => {
        setupdateAdd(true);
    }

    const handleClickAddVendor = async () => {
        if(file === ""){
            enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
        }
        else {
            const res = await vendorAPI.addVendor(
                name,
                email,
                phone,
                description,
                hours,
                street1,
                street2,
                city,
                state,
                zip_code,
                website,
                requirements,
                is_active,
                feature_vendor,
                file
            );
            if (res.status === 200) {
                enqueueSnackbar(`Successfully Added New Vendor`, { variant: 'info' });
                window.location.reload();
            }
            else {
                enqueueSnackbar(`Failed to Add new Vendor - ${res.message}`, { variant: 'error' });
            }
            setupdateAdd(false);
        }
    }

    return (
        <>
            <VendorForm 
                updateOpen={updateAdd}
                handleCloseUpdate={handleCloseAdd}
                handleClickVendor={handleClickAddVendor}
                name={name}
                handleChangeName={handleChangeName}
                email={email}
                handleChangeEmail={handleChangeEmail}
                phone={phone}
                handleChangePhone={handleChangePhone}
                description={description}
                handleChangeDescription={handleChangeDescription}
                street1={street1}
                handleChangeStreet1={handleChangeStreet1}
                street2={street2}
                handleChangeStreet2={handleChangeStreet2}
                city={city}
                handleChangeCity={handleChangeCity}
                state={state}
                handleChangeState={handleChangeState}
                hours={hours}
                handleChangeHours={handleChangeHours}
                zip_code={zip_code}
                handleChangeZip_code={handleChangeZip_code}
                website={website}
                handleChangeWebsite={handleChangeWebsite}
                requirements={requirements}
                handleChangeRequirements={handleChangeRequirements}
                handleChangeis_active={handleChangeis_active}
                is_active={is_active}
                handleChangefeature_vendor={handleChangefeature_vendor}
                feature_vendor={feature_vendor}
                setImage={setImage}
                formType="Add"
            />

            <Box className={classes.form}>
                <Box className={classes.header}>
                    <h1>All Vendors</h1>
                    <Button className={classes.button} variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>Add a new Vendor</Button>
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
           
        </>
    )
}

//     "vid": 0,
//     "vendor_name": "string",
//     "vendor_log_path": "string",
//     "feature_vendor": true,
//     "description": "string",
//     "hours": "string",
//     "street1": "string",
//     "street2": "string",
//     "city": "string",
//     "state": "string",
//     "zip_code": "string",
//     "email": "string",
//     "phone": "string",
//     "website": "string",
//     "requirements": "string",
//     "created_date": "2022-08-13T10:52:09.276Z",
//     "updated_date": "2022-08-13T10:52:09.276Z",
//     "is_active": true

export default Vendor;