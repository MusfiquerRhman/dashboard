import React, { useEffect, useState } from 'react';
import * as vendorsAPI from '../../API/vendors';
import VendorAccordionDetails from '../../Components/VendorAccordionDetails';

const VendorsList = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        vendorsAPI.getAllVendors().then(result => {
            setVendors(result.data);
        });
    }, []);

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