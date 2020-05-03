import React from 'react';
import {Elements} from "./Elements";
import {Pagination} from "./Pagination";
import {Loader} from "./Loader";
import "../styles/resultList.scss"

export const ResultList = ({loading, data: {items, total_count}}) => {
    return (
        <div className="result-wrapper">
            <p>Total found - <b>{total_count || 0}</b> repositories</p>
            {total_count > 1000 &&
            <p className="result-limit">Pagination limited because GitHub Search API provides first <b>1,000 results</b> for search</p>
            }
            {loading ?
                <Loader/>
                :
                <>
                    {items &&
                    <div>
                        {items.map(repos => (
                            <Elements key={repos.id} data={repos}/>
                        ))}
                    </div>
                    }
                </>
            }
            {total_count > 30 &&
            <Pagination/>
            }
        </div>
    )
}