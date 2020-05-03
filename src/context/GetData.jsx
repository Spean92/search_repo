import React, {useState} from "react";
import {API_URL, AUTH_HEADER} from "../utils";
import {DataContext} from "./DataContext";

export const GetData = ({children}) => {
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuery, setCurrentQuery] = useState(``);
    const fetchData = async (query, page = 1, count = 30) => {
        const url = `${API_URL}/search/repositories?q=${query}+in:name&sort=stars&page=${page}&per_page=${count}`;
        const cache = await caches.open('github-api-requests');
        let jsonData = {};
        //TODO loader
        const getCache = await cache.match(url);
        if (getCache) {
            jsonData = await getCache.json();
        } else {
            const responseFromServer = await fetch(url);
            jsonData = await responseFromServer.clone().json();
            cache.put(url, responseFromServer);
        }
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