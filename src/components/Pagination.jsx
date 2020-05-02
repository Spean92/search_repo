import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../context/DataContext";
import '../styles/pagination.scss';

export const Pagination = () => {
    const {data: {total_count}, currentPage, currentQuery, fetchData} = useContext(DataContext);
    const totalPages = Math.floor(total_count / 30);
    const defaultPages = [1, 2, totalPages - 1, totalPages];
    const [page, setPage] = useState(currentPage);
    const [pagination, setPagination] = useState(defaultPages);

    const changePageHandler = (e) => {
        if (e.target.dataset.page) {
            fetchData(currentQuery, +e.target.dataset.page)
        }
    };
    const renderPagination = (arr) => (
        arr.map((el, i, a) => {
            return (
                a[i] !== a[i + 1] - 1 && !isNaN(a[i + 1]) ?
                    <React.Fragment key={el}>
                        <button data-page={el} className={page === el ? `current page` : `page`}>{el}</button>
                        <button className="gap">...</button>
                    </React.Fragment>
                    :
                    <button key={el} data-page={el} className={page === el ? `current page` : `page`}>{el}</button>
            )
        })
    );

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
            let offsetPages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2].filter((e) => e > 1 && e < totalPages);
            let newPagination = [...defaultPages, ...offsetPages];
            setPagination(newPagination.filter((item, pos, arr) => arr.indexOf(item) === pos).sort((a, b) => a - b))

        }
    }, [currentPage]);

    return (
        <div className="pagination-wrapper" onClick={changePageHandler}>
            <button data-page={page - 1} className={`${page === 1 ? "disabled" : null} prev page`}>Previous
            </button>
            {renderPagination(pagination)}
            <button data-page={page + 1} className={`${page === totalPages ? "disabled" : null} next page`}>Next
            </button>
        </div>
    )
}