import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

        setAnchorEl(null);
    }

    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {selectedCategoryName === '' ? "Select a Category" : `Selected Category: ${selectedCategoryName}`}
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
                    {categories.map((element, index) => (
                        <MenuItem key={index} onClick={() => handleClickItem(element.cid, element.category_name)}>{element.category_name}</MenuItem>
                    ))}
                </Menu>
            </div>
            <div>
                <SubCategoryTable subCategories={subcategories} />
            </div>
        </>
    )
}

export default SubCategoriesByCategory;