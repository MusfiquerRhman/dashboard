import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as subcategoriesAPI from "../../../API/subcategory";
import CategoryImg from "../../../Assets/icons8-diversity.png";
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';
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

      {rows.length > 0 &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Logo</StyledTableCell>
                <StyledTableCell align="center">Sub-Category Name</StyledTableCell>
                <StyledTableCell align="center">Created Date</StyledTableCell>
                <StyledTableCell align="center">Updated Date</StyledTableCell>
                <StyledTableCell align="center">isActive</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.sub_category_logo_path?.length > 0 ? (
                        <img src={row.sub_category_logo_path} alt="subcategory logo" className={classes.categoryImg} />
                      ) : (
                        <img src={CategoryImg} alt="category logo" className={classes.categoryImg} />
                      )
                    }
                    
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.sub_category_name} </StyledTableCell>
                  <StyledTableCell align="center">{row.created_date}</StyledTableCell>
                  <StyledTableCell align="center">{row.updated_date}</StyledTableCell>
                  <StyledTableCell align="center">{row.is_active ? <CheckIcon /> : <CloseIcon />}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button variant="text" onClick={() => handleClickOpenUpdate(row)}>
                      <EditIcon />
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button variant="text" onClick={() => handleClickOpenDelete(row)} color='error'>
                      <DeleteForeverIcon />
                    </Button>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      {rows.length === 0 &&
        <Typography variant="h5" gutterBottom sx={{textAlign: 'center'}}>
          No Data
        </Typography>
      }
    </React.Fragment>
  );
}

export default SubCategoryTable;
