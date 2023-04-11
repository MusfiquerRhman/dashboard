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
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
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

const VendorCards = React.memo((props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setupdateOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = Styles();
  const { element } = props;

  if (element.facebook.length > 0 && element.facebook[0] !== 'h') {
    element.facebook = `http://${element.facebook}`
  }
  if (element.twitter.length > 0 && element.twitter[0] !== 'h') {
    element.twitter = `http://${element.twitter}`
  }
  if (element.youtube.length > 0 && element.youtube[0] !== 'h') {
    element.youtube = `http://${element.youtube}`
  }
  if (element.instagram.length > 0 && element.instagram[0] !== 'h') {
    element.instagram = `http://${element.instagram}`
  }

  const handleClickOpenDelete = () => {
    setDeleteOpen(true);
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }


  const handleClickOpenUpdate = () => {
    setupdateOpen(true);
  }

  const handleCloseUpdate = useCallback(() => {
    setupdateOpen(false);
  }, [])

  const deleteForm = useCallback(async () => {
    const res = await vendorAPI.deleteVendor(element.vid);
    if (res.status === 200) {
      enqueueSnackbar(`Successfully Deleted`, { variant: 'info' });
    }
    else {
      enqueueSnackbar(`Failed to Delete`, { variant: 'error' });
    }
    setDeleteOpen(false);
    window.location.reload();
  }, [element.vid, enqueueSnackbar])

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

      {/*box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;*/}
      <Box className={classes.form} >
        <Box sx={{ width: '100%' }}>
          <Card sx={{ boxShadow: " rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px" }}>
            <CardHeader
              avatar={
                <img src={element.vendor_log_path} alt='vendor' className={classes.vendorImg} />
              }
              title={element.vendor_name}
              subheader={element.email}
              sx={{ color: '#e65100' }}
              titleTypographyProps={{ variant: 'h5' }}
            />

            <CardContent>
              <Grid container sx={{ color: 'text.primary', lineHeight: '1.7' }}>
                <Grid item xs={12} sx={{ alignItems: 'center' }}>
                  <span className={classes.title}>Phone:</span>
                  {
                    (element.phone.length > 1 && element.phone !== null) ? (
                      <span className={classes.value}>{element.phone}</span>
                    ) : (
                      <span className={classes.emptyIcon}>[No Data]</span>
                    )
                  }
                </Grid>

                <Grid item xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
                  <span className={classes.title}>Website:</span>
                  {
                    (element.website.length > 1 && element.website !== null) ? (
                      <a target="_blank" href={element.website} className={classes.website} rel="noreferrer">{element.website}</a>
                    ) : (
                      <span className={classes.emptyIcon}>[No Data]</span>
                    )
                  }
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.title}>Active:</span>
                  <span className={classes.value}>{element.is_active ? "Yes" : "No"}</span>
                </Grid>

                <Grid item xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
                  <span className={classes.title}>Feature:</span>
                  <span className={classes.icon}>{element.feature_vendor ? "Yes" : "No"}</span>
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
                  {
                    (element.requirements.length > 1 && element.requirements !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Requirements:</span>
                          <span className={classes.value}>{element.requirements}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.hours.length > 1 && element.hours !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Hours:</span>
                          <span className={classes.value}>{element.hours}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.description.length > 1 && element.description !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Description:</span>
                          <span className={classes.value}>{element.description}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.street1.length > 1 && element.street1 !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Address:</span>
                          <span className={classes.value}>{element.street1}</span>
                          {(element.street2.length > 1 && element.street2 !== null) && (
                            <span className={classes.value}>{element.street2}</span>
                          )}
                      </Grid>
                    )
                  }


                  {
                    (element.city.length > 1 && element.city !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>City:</span>
                          <span className={classes.value}> {element.city}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.state.length > 1 && element.state !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>State:</span>
                          <span className={classes.value}> {element.state}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.zip_code.length > 1 && element.zip_code !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Zip Code:</span>
                          <span className={classes.value}> {element.zip_code}</span>
                      </Grid>
                    )
                  }

                  {
                    (element.facebook.length > 1 && element.facebook !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Facebook:</span>
                          <span className={classes.value}>
                            <Tooltip title={element.facebook}>
                              <a target="_blank" className={classes.website} href={element.facebook} rel="noreferrer">Click here</a>
                            </Tooltip>
                          </span>
                      </Grid>
                    )
                  }

                  {
                    (element.twitter.length > 1 && element.twitter !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Twitter:</span>
                          <span className={classes.value}>
                            <Tooltip title={element.twitter}>
                              <a target="_blank" className={classes.website} href={element.twitter} rel="noreferrer">Click here</a>
                            </Tooltip>
                          </span>
                      </Grid>
                    )
                  }

                  {
                    (element.youtube.length > 1 && element.youtube !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Youtube:</span>
                          <span className={classes.value}>
                            <Tooltip title={element.youtube}>
                              <a target="_blank" className={classes.website} href={element.youtube} rel="noreferrer">Click here</a>
                            </Tooltip>
                          </span>
                      </Grid>
                    )
                  }

                  {
                    (element.instagram.length > 1 && element.instagram !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>Instagram:</span>
                          <span className={classes.value}>
                            <Tooltip title={element.instagram}>
                              <a target="_blank" className={classes.website} href={element.instagram} rel="noreferrer">Click here</a>
                            </Tooltip>
                          </span>
                      </Grid>
                    )
                  }

                  {
                    (element.best_of_logan_picks.length > 1 && element.best_of_logan_picks !== null) && (
                      <Grid item xs={12}>
                          <span className={classes.title}>BL Picks:</span>
                          <span className={classes.value}> {element.best_of_logan_picks}</span>
                      </Grid>
                    )
                  }

                  <Grid item xs={12}>
                    <span className={classes.title}>Created:</span>
                    <span className={classes.value}> {
                      new Date(element.created_date).toLocaleDateString() + " " + new Date(element.created_date).toLocaleTimeString()
                    }</span>
                  </Grid>

                  <Grid item xs={12}>
                    <span className={classes.title}>Updated:</span>
                    <span className={classes.value}> {
                      new Date(element.updated_date).toLocaleDateString() + " " + new Date(element.updated_date).toLocaleTimeString()
                    }</span>
                  </Grid>
                  {
                    (element.best_of_logan_picks.length > 1 && element.best_of_logan_picks !== null) && (
                      <p className='info'>* BL Picks stands for Best of Logan picks<i></i></p>
                    )
                  }
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </Box>
    </>
  );
})

export default VendorCards;
