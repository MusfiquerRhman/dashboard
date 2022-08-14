import React, { useContext } from 'react';
import { VendorContext } from '../../Context APIs/vendorContext';
import VendorAccordionDetails from './vendor Components/VendorAccordionDetails';

const VendorsList = () => {
    const { vendors } = useContext(VendorContext)

    return (
        <React.Fragment>
            <div>
                {vendors.map((element, index) => (
                    <VendorAccordionDetails key={index} element={element}/>
                ))}
            </div>
        </React.Fragment>
    )
}

export default VendorsList;