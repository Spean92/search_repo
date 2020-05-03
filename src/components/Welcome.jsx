import React, {useEffect, useState} from 'react';
import "../styles/welcome.scss";
import {CACHE_NAME} from "../utils";

export const Welcome = () => {
    const [cache, setCache] = useState(false);

    useEffect(() => {
        caches.keys().then(k => k.indexOf(CACHE_NAME) !== -1 ? setCache(true) : null);
    }, []);

    const clearHandler = (e) => {
        e.preventDefault();
        caches.delete(CACHE_NAME).then(d => d ? setCache(false) : null);
    };

    return (
        <div className="welcome-wrapper">
            <h1>Welcome to search engine by GitHub repositories</h1>
            <h3>To start search, please enter repository name and press Enter.</h3>
            {cache &&
            <>
                <p>This App is using cache, to clear cache please click button: </p>
                <button onClick={clearHandler} className="clear-cache">Clear cache</button>
            </>
            }
        </div>
    )
};