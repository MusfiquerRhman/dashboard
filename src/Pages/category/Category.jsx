import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
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
        if (file === "") {
            enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
        }
        else {
            categoriesAPI.addCategories(category_name, file).then(res => {
                if (res.status !== 200) {
                    enqueueSnackbar(`Connection Error`, { variant: 'error' });
                }
                else {
                    window.location.reload();
                }
            }
            );
        }
    }


    const addSubCatgoriesForm = () => {
        if (fileSub === "") {
            enqueueSnackbar(`Please Select an image file`, { variant: 'error' });
        }
        else if (selectedCategoriesIdInSubcategory === "") {
            enqueueSnackbar(`Please Select Category`, { variant: 'error' });
        }
        else {
            subcategoriesAPI.addSubCategories(selectedCategoriesIdInSubcategory, subCategory_name, fileSub).then(res => {
                if (res.status !== 200) {
                    enqueueSnackbar(`Connection Error`, { variant: 'error' });
                }
                else {
                    window.location.reload();
                }
            }
            );
        }
    }

    return (
        <React.Fragment>
            <CategoriesForm
                category_name={category_name}
                handleChangecategory_name={handleChangecategory_name}
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <div className={classes.form}>
                            <Typography variant="h5" gutterBottom component="div">
                                Add A New Category
                            </Typography>
                            <Button fullWidth variant="outlined" onClick={handleClickOpenAdd} >Add a new Category</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={2}>
                        <div className={classes.form}>
                            <Typography variant="h5" gutterBottom component="div">
                                Add A New Subcategory
                            </Typography>
                            <Button fullWidth variant="outlined" onClick={handleClickOpenAddSubcategory} >Add a new Subcategory</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ width: '100%', typography: 'body1', marginTop: "1rem" }}>
                <h1>Categories and Subcategories list</h1>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="tabs"
                        >
                            <Tab label="Categories" value="1" />
                            <Tab label="All Sub-Categories" value="2" />
                            <Tab label="Subcategories by Category" value="3" />
                        </Tabs>
                    </Box>
                    <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="1"><CategoryTable categories={categories} /></TabPanel>
                    <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="2"><SubCategoriesTable subCategories={subCategories} /></TabPanel>
                    <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="3"><SubCategoriesByCategory /></TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    )
}

export default Category;