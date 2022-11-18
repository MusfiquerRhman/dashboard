import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as vendorAPI from '../../../API/vendors';
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import Styles from "../vendorsStyle";
import UpdateVendorDialague from './UpdateVendorDialague';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VendorCards(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setupdateOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = Styles();
  const { element } = props;

  const handleClickOpenDelete = () => {
    setDeleteOpen(true);
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }


  const handleClickOpenUpdate = () => {
    setupdateOpen(true);
  }

  const handleCloseUpdate = () => {
    setupdateOpen(false);
  }

  const deleteForm = async () => {
    const res = await vendorAPI.deleteVendor(element.vid);
    if (res.status === 200) {
      enqueueSnackbar(`Successfully Deleted`, { variant: 'info' });
    }
    else {
      enqueueSnackbar(`Failed to Deleted - ${res.message}`, { variant: 'error' });
    }
    setDeleteOpen(false);
    window.location.reload();
  }

  return (
    <>
      <ConfrimDeleteDialogue
        deleteOpen={deleteOpen}
        handleCloseDelete={handleCloseDelete}
        name={element.vendor_name}
        deleteForm={deleteForm}
      />

      <UpdateVendorDialague
        element={element}
        updateOpen={updateOpen}
        handleCloseUpdate={handleCloseUpdate}
        setupdateOpen={setupdateOpen}
      />

      <Box className={classes.form} >
        <Box sx={{ width: '100%' }}>
          <Card sx={{ maxWidth: 345, boxShadow: "0 0 8px #018F8F55" }}>
            <CardHeader
              avatar={
                <img src={element.vendor_log_path} alt='vendor' className={classes.vendorImg} />
              }
              title={element.vendor_name}
              subheader={element.email}
            />

            <CardContent>
              <Grid container sx={{ color: 'text.primary', lineHeight: '1.7' }}>
                <Grid item xs={5}>
                  <span className={classes.title}>Phone:</span>
                </Grid>
                <Grid item xs={7}>
                  <span className={classes.value}>{element.phone}</span>
                </Grid>

                <Grid item xs={5}>
                  <span className={classes.title}>Website:</span>
                </Grid>
                <Grid item xs={7}>
                  <a href={element.website} className={classes.website}>{element.website}</a>
                </Grid>

                <Grid item xs={5}>
                  <span className={classes.title}>Active:</span>
                </Grid>
                <Grid item xs={7}>
                  <span className={classes.value}>{element.is_active ? "Yes" : "No"}</span>
                </Grid>

                <Grid item xs={5}>
                  <span className={classes.title}>Feature:</span>
                </Grid>
                <Grid item xs={7}>
                  <span className={classes.icon}>{element.feature_vendor ? "Yes" : "No"}</span>
                </Grid>

                <Grid item xs={5}>
                  <span className={classes.title}>Hours:</span>
                </Grid>
                <Grid item xs={7}>
                  <span className={classes.value}>{element.hours}</span>
                </Grid>

                <Grid item xs={5}>
                  <span className={classes.title}>Requirements:</span>
                </Grid>
                <Grid item xs={7}>
                  <span className={classes.value}>{element.requirements}</span>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={handleClickOpenUpdate}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton aria-label="share" onClick={handleClickOpenDelete}>
                <DeleteForeverIcon color="error" />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent >
                <Grid container sx={{ color: 'text.primary', lineHeight: '2' }}>
                  <Grid item xs={4}>
                    <span className={classes.title}>Description:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}>{element.description}</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className={classes.title}>Address:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}>{`${element.street1}, ${element.street2}`}</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className={classes.title}>City:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}> {element.city}</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className={classes.title}>State:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}> {element.state}</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className={classes.title}>Zip Code:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}> {element.zip_code}</span>
                  </Grid>

                  {
                    (element.facebook !== '' && element.facebook !== null) && (                      
                      <>
                        <Grid item xs={4}>
                          <span className={classes.title}>Facebook:</span>
                        </Grid>
                        <Grid item xs={8}>
                          <span className={classes.value}> {element.facebook}</span>
                        </Grid>
                      </>
                    )
                  }

                  {
                    (element.facebook !== '' && element.facebook !== null) && (                      
                      <>
                        <Grid item xs={4}>
                          <span className={classes.title}>Twitter:</span>
                        </Grid>
                        <Grid item xs={8}>
                          <span className={classes.value}> {element.twitter}</span>
                        </Grid>
                      </>
                    )
                  }

                {
                    (element.youtube !== '' && element.youtube !== null) && (                      
                      <>
                        <Grid item xs={4}>
                          <span className={classes.title}>Youtube:</span>
                        </Grid>
                        <Grid item xs={8}>
                          <span className={classes.value}> {element.youtube}</span>
                        </Grid>
                      </>
                    )
                  }

                  {
                    (element.instagram !== '' && element.instagram !== null) && (                      
                      <>
                        <Grid item xs={4}>
                          <span className={classes.title}>Instagram:</span>
                        </Grid>
                        <Grid item xs={8}>
                          <span className={classes.value}> {element.instagram}</span>
                        </Grid>
                      </>
                    )
                  }

                  {
                    (element.best_of_logan_picks !== '' && element.best_of_logan_picks !== null) && (                      
                      <>
                        <Grid item xs={4}>
                          <span className={classes.title}>BL Picks:</span>
                        </Grid>
                        <Grid item xs={8}>
                          <span className={classes.value}> {element.best_of_logan_picks}</span>
                        </Grid>
                      </>
                    )
                  }

                  <Grid item xs={4}>
                    <span className={classes.title}>Created:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}> {
                      new Date(element.created_date).toLocaleDateString() + " " + new Date(element.created_date).toLocaleTimeString()
                    }</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className={classes.title}>Updated:</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.value}> {
                      new Date(element.updated_date).toLocaleDateString() + " " + new Date(element.updated_date).toLocaleTimeString()
                    }</span>
                  </Grid>
                  <p className='info'>* BL Picks stands for Best of Logan picks<i></i></p>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </Box>
    </>
  );
}
