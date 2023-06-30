import React, { useState } from 'react';

function SearchMenu({ urlSearchParamsObj, displayAllResults }) {
    const [message, setMessage] = useState(false);

    const oneStar = "oneStar";
    const twoStar = "twoStar";
    const threeStar = "threeStar";
    const fourStar = "fourStar";
    const fiveStar = "fiveStar";

    function getDefaultCheckedVal(name) {
        return displayAllResults || (name in urlSearchParamsObj);
    }

    // Remove empty string from search query (The search bar)
    function cleanAndSubmit(e) {
        const startDateVal = e.target.elements.startDate.value;
        const endDateVal = e.target.elements.endDate.value;
        if (startDateVal !== "" && endDateVal !== "" && startDateVal > endDateVal) {
            e.preventDefault();
            setMessage("Your start date cannot be after your end date!");
            return;
        }

        if (e.target.elements.keywords.value === "") {
            e.target.elements.keywords.disabled = true;
        }
        if (startDateVal === "") {
            e.target.elements.startDate.disabled = true;
        }
        if (endDateVal === "") {
            e.target.elements.endDate.disabled = true;
        }
    }

    return (
        <>
            {message && <div className="alert alert-warning p-2">{message}</div>}
            <form onSubmit={cleanAndSubmit}>
                <div className="my-2">
                    <input className="form-control" type="text" name="keywords" defaultValue={urlSearchParamsObj.keywords} placeholder="Search dreams" />
                </div>

                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-10 mb-3 col-md-4 col-lg-3">
                        <label className="control-label" for="startDate">From:</label>
                        <input className="form-control" id="startDate" type="date" name="startDate" defaultValue={urlSearchParamsObj.startDate} />
                    </div>
                    <div className="col-10 mb-3 col-md-4 col-lg-3">
                        <label className="control-label" for="endDate">To:</label>
                        <input className="form-control" id="endDate" type="date" name="endDate" defaultValue={urlSearchParamsObj.endDate} />
                    </div>
                </div>

                <div className='d-flex justify-content-center mx-auto'>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input bigger-size" type="checkbox" defaultChecked={getDefaultCheckedVal(oneStar)} id='star1' name={oneStar} />
                        <label className="form-check-label bigger-size" htmlFor="star1">1 star</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input bigger-size" type="checkbox" defaultChecked={getDefaultCheckedVal(twoStar)} id='star2' name={twoStar} />
                        <label className="form-check-label bigger-size" htmlFor="star2">2 star</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input bigger-size" type="checkbox" defaultChecked={getDefaultCheckedVal(threeStar)} id='star3' name={threeStar} />
                        <label className="form-check-label bigger-size" htmlFor="star3">3 star</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input bigger-size" type="checkbox" defaultChecked={getDefaultCheckedVal(fourStar)} id='star4' name={fourStar} />
                        <label className="form-check-label bigger-size" htmlFor="star4">4 star</label>
                    </div>
                    <div className="form-check form-check-inlinee">
                        <input className="form-check-input bigger-size" type="checkbox" defaultChecked={getDefaultCheckedVal(fiveStar)} id='star5' name={fiveStar} />
                        <label className="form-check-label bigger-size" htmlFor="star5">5 star</label>
                    </div>
                </div>


                <div className="text-center my-2">
                    <input className="btn btn-secondary text-center" type="submit" value="Search" />
                </div>
            </form>
        </>
    )
}

export default SearchMenu;