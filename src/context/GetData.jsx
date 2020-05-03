import React, {useState} from "react";
import {API_URL} from "../utils";
import {DataContext} from "./DataContext";

export const GetData = ({children}) => {
    const [data, setData] = useState({
        data: {},
        currentPage: 1,
        currentQuery: ``
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async (query, page = 1, count = 30) => {
        const url = `${API_URL}/search/repositories?q=${query}+in:name&sort=stars&page=${page}&per_page=${count}`;
        let jsonData = {};
        try {
            const cache = await caches.open('github-api-requests');
            const getCache = await cache.match(url);
            if (getCache) {
                jsonData = await getCache.json();
            } else {
                setLoading(true);
                const responseFromServer = await fetch(url);
                jsonData = await responseFromServer.clone().json();
                cache.put(url, responseFromServer);
            }
            setData({data: jsonData, currentPage: page, currentQuery: query});
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }

    };
    return (
        <DataContext.Provider value={{
            fetchData, data, loading
        }}>
            {children}
        </DataContext.Provider>
    )
};