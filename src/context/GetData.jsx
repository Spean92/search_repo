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
    const cacheSupport = `caches` in window.self;

    const getDataFromCache = async ({url, page, query}) => {
        if (!cacheSupport) return false;

        const cache = await caches.open(CACHE_NAME);
        const getCache = await cache.match(url);
        if(getCache) {
            const jsonData = await getCache.json();
            setData({data: jsonData, currentPage: page, currentQuery: query});
            return true;
        }
        return false;
    };

    const getDataFromServer = async ({url, page, query}) => {
        setLoading({loading: true, errors: false});
        const responseFromServer = await fetch(url);
        await setDataToCache({url, responseFromServer: responseFromServer.clone()});
        const jsonData = await responseFromServer.json();
        setData({data: jsonData, currentPage: page, currentQuery: query});

    };

    const setDataToCache = async ({url, responseFromServer}) => {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(url, responseFromServer);
    };

    const fetchData = async (query, page = 1, count = 30) => {
        const url = `${API_URL}/search/repositories?q=${query}+in:name&sort=stars&page=${page}&per_page=${count}`;
        try {
            const dataFromCache = await getDataFromCache({url, page, query});
            if (!dataFromCache) await getDataFromServer({url, page, query});
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