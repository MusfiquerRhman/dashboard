import { useSnackbar } from 'notistack';
import React, { useEffect, useReducer, useState } from 'react';
import * as vendorAPI from '../../../API/vendors';
import { ACTION_TYPE, INITIAL_STATE, vendorReducer } from '../vendorReducer';
import VendorForm from './VendorForm';

const UpdateVendorDialague = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [state, dispatch] = useReducer(vendorReducer, INITIAL_STATE);

    const [file, setImage] = useState("");
    const vid = props.element.vid;

    useEffect(() => {
        dispatch({
            type: ACTION_TYPE.LOAD_DATA,
            payload: {
                data: props.element
            }
        })
    }, [props])

    const handleClickUpdateVendor = async () => {
        const res = await vendorAPI.updateVendor(vid, state, file);
        if (res.status === 200) {
            enqueueSnackbar(`Successfully Updated Vendor`, { variant: 'info' });
            window.location.reload();
        }
        else {
            enqueueSnackbar(`Failes to Update - ${res.message}`, { variant: 'error' });
        }
        props.setupdateOpen(false);
    }

    return (
        <>
            <VendorForm 
                updateOpen={props.updateOpen}
                handleCloseUpdate={props.handleCloseUpdate}
                handleClickVendor={handleClickUpdateVendor}
                state={state}
                dispatch={dispatch}
                ACTION_TYPE={ACTION_TYPE}
                setImage={setImage}
                formType="Update"
            />
        </>
    )
}

export default UpdateVendorDialague;