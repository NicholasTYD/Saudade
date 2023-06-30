import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import Pager from './Pager';
import MaxEntriesPerPageDropdown from './MaxEntriesPerPageDropdown';
import DreamEntry from './DreamEntry';
import DreamInfoModal from './DreamInfoModal';

import './pastDreams.css'
import '../styles.css'
import axios from 'axios';
import { getAuthToken, getCsrfToken, getMaxEntriesPerPage, setMaxEntriesPerPage } from '../Misc/Helpers';


function PastDreams() {
    const [entries, setEntries] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setisLoading] = useState(true);
    const [dreamsModalShow, setDreamsModalShow] = useState({});

    if (getMaxEntriesPerPage() === null) {
        setMaxEntriesPerPage(10);
    }

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    // Converts all the params in the url bar into an object of param key: value pairs
    const urlSearchParamsObj =
        Array.from(urlSearchParams.entries())
            .reduce((obj, [key, value]) => {
                // Check to ensure pageNum doesn't end up in it
                // (does not matter though, simply for cleanliness)
                if (key === 'pageNum') {
                    return obj
                } else {
                    return { ...obj, [key]: value }
                }
            }, {});

    // For cases where a user enters the page from somewhere else and not the same page.
    const displayAllResults = Object.keys(urlSearchParamsObj).length === 0 ||
        (Object.keys(urlSearchParamsObj).length === 1 && urlSearchParams.get('pageNum') !== null);

    let pageNum = urlSearchParams.get('pageNum');
    pageNum = pageNum === null ? 1 : parseInt(pageNum);

    const miscParamsObj = {
        token: getAuthToken(),
        pageNum: pageNum,
        entryPerPage: getMaxEntriesPerPage(),
        displayAllResults: displayAllResults,
    }

    const querySettings = { ...miscParamsObj, searchParams: urlSearchParamsObj };

    const getData = async () => {
        try {
            setisLoading(true);
            const response = await axios.post('/api/dream-list/', querySettings, {
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                    'Content-Type': 'application/json'
                }
            })
            setEntries(response.data.entries);
            setDreamsModalShow(response.data.entries.reduce((obj, entry) => ({ ...obj, [entry.id]: false }), {}));
            setTotalPages(response.data.totalPages);
            setisLoading(false);
        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // For editing entries
    function updateEntries(entryId) {
        return (updatedEntry) => {
            setEntries(entries.map(entry => entry.id === entryId ? updatedEntry : entry));
            setDreamsModalShow({ ...dreamsModalShow, entryId: true });
        }
    }

    function renderDreamEntry(entry) {
        return (
            <>
                <div onClick={() => { setDreamsModalShow({ ...dreamsModalShow, [entry.id]: true }) }}>
                    <DreamEntry title={entry.title} score={entry.rating} date={entry.date} />
                </div>
                <DreamInfoModal
                    show={dreamsModalShow[entry.id]} onHide={() => setDreamsModalShow({ ...dreamsModalShow, [entry.id]: false })}
                    entry={entry} closefn={() => setDreamsModalShow({ ...dreamsModalShow, [entry.id]: false })}
                    onEntryUpdate={updateEntries(entry.id)}
                    onEntryDelete={() => window.location.reload()} />
            </>
        )
    }

    const DreamsDisplayUI = (
        <div className='container'>
            {entries.length > 0 ? (
                entries.map(entry => renderDreamEntry(entry))
            ) : (
                <h4 className='text-center m-5'>No dreams found. Why not note some down today?</h4>
            )}

        </div>
    )

     

    return (
        <div className='container-sm my-4 container-normal'>
            <h1 className='text-center my-3 table-fixed'>Past Dreams</h1>
            <hr></hr>
            <SearchMenu urlSearchParamsObj={urlSearchParamsObj} displayAllResults={displayAllResults} />
            <hr></hr>
            <MaxEntriesPerPageDropdown urlSearchParams={urlSearchParams} />
            <Pager currentPage={pageNum} maxPages={totalPages} urlSearchParams={urlSearchParams} />
            {!isLoading && DreamsDisplayUI}
            {!isLoading && <Pager currentPage={pageNum} maxPages={totalPages} />}
        </div>
    )
}
export default PastDreams