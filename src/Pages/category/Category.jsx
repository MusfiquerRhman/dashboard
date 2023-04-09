import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import * as categoriesAPI from "../../API/category";
import * as subcategoriesAPI from "../../API/subcategory";
import { CategoryContext } from "../../Context APIs/categoryContext";
import { SubCategoryContext } from "../../Context APIs/subcategoriesContext";
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';
import CategoriesForm from './category components/CategoriesForm';
import CategoryTable from "./category components/CategoryTable";
import SubCategoriesByCategory from './subcategory Components/SubCategoriesByCategory';
import SubCategoriesForm from './subcategory Components/SubCategoriesForm';
import SubCategoriesTable from './subcategory Components/SubCategoriesTable';


const Category = () => {
    const [category_name, handleChangecategory_name] = useInputState('');
    const [subCategory_name, handleSubChangecategory_name] = useInputState('');
    const [categoryOrderId, handleSubChangeCategoryOrderId] = useInputState('');
    const [file, setImage] = useState("");
    const [fileSub, setImageSub] = useState("");
    const [value, setValue] = useState('1');
    const [addOpen, setaddOpen] = useState(false);
    const [addOpenSub, setaddOpenSub] = useState(false);
    const classes = style();
    const { categories } = useContext(CategoryContext);
    const { subCategories } = useContext(SubCategoryContext);
    const [selectedCategoriesIdInSubcategory, setSelectedCategoriesIdInSubcategory] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    let isLoggedin = localStorage.getItem('userInformations') !== null;

    if (isLoggedin) {
        if (new Date().getTime() - parseInt(localStorage.getItem('last_login')) > 21600000) { // 6 Hours
            localStorage.removeItem('userInformations');
            localStorage.removeItem('last_login');
            window.location.reload();
        }
    }

    const handleClickOpenAdd = () => {
        setaddOpen(true);
    }

    const handleClickOpenAddSubcategory = () => {
        setaddOpenSub(true);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseAdd = () => {
        setaddOpen(false);
    }

    const handleCloseAddSub = () => {
        setaddOpenSub(false);
    }

    const addCategoriesForm = () => {
        categoriesAPI.addCategories(category_name, categoryOrderId, file).then(res => {
            if (res.status !== 200) {
                enqueueSnackbar(`Failed to add category, try again later`, { variant: 'error' });
            }
            else {
                window.location.reload();
            }
        });
    }


    const addSubCatgoriesForm = () => {
        subcategoriesAPI.addSubCategories(selectedCategoriesIdInSubcategory, subCategory_name, fileSub).then(res => {
            if (res.status !== 200) {
                enqueueSnackbar(`Failed to add subcategory, try again later`, { variant: 'error' });
            }
            else {
                window.location.reload();
            }
        });
    }

    return (
        <React.Fragment>
            <CategoriesForm
                category_name={category_name}
                handleChangecategory_name={handleChangecategory_name}
                categoryOrderId={categoryOrderId}
                handleSubChangeCategoryOrderId={handleSubChangeCategoryOrderId}
                handleCloseAdd={handleCloseAdd}
                addOpen={addOpen}
                formType="Add"
                setImage={setImage}
                handleClickAction={addCategoriesForm}
            />

            <SubCategoriesForm
                category_name={subCategory_name}
                handleSubChangecategory_name={handleSubChangecategory_name}
                handleCloseAdd={handleCloseAddSub}
                addOpen={addOpenSub}
                formType="Add"
                setImage={setImageSub}
                handleClickAction={addSubCatgoriesForm}
                setCategoriesId={setSelectedCategoriesIdInSubcategory}
            />

            <div className={classes.form}>
                <div className={classes.header}>
                    <h1>All Categories and Subcategories</h1>
                    <div>
                        <Button className={classes.button} variant="contained" onClick={handleClickOpenAdd} startIcon={<AddIcon />} sx={{ marginRight: "1rem" }}>Add Category</Button>
                        <Button className={classes.button} variant="contained" onClick={handleClickOpenAddSubcategory} startIcon={<AddIcon />}>Add Subcategory</Button>
                    </div>
                </div>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
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
                            <Tab label="Categories" value="1" />
                            <Tab label="All Sub-Categories" value="2" />
                            <Tab label="Subcategories by Category" value="3" />
                        </Tabs>
                    </Box>
                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="1"><CategoryTable categories={categories} /></TabPanel>
                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="2"><SubCategoriesTable subCategories={subCategories} /></TabPanel>
                    <TabPanel sx={{ padding: 0, paddingTop: '1.5rem' }} value="3"><SubCategoriesByCategory /></TabPanel>
                </TabContext>
            </div>
        </React.Fragment>
    )
}

export default Category;