import React from 'react';
import {GetData} from "./context/GetData";
import {SearchForm} from "./components/SearchForm";
import {Page} from "./components/Page";


export const App = () => {
    return (
        <GetData>
            <div className="container">
                <SearchForm/>
                <Page/>
            </div>
        </GetData>
    );
}