import React, { createContext, useState } from "react";

export const SubCategoryContext = createContext();

export function SubCategoryProvider(props) {
    const [subCategories, setSubCategories] = useState([]);
    return (
        <SubCategoryContext.Provider
            value={{
                subCategories, setSubCategories
            }}
        >
        {props.children}
        </SubCategoryContext.Provider>
    );
}
