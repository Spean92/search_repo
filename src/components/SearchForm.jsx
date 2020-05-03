import React, {useContext, useState} from 'react';
import {DataContext} from "../context/DataContext";
import '../styles/form.scss'

export const SearchForm = () => {
    const {fetchData, data: {currentQuery}} = useContext(DataContext);
    const [searchString, setSearchString] = useState(``);
    const formHandler = (e) => {
        e.preventDefault();
        if (searchString && searchString !== currentQuery) {
            fetchData(searchString);
        }
    };

    return (
        <div className="search-wrapper">
            <form onSubmit={formHandler}>
                <input type="text" placeholder="Please enter repository name" onChange={(e) => setSearchString(e.target.value.trim())}/>
                <button>Search</button>
            </form>

        </div>
    )
}