import React, {useState} from "react";
import {API_URL} from "../utils";
import {DataContext} from "./DataContext";

export const GetData = ({children}) => {
    const [data, setData] = useState({});
    const fetchData = async (query, page = 1, count = 30) => {
        //TODO loader
        const response = await fetch(`${API_URL}/search/repositories?q=${query}&sort=stars&page=${page}&per_page=${count}`);
        const jsonData = await response.json();
        setData(jsonData);
    };
    return (
        <DataContext.Provider value={{
            fetchData, data
        }}>
            {children}
        </DataContext.Provider>
    )
};