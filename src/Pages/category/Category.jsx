import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { CategoryContext } from "../../Context APIs/categoryContext";
import useInputState from '../../Hooks/UseInputHook';
import style from '../../Styles/GlobalStyles';
import CategoriesForm from './category components/CategoriesForm';
import CategoryTable from "./category components/CategoryTable";

const Category = () => {
    const [category_name, handleChangecategory_name] = useInputState('');
    const [file, setImage] = useState("");
    const [value, setValue] = useState('1');
    const [addOpen, setaddOpen] = useState(false);    
    const classes = style();
    const { categories } = useContext(CategoryContext);

    const handleClickOpenAdd = () => {
        setaddOpen(true);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCloseAdd = () => {
        setaddOpen(false);
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
            />
            <Paper elevation={2} className={classes.formBox}>
                <div className={classes.form}>
                    <Typography variant="h5" gutterBottom component="div">
                        Add A New Category
                    </Typography>
                    <Button fullWidth variant="outlined"  onClick={handleClickOpenAdd} >Add a new Category</Button>
                </div>
            </Paper>
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
                            <Tab label="Sub-Categories" value="2" />
                        </Tabs>
                    </Box>
                    <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="1"><CategoryTable categories={categories}/></TabPanel>
                    {/* <TabPanel sx={{ padding: 1, paddingTop: '1.5rem' }} value="2">< FeaturedVendors /></TabPanel> */}
                </TabContext>
            </Box>

        </React.Fragment>
    )
}

export default Category;