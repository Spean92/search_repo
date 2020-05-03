import React, {useContext} from 'react';
import {DataContext} from "../context/DataContext";
import {ResultList} from "./ResultList";
import {Welcome} from "./Welcome";
import {Loader} from "./Loader";
import {Errors} from "./Errors";

export const Page = () => {
    const {loading: {loading, errors}, data: {data}} = useContext(DataContext);
    return (
        <>
            {loading &&
            <Loader/>
            }
            {errors ?
                <Errors/>
                :
                <>
                    {data.total_count === undefined ?
                        <Welcome/>
                        :
                        <ResultList loading={loading} data={data}/>
                    }
                </>
            }


        </>
    )
}