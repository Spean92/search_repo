import React, {useState} from "react";
import {DataContext} from "./DataContext";
import {API_URL, CACHE_NAME} from "../utils";

export const GetData = ({children}) => {
    const [data, setData] = useState({
        data: {},
        currentPage: 1,
        currentQuery: ``
    });
    const [loading, setLoading] = useState({loading: false, errors: false});

    const fetchData = async (query, page = 1, count = 30) => {
        const url = `${API_URL}/search/repositories?q=${query}+in:name&sort=stars&page=${page}&per_page=${count}`;
        let jsonData = {};
        try {
            const cache = await caches.open(CACHE_NAME);
            const getCache = await cache.match(url);
            if (getCache) {
                jsonData = await getCache.json();
            } else {
                setLoading({loading: true, errors: false});
                const responseFromServer = await fetch(url);
                jsonData = await responseFromServer.clone().json();
                cache.put(url, responseFromServer);
            }
            setData({data: jsonData, currentPage: page, currentQuery: query});
            setLoading({loading: false, errors: false});
        } catch (e) {
            console.error(e);
            setLoading({loading: false, errors: true});
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