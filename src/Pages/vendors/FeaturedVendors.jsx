import React, { useEffect, useState } from 'react';
import * as vendorsAPI from '../../API/vendors';
import VendorAccordionDetails from './vendor Components/VendorAccordionDetails';

const FeaturedVendors = () => {
    const [vendors, setVendors] = useState([]);
    useEffect(() => {
        vendorsAPI.getFeaturedVendors().then(result => {
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

export default FeaturedVendors;