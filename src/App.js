import React, {useEffect, useState} from 'react';
import {API_URL} from "./utils";

export const App = () => {
    const [totalResult, setTotalResult] = useState(0);
    const [repos, setRepos] = useState([]);

    const fetchData = async (query, page = 1, count = 30) => {
        try {
            const response = await fetch(`${API_URL}/search/repositories?q=${query}&sort=stars&page=${page}&per_page=${count}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setTotalResult(jsonData.total_count);
            setRepos(jsonData.items);
        } catch (e) {
            throw new Error(`Error ${e}`)
        }

    };
    useEffect(() => {
        fetchData(`test`);
    }, []);

    return (
        <div>
            <p>Total found - {totalResult}</p>
            <ol>{repos.map(({id, full_name, html_url}) => (
                <li key={id}><a href={html_url}>{full_name}</a></li>
            ))}</ol>
        </div>
    );
};
