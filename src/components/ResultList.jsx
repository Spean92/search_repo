import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";
import {Elements} from "./Elements";
import {Pagination} from "./Pagination";
import {Loader} from "./Loader";
import "../styles/resultList.scss"

export const ResultList = () => {
    const {loading, data: {data: {items, total_count}}} = useContext(DataContext);
    return (
        <div className="result-wrapper">
            <p>Total found - {total_count || 0} repository</p>
            {total_count > 1000 &&
            <p>The GitHub Search API provides <b>maximum 1,000 results for search</b></p>
            }
            {loading ?
                <Loader/>
                :
                <React.Fragment>
                    {items &&
                    <div>
                        {items.map(repos => (
                            <Elements key={repos.id} data={repos}/>
                        ))}
                    </div>
                    }
                </React.Fragment>
            }
            {total_count > 30 &&
            <Pagination/>
            }
        </div>
    )
}