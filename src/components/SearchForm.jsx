import React, {useContext, useState} from 'react';
import {DataContext} from "../context/DataContext";
import '../styles/form.scss'

export const SearchForm = () => {
    const [searchString, setSearchString] = useState(``);
    const {fetchData} = useContext(DataContext);
    const formHandler = (e) => {
        e.preventDefault();
        //TODO cache check
        fetchData(searchString);
    };
    return (
        <div className="search-wrapper">
            <form onSubmit={formHandler}>
                <input type="text" onChange={(e) => setSearchString(e.target.value)}/>
                <button>Search</button>
            </form>
        </div>
    )
}