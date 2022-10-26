import React, { useContext, useState } from 'react';
// MaterialUI Elements
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CategoryContext } from '../../../Context APIs/categoryContext';
import Style from '../../../Styles/GlobalStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SubCategoriesForm = (props) => {
    const {
        category_name,
        handleSubChangecategory_name,
        handleCloseAdd,
        addOpen,
        formType,
        setImage,
        handleClickAction,
        setCategoriesId,
    } = props;

    const [displayImage, setDisplayImage] = useState("");
    const { categories } = useContext(CategoryContext);
    const [categoryName, setcategoryName] = useState('');

    const classes = Style();


    const handleClickCategory = (category) => {
        setCategoriesId(category.cid);
        setcategoryName(category.category_name);
    };

    const imageSelectHandeler = (files) => {
        setImage(files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDisplayImage(reader.result);
            }
        };
        if (files[0] && files[0].type.match("image.*")) {
            reader.readAsDataURL(files[0]);
        }
    };

    let imageSelectedMsg = (
        <Typography variant="h6" className={classes.imagetext}>
            Select an Image
        </Typography>
    );
    if (displayImage !== "") {
        imageSelectedMsg = (
            <img src={displayImage} className={classes.image} alt="product" />
        );
    }

    return (
        <Dialog
            fullScreen
            open={addOpen}
            onClose={handleCloseAdd}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseAdd}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {formType} Sub-Category
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClickAction}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div>
                    <Paper elevation={6} className={classes.formBox} >
                        <form className={classes.form}>
                            <Typography variant="h4" sx={{ padding: '1rem 3rem' }}>
                                Enter Sub-Category Details:
                            </Typography>

                            <Box sx={{ width: '100%' }}>
                                <Grid container item direction="column" spacing={2} lg={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item >
                                        <TextField id="registration-sub-category_name"
                                            label="Sub-Category Name"
                                            type="text"
                                            variant="standard"
                                            value={category_name}
                                            onChange={handleSubChangecategory_name}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                {formType === 'Add' && (
                                    <div style={{marginBottom: '2rem'}}>
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select a Category</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryName}
                                        label="Select a Category"
                                        >
                                            {categories.map((element, index) => (
                                                <MenuItem key={index} 
                                                    onClick={() => handleClickCategory(element)} 
                                                    value={element.category_name}>{element.category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    </div>
                                )}

                                {imageSelectedMsg}
                                <Grid container item direction="column" spacing={2} xs={12} sx={{ marginBottom: '1.5rem' }}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            sx={{ marginTop: "1rem" }}
                                        >
                                            Select a Sub-category image
                                            <input
                                                name="image"
                                                type="file"
                                                onChange={(e) => {
                                                    imageSelectHandeler(e.target.files);
                                                }}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button fullWidth variant="contained" onClick={handleClickAction}>Submit</Button>
                                </Grid>
                            </Box>
                        </form>
                    </Paper>
                </div >
            </DialogContent>
        </Dialog>
    )
}

export default SubCategoriesForm;