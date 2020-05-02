import React, {useState} from "react";
import {API_URL} from "../utils";
import {DataContext} from "./DataContext";

export const GetData = ({children}) => {
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuery, setCurrentQuery] = useState(``);
    const fetchData = async (query, page = 1, count = 30) => {
        //TODO loader
        const response = await fetch(`${API_URL}/search/repositories?q=${query}+in:name&sort=stars&page=${page}&per_page=${count}`);
        const jsonData = await response.json();
        setData(jsonData);
        setCurrentQuery(query);
        setCurrentPage(page);
    };
    return (
        <DataContext.Provider value={{
            fetchData, data, currentPage, currentQuery
        }}>
            {children}
        </DataContext.Provider>
    )
};