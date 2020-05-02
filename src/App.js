import React from 'react';
import {GetData} from "./context/GetData";
import {SearchForm} from "./components/SearchForm";
import {ResultList} from "./components/ResultList";


export const App = () => {
    return (
        <GetData>
            <SearchForm/>
            <ResultList/>
        </GetData>
    );
}