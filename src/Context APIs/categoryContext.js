import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider(props) {
    const [categories, setCategoryies] = useState([]);
    return (
        <CategoryContext.Provider
            value={{
                categories, setCategoryies
            }}
        >
        {props.children}
        </CategoryContext.Provider>
    );
}
