import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import * as subcategoryAPI from '../../../API/subcategory';
import { CategoryContext } from '../../../Context APIs/categoryContext';
import SubCategoryTable from './SubCategoriesTable';


const SubCategoriesByCategory = () => {
    const {categories} = useContext(CategoryContext);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedCategoryName, setSelectedCategoryName] = useState("")
    const [subcategories, setSubcategories] = useState([])


    const handleClickItem = (cid, categoryName) => {
        setSelectedCategoryName(categoryName);
        subcategoryAPI.getAllSubCategoryByCategoryID(cid).then(
            res => {
                setSubcategories(res.data)
                if(res.status !== 200) {
                    enqueueSnackbar(`Connection Error`, { variant: 'error' });
                }
            }
        );
    }

    return (
        <>
            <div style={{marginBottom: '1.5rem'}}>
            <p style={{fontSize: '1.15rem'}}>Select a category to see related sub-categories: </p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategoryName}
                    label="Select a Category"
                    sx={{backgroundColor: '#30C3CD20'}}
                    >
                    {categories.map((element, index) => (
                        <MenuItem key={index} onClick={() => handleClickItem(element.cid, element.category_name)} value={element.category_name}>{element.category_name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <SubCategoryTable subCategories={subcategories} />
            </div>
        </>
    )
}

export default SubCategoriesByCategory;