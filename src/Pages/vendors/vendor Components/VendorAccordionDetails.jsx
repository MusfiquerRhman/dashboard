import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from "react";
import * as vendorAPI from '../../../API/vendors';
import Styles from "../vendorsStyle";
import ConfrimDeleteDialogue from '../../../Components/ConfrimDeleteDialogue';
import UpdateVendorDialague from './UpdateVendorDialague';

const VendorAccordionDetails = (props) => {
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
        if(res.status === 200) {
            enqueueSnackbar(`Successfully Deleted`, {variant: 'info'});
        }
        else {
            enqueueSnackbar(`Failes to Deleted`, {variant: 'error'});
        }
        setDeleteOpen(false);
        window.location.reload();
    }


    return (
        <React.Fragment>
            <ConfrimDeleteDialogue 
                deleteOpen={deleteOpen} 
                handleCloseDelete={handleCloseDelete} 
                name={element.vendor_name} 
                deleteForm={deleteForm}
            />

            <UpdateVendorDialague 
                vid={element.vid}
                email={element.email} 
                phone={element.phone} 
                description={element.description}
                hours={element.hours}
                street1={element.street1}
                street2={element.street2}
                city={element.city}
                state={element.state}
                zip_code={element.zip_code} 
                website={element.website} 
                requirements={element.requirements} 
                is_active={element.is_active} 
                feature_vendor={element.feature_vendor} 
                updateOpen={updateOpen} 
                handleCloseUpdate={handleCloseUpdate} 
                vendor_name={element.vendor_name} 
                setupdateOpen={setupdateOpen}
            />

            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={classes.titileContainer}>
                        <img src={element.vendor_log_path} alt='vendor' className={classes.vendorImg} />
                        <Typography variant="h5" gutterBottom component="div">
                            {element.vendor_name}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        <span className={classes.title}>Vendor ID:</span>
                        <span className={classes.value}>{element.vid}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Email:</span>
                        <span className={classes.value}>{element.email}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Phone:</span>
                        <span className={classes.value}>{element.phone}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Description:</span>
                        <span className={classes.value}>{element.description}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Hours:</span>
                        <span className={classes.value}>{element.hours}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Street 1:</span>
                        <span className={classes.value}>{element.street1}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Street 2:</span>
                        <span className={classes.value}>{element.street2}</span>
                    </p>
                    <p>
                        <span className={classes.title}>City:</span>
                        <span className={classes.value}>{element.city}</span>
                    </p>
                    <p>
                        <span className={classes.title}>State:</span>
                        <span className={classes.value}>{element.state}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Zip Code:</span>
                        <span className={classes.value}>{element.zip_code}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Website:</span>
                        <a href={element.website} className={classes.value}>{element.website}</a>
                    </p>
                    <p>
                        <span className={classes.title}>Requirements:</span>
                        <a href={element.website} className={classes.value}>{element.requirements}</a>
                    </p>
                    <p>
                        <span className={classes.title}>Created_date:</span>
                        <span className={classes.value}>{
                            new Date(element.created_date).toLocaleDateString() + " " + new Date(element.created_date).toLocaleTimeString()
                        }
                        </span>
                    </p>
                    <p>
                        <span className={classes.title}>Updated_date:</span>
                        <span className={classes.value}>{
                            new Date(element.updated_date).toLocaleDateString() + " " + new Date(element.updated_date).toLocaleTimeString()
                        }
                        </span>
                    </p>
                    <p>
                        <span className={classes.title}>Currently Active:</span>
                        <span className={classes.value}>{element.is_active ? "Yes" : "No"}</span>
                    </p>
                    <p>
                        <span className={classes.title}>Feature Vendor:</span>
                        <span className={classes.value}>{element.feature_vendor ? "Yes" : "No"}</span>
                    </p>
                    <Stack spacing={2} direction="row">
                        <Button fullWidth variant="outlined" onClick={handleClickOpenUpdate}>Edit</Button>
                        <Button fullWidth variant="outlined" color="error" onClick={handleClickOpenDelete} >Delete</Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}

export default VendorAccordionDetails;