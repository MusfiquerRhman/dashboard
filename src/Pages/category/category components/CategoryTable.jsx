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
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import * as categoriesAPI from "../../../API/category";
import CategoryImg from "../../../Assets/icons8-diversity.png";
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import useInputState from '../../../Hooks/UseInputHook';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';
import style from "../categoryStyles";
import CategoriesForm from './CategoriesForm';

function createData(category_logo_path, category_name, cid, created_date, updated_date, is_active, app_order_id) {
  return { category_logo_path, category_name, cid, created_date, updated_date, is_active, app_order_id };
}

const CategoryTable = React.memo((categories) => {
  const classes = style();
  const [category_name, handleChangeCategoryName, setCategory_name] = useInputState('')
  const [categoryOrderId, handleSubChangeCategoryOrderId, setCategoryOrderId] = useInputState('');
  const [categoryID, setCategoryID] = useState('')
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [file, setImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  let rows = [];

  categories.categories?.forEach((element) => {
    rows.push(createData(
      element.category_logo_path,
      element.category_name,
      element.cid,
      element.updated_date,
      element.created_date,
      element.is_active,
      element.app_order_id
    ))
  })

  const handleCloseUpdate = () => {
    setAddOpen(false);
  }

  const handleClickOpenDelete = (row) => {
    setCategory_name(row.category_name);
    setCategoryID(row.cid);
    setDeleteOpen(true);
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }

  const handleClickOpenUpdate = (row) => {
    setCategory_name(row.category_name);
    setCategoryOrderId(row.app_order_id);
    setCategoryID(row.cid);
    setAddOpen(true);
  }

  const updateCategoriesForm = useCallback(() => {
    categoriesAPI.updateCategories(categoryID, category_name, categoryOrderId, file).then(res => {
      if (res.status !== 200) {
        enqueueSnackbar(`Failed to update category`, { variant: 'error' });
      }
      else {
        window.location.reload();
      }
    })
  }, [categoryID, categoryOrderId, category_name, enqueueSnackbar, file])

  const deleteForm = useCallback(() => {
    categoriesAPI.deleteCategories(categoryID).then(res => {
      if (res.status !== 200) {
        enqueueSnackbar(`Failed to Delete category`, { variant: 'error' });
      }
      else {
        window.location.reload();
      }
    })
  }, [categoryID, enqueueSnackbar])

  return (
    <React.Fragment>
      <CategoriesForm
        category_name={category_name}
        handleChangecategory_name={handleChangeCategoryName}
        categoryOrderId={categoryOrderId}
        handleSubChangeCategoryOrderId={handleSubChangeCategoryOrderId}
        handleCloseAdd={handleCloseUpdate}
        addOpen={addOpen}
        formType="Update"
        setImage={setImage}
        handleClickAction={updateCategoriesForm}
      />

      <ConfrimDeleteDialogue
        deleteOpen={deleteOpen}
        handleCloseDelete={handleCloseDelete}
        name={category_name}
        deleteForm={deleteForm}
      />

      <TableContainer component={Paper} sx={{boxShadow: "2px 2px 5px #01010144"}}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Logo</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Order</StyledTableCell>
              <StyledTableCell align="center">Created Date</StyledTableCell>
              <StyledTableCell align="center">Updated Date</StyledTableCell>
              <StyledTableCell align="center">isActive</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.category_logo_path?.length > 0 ? (
                      <img src={row.category_logo_path} alt="category logo" className={classes.categoryImg} />
                    ) : (
                      <img src={CategoryImg} alt="category logo" className={classes.categoryImg} />
                    )
                  }
                </StyledTableCell>
                <StyledTableCell align="center">{row.category_name} </StyledTableCell>
                <StyledTableCell align="center">{row.app_order_id} </StyledTableCell>
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
    </React.Fragment>
  );
})

export default CategoryTable;

