import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";

export const ResultList = () => {
    const {data: {items, total_count}} = useContext(DataContext);
    console.log(items);
    return (
        <>
            <p>Total found - {total_count || 0}</p>
            {items &&
            <ol>{items.map(({id, full_name, html_url}) => (
                <li key={id}><a href={html_url}>{full_name}</a></li>
            ))}</ol>
            }
        </>

    )

}