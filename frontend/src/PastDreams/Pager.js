function Pager({ currentPage, maxPages, urlSearchParams }) {
    const max_page_buttons = 9;

    const start = Math.max(1, currentPage - Math.floor(max_page_buttons / 2));
    const end = Math.min(maxPages, currentPage + Math.floor(max_page_buttons / 2));
    const prevPage = parseInt(currentPage) - 1;
    const nextPage = parseInt(currentPage) + 1;

    const pageRange = [];
    for (let i = start; i <= end; i++) {
        pageRange.push(i);
    }

    function PaginationButton({ pageNum, link, isCurrentPage }) {
        return (
            <li className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                {isCurrentPage
                    ? <div className="page-link">{pageNum}</div>
                    : <a className="page-link" href={link}>{pageNum}</a>
                }
            </li>
        )
    }

    function generatePageParams(pageNum) {
        const newParams = new URLSearchParams(urlSearchParams);
        newParams.set('pageNum', pageNum);
        return `?${newParams.toString()}`;
    }


    return (
        <nav aria-label='Pagination' className='m-4'>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${parseInt(currentPage) === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href={generatePageParams(prevPage)}>Prev</a>
                </li>
                {pageRange.map(pageNum => {
                    return <PaginationButton pageNum={pageNum} link={generatePageParams(pageNum)} isCurrentPage={currentPage === pageNum} />
                })}
                <li className={`page-item ${parseInt(currentPage) === maxPages ? 'disabled' : ''}`}>
                    <a className="page-link" href={generatePageParams(nextPage)}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pager;