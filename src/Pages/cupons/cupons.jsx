import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import React, { useCallback, useDeferredValue, useEffect, useState } from 'react';
import * as couponsAPI from '../../API/coupons';
import useInputState from '../../Hooks/UseInputHook';
import Style from '../../Styles/GlobalStyles';
import ActiveAndFutureCoupons from './cupons components/ActiveAndFutureCoupons';
import AllCupons from './cupons components/AllCupons';
import CouponsByVendors from './cupons components/CouponsByVendors';
import CouponsForm from './cupons components/CuponsForm';
import CuponsTable from './cupons components/CuponsTable';
import ExpiredCoupons from './cupons components/ExpiredCoupons';
import FeaturedCoupons from './cupons components/FeaturedCoupons';
import './searchBoxStyles.scss';

const Cupons = () => {
    const classes = Style()
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState('1');
    let isLoggedin = localStorage.getItem('userInformations') !== null;

    if(isLoggedin){
        if(new Date().getTime() - parseInt(localStorage.getItem('last_login')) > 21600000){ // 6 Hours
            localStorage.removeItem('userInformations');
            localStorage.removeItem('last_login');
            window.location.reload();
        }
    }

    const [cupons, setCupons] = useState([]);

    useEffect(() => {
        couponsAPI.getAllCoupons().then(res => {
            if (res.status === 200) {
                setCupons(res.data);
            }
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [addOpen, setAddOpen] = useState(false);
    const handleCloseAdd = () => {
        setAddOpen(false);
    }

    const handleClickOpenAdd = () => {
        setAddOpen(true);
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if(month < 10) month = `0${month}`;
    let year = date.getFullYear();
    let today = `${year}-${month}-${day}`

    const [coupon_code, handleChangeCoupon_code] = useInputState('')
    const [percentage_off, handleChangePercentage_off] = useInputState('');
    const [single_use, setSingle_use] = useState(false)
    const [feature_coupon, setFeature_coupon] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [start_date, setStartDate] = useState(today);
    const [end_date, setEndDate] = useState(today);
    const [scheduler, setScheduler] = useState('weekly')
    const [vid, setVid] = useState('');
    const [scid, setScid] = useState([]);
    const [couponDescription, setCouponDescription] = useState('')

    const [searchedTerm, setSearchedTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const deferredSearchTerm = useDeferredValue(searchedTerm)

    const onChangeSearch = (e) => {
        setSearchedTerm(e.target.value);
    }

    useEffect(() => {
        setSearchResult(cupons.filter(item => 
            item.coupon_code.toLowerCase().includes(deferredSearchTerm) 
            || item.start_date.toLowerCase().includes(deferredSearchTerm) 
            || item.end_date.toLowerCase().includes(deferredSearchTerm) 
            || item.percentage_off.toString().toLowerCase().includes(deferredSearchTerm)
            || item.scheduler.toLowerCase().includes(deferredSearchTerm)
        ));
    }, [deferredSearchTerm, cupons])


    const clearInput = () => {
        setSearchedTerm('')
    }

    const handleChangeSingle_use = useCallback((event) => {
        setSingle_use(event.target.checked);
    }, []);

    const handleChangeFeature_coupon = useCallback((event) => {
        setFeature_coupon(event.target.checked);
    }, []);

    const handleChangeIs_Active = useCallback((event) => {
        setIsActive(event.target.checked);
    }, []);

    const handleChangeCouponDescription = useCallback((event) => {
        setCouponDescription(event.target.value)
    }, [])

    const handleChangeCouponScheduler = useCallback((event) => {
        setScheduler(event.target.value)
    }, [])

    const addForm = async () => {
        let flag = 0;
        console.log({start_date, end_date})
        scid?.forEach(item => {
            couponsAPI.addCoupons(vid, item, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date, couponDescription, scheduler).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar(`Successfully Added`, { variant: 'info' });
                    flag++;
                    if (flag === scid.length) window.location.reload();
                }
                else {
                    enqueueSnackbar(`Failed to Add coupon, try again later`, { variant: 'error' });
                }
            });
        })
    }

    return (
        <>
            <CouponsForm
                coupon_code={coupon_code}
                handleChangeCoupon_code={handleChangeCoupon_code}
                percentage_off={percentage_off}
                handleChangePercentage_off={handleChangePercentage_off}
                single_use={single_use}
                handleChangeSingle_use={handleChangeSingle_use}
                feature_coupon={feature_coupon}
                handleChangeFeature_coupon={handleChangeFeature_coupon}
                start_date={start_date}
                end_date={end_date}
                formType="Add"
                handleCloseUpdate={handleCloseAdd}
                updateOpen={addOpen}
                setStartDate={setStartDate}
                setEnddate={setEndDate}
                isActive={isActive}
                handleChangeIs_Active={handleChangeIs_Active}
                setVid={setVid}
                setScid={setScid}
                vid=''
                scid={scid}
                scheduler={scheduler}
                handleChangeCouponScheduler={handleChangeCouponScheduler}
                coupnsDescription={couponDescription}
                handleChangeCouponDescription={handleChangeCouponDescription}
                handleClickSubmit={addForm}
            />

            <div className={classes.form}>
                <div className={classes.header}>
                    <h1>All Coupons</h1>
                    <Button className={classes.button} variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>Add a new Coupon</Button>
                </div>

                <div className='search'>
                    <div className='search__box' >
                        <SearchIcon className='search__icon' />
                        <input type="text" className='search__input' placeholder='Search Coupons' onChange={onChangeSearch} value={searchedTerm} />
                        {searchedTerm !== '' && (
                            <ClearIcon className='search__icon' onClick={clearInput} />
                            )}
                    </div>
                    <p className='search__info'><i>Only Coupon Code, Start Date, End Date, Deal Type and Scheduler.</i></p>
                </div>
                {
                    (searchedTerm !== '' && (
                        <div className='search__results'>
                            {
                                searchResult.length > 0 && (
                                    <CuponsTable data={searchResult} />
                                )
                            }
                            {
                                searchResult.length === 0 && (
                                    <p className='search_item'>Nothing Found</p>
                                )
                            }
                        </div>
                    ))
                }

                {
                    searchedTerm === '' && (

                        <div>
                            <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                                <TabContext value={value} >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="fullWidth"
                                        aria-label="scrollable auto tabs example"

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
                                        <Tab label="Active coupons" value="1" />
                                        <Tab label="All Coupons" value="2" />
                                        <Tab label="Featured Coupons" value="3" />
                                        <Tab label="Expired Coupons" value="4" />
                                        <Tab label="Coupons by Vendors" value="5" />

                                    </Tabs>
                                    <p className='info'><i>
                                    You can sort Coupon Codes, Vendor names, Start dates, End dates, Sub-category names Deal types and Scheduler by clicking on the column name in the table.
                                    Click on the Pen icon to edit and the trash icon to delete the corresponding coupon.
                                    </i></p>
                                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="1">< AllCupons coupons={cupons} /></TabPanel> {/* Active Coupons panel */}
                                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="2">< ActiveAndFutureCoupons /></TabPanel> {/* All Coupons panel */}
                                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="3">< FeaturedCoupons /></TabPanel>
                                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="4">< ExpiredCoupons /></TabPanel>
                                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="5">< CouponsByVendors /></TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Cupons;

