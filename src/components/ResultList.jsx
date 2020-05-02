import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";
import {Elements} from "./Elements";
import "../styles/resultList.scss"

export const ResultList = () => {
    const {data: {items, total_count}} = useContext(DataContext);
    return (
        <div className="result-wrapper">
            <p>Total found - {total_count || 0} repository</p>
            {items &&
            <div>
                {items.map(repos => (
                    <Elements key={repos.id} data={repos}/>
                ))}
            </div>
            }
        </div>

    )

}