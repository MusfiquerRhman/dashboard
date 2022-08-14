import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import * as vendorAPI from '../../../API/vendors';
import useInputState from '../../../Hooks/UseInputHook';
import VendorForm from './VendorForm';

const UpdateVendorDialague = (props) => {
    //const { vid, email, phone, description, hours, street1, street2, city, state, zip_code, website, requirements, is_active, feature_vendor } = props;
    const vid = props.vid;
    const [name, handleChangeName] = useInputState(props.vendor_name);
    const [email, handleChangeEmail] = useInputState(props.email);
    const [phone, handleChangePhone] = useInputState(props.phone);
    const [description, handleChangeDescription] = useInputState(props.description);
    const [hours, handleChangeHours] = useInputState(props.hours);
    const [street1, handleChangeStreet1] = useInputState(props.street1);
    const [street2, handleChangeStreet2] = useInputState(props.street2);
    const [city, handleChangeCity] = useInputState(props.city);
    const [state, handleChangeState] = useInputState(props.state);
    const [zip_code, handleChangeZip_code] = useInputState(props.zip_code);
    const [website, handleChangeWebsite] = useInputState(props.website);
    const [requirements, handleChangeRequirements] = useInputState(props.requirements);
    const [is_active, setIs_active] = useState(props.is_active);
    const [feature_vendor, setFeature_vendor] = useState(props.feature_vendor);

    const { enqueueSnackbar } = useSnackbar();

    const handleChangeis_active = (event) => {
        setIs_active(event.target.checked);
    };

    const handleChangefeature_vendor = (event) => {
        setFeature_vendor(event.target.checked);
    };

    const [file, setImage] = useState("");

    const handleClickUpdateVendor = async () => {
        const res = await vendorAPI.updateVendor(
            vid,
            name,
            email,
            phone,
            description,
            hours,
            street1,
            street2,
            city,
            state,
            zip_code,
            website,
            requirements,
            is_active,
            feature_vendor,
            file
        );
        if (res.status === 200) {
            enqueueSnackbar(`Successfully Updated Vendor`, { variant: 'info' });
            window.location.reload();
        }
        else {
            enqueueSnackbar(`Failes to Update`, { variant: 'error' });
        }
        props.setupdateOpen(false);
    }


    return (
        <>
            <VendorForm 
                updateOpen={props.updateOpen}
                handleCloseUpdate={props.handleCloseUpdate}
                handleClickVendor={handleClickUpdateVendor}
                name={name}
                handleChangeName={handleChangeName}
                email={email}
                handleChangeEmail={handleChangeEmail}
                phone={phone}
                handleChangePhone={handleChangePhone}
                description={description}
                handleChangeDescription={handleChangeDescription}
                street1={street1}
                handleChangeStreet1={handleChangeStreet1}
                street2={street2}
                handleChangeStreet2={handleChangeStreet2}
                city={city}
                handleChangeCity={handleChangeCity}
                state={state}
                handleChangeState={handleChangeState}
                hours={hours}
                handleChangeHours={handleChangeHours}
                zip_code={zip_code}
                handleChangeZip_code={handleChangeZip_code}
                website={website}
                handleChangeWebsite={handleChangeWebsite}
                requirements={requirements}
                handleChangeRequirements={handleChangeRequirements}
                handleChangeis_active={handleChangeis_active}
                is_active={is_active}
                handleChangefeature_vendor={handleChangefeature_vendor}
                feature_vendor={feature_vendor}
                setImage={setImage}
                formType="Update"
            />
        </>
    )
}

export default UpdateVendorDialague;