import { getMaxEntriesPerPage, setMaxEntriesPerPage } from "../Misc/Helpers";

function MaxEntriesPerPageDropdown({ urlSearchParams }) {
    function handleMaxEntryChange(e) {
        setMaxEntriesPerPage(e.target.value);
        urlSearchParams.set('pageNum', 1);
        window.location.href = `?${urlSearchParams.toString()}`;
    }

    return (
        <div class="form-group text-center">
            <label className='mx-2' for="sel1">Max entries per page:</label>
            <select onChange={handleMaxEntryChange} class="form bg-secondary" id="sel1" defaultValue={getMaxEntriesPerPage()}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
            </select>
        </div>
    )
}

export default MaxEntriesPerPageDropdown;