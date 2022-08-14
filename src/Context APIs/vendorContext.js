import React, { createContext, useState } from "react";

export const VendorContext = createContext();

export function VendorProvider(props) {
    const [vendors, setVendors] = useState([]);
    return (
        <VendorContext.Provider
            value={{
                vendors, setVendors
            }}
        >
        {props.children}
        </VendorContext.Provider>
    );
}
