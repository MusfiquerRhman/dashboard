import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as subcategoriesAPI from "../../../API/subcategory";
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import style from "../categoryStyles";
import SubCategoriesForm from './SubCategoriesForm';

function createData(sub_category_logo_path, sub_category_name, cid, scid, created_date, updated_date, is_active) {
  return { sub_category_logo_path, sub_category_name, cid, scid, created_date, updated_date, is_active };
}

const SubCategoryTable = (subCategories) => {
  const classes = style();
  const [subCategory_name, handleSubChangecategory_name, setSubCategory_name] = useInputState('')

  const [subCategoryID, setSubCategoryID] = useState('')
  const [categoryID, setcategoryID] = useState('')
  const [addOpen, setaddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [file, setImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let rows = [];

  subCategories.subCategories.forEach((element) => {
    rows.push(createData(
      element.sub_category_logo_path,
      element.sub_category_name,
      element.cid,
      element.scid,
      element.updated_date,
      element.created_date,
      element.is_active
    ))
  })

  const handleCloseUpdate = () => {
    setaddOpen(false);
  }

  const handleClickOpenDelete = (row) => {
    setSubCategory_name(row.category_name);
    setSubCategoryID(row.scid);
    setDeleteOpen(true);
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }

  const handleClickOpenUpdate = (row) => {
    setSubCategory_name(row.sub_category_name);
    setSubCategoryID(row.scid);
    setcategoryID(row.cid);
    setaddOpen(true);
  }

  const updateSubCatgoriesForm = () => {
    subcategoriesAPI.updateSubCategories(categoryID, subCategoryID, subCategory_name, file).then(res => {
      if (res.status !== 200) {
        enqueueSnackbar(`Failed to update category`, { variant: 'error' });
      }
      else {
        window.location.reload();
      }
    })
  }

  const deleteForm = () => {
    subcategoriesAPI.deleteSubCategories(subCategoryID).then(res => {
      if (res.status !== 200) {
        enqueueSnackbar(`Failed to update category`, { variant: 'error' });
      }
      else {
        window.location.reload();
      }
    })
  }

  return (
    <React.Fragment>
      <SubCategoriesForm
        category_name={subCategory_name}
        handleSubChangecategory_name={handleSubChangecategory_name}
        handleCloseAdd={handleCloseUpdate}
        addOpen={addOpen}
        formType="Update"
        setImage={setImage}
        handleClickAction={updateSubCatgoriesForm}
        setCategoriesId={setcategoryID}
      />

      <ConfrimDeleteDialogue
        deleteOpen={deleteOpen}
        handleCloseDelete={handleCloseDelete}
        name={subCategory_name}
        deleteForm={deleteForm}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell align="right">Calories Name</TableCell>
              <TableCell align="right">Category ID</TableCell>
              <TableCell align="right">Sub-category ID</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align="right">Updated Date</TableCell>
              <TableCell align="right">isActive</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.sub_category_logo_path} alt="category logo" className={classes.categoryImg} />
                </TableCell>
                <TableCell align="right">{row.sub_category_name} </TableCell>
                <TableCell align="right">{row.cid}</TableCell>
                <TableCell align="right">{row.scid}</TableCell>
                <TableCell align="right">{row.created_date}</TableCell>
                <TableCell align="right">{row.updated_date}</TableCell>
                <TableCell align="right">{row.is_active ? <CheckIcon /> : <CloseIcon />}</TableCell>
                <TableCell align="right"><Button variant="text" onClick={() => handleClickOpenUpdate(row)}><EditIcon /></Button></TableCell>
                <TableCell align="right"><Button variant="text" onClick={() => handleClickOpenDelete(row)}><DeleteForeverIcon /></Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default SubCategoryTable;

