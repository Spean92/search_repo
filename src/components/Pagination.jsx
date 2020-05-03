import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/DataContext";
import '../styles/pagination.scss';

export const Pagination = () => {
    const {loading: {loading}, data: {data: {total_count}, currentPage, currentQuery}, fetchData} = useContext(DataContext);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    //!!Limit pages because GitHub can get only 1000 search result


    const changePageHandler = (e) => {
        if (e.target.dataset.page && !loading) {
            fetchData(currentQuery, +e.target.dataset.page)
        }
    };
    const refreshPagination = () => {
        if (page !== currentPage || currentQuery) {
            const totalPages = Math.ceil((total_count > 1000 ? 1000 : total_count) / 30);
            const defaultPages = [1, 2, totalPages - 1, totalPages];
            const offsetPages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2].filter((e) => e > 1 && e < totalPages);
            const newPagination = [...defaultPages, ...offsetPages];
            setPagination(newPagination.filter((item, pos, arr) => arr.indexOf(item) === pos).sort((a, b) => a - b))
            setPage(currentPage);
        }
    }
    const renderPagination = (arr) => (
        <>
            <button data-page={page - 1} className={`${page === 1 ? "disabled" : null} prev page`}>Previous
            </button>
            {arr.map((el, i, a) => {
                return (
                    a[i] !== a[i + 1] - 1 && !isNaN(a[i + 1]) ?
                        <React.Fragment key={el}>
                            <button data-page={el} className={page === el ? `current page` : `page`}>{el}</button>
                            <button className="gap">...</button>
                        </React.Fragment>
                        :
                        <button key={el} data-page={el} className={page === el ? `current page` : `page`}>{el}</button>
                )
            })}
            <button data-page={page + 1} className={`${page === arr[arr.length-1] ? "disabled" : null} next page`}>Next
            </button>
        </>
    );

    useEffect(refreshPagination, [currentPage, currentQuery]);

    return (
        <div className="pagination-wrapper" onClick={changePageHandler}>
            {renderPagination(pagination)}
        </div>
    )
}