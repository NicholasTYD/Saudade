import React from 'react';
import { StarRatingReadOnly } from '../Rating/StarRating';
import { convertYMDToDMY } from '../Misc/Helpers';

function DreamEntry({ title, score, date }) {

    const dateCol = (
        <div className='col-6 col-md-3 col-lg-2 text-start py-1'>
            {convertYMDToDMY(date)}
        </div>
    )

    let dreamCol;
    if (score === "") {
        dreamCol = (
            <>
                <div className='col-12 col-md-6 col-lg-8 text-truncate text-start'>
                    <b>No Dreams</b> 😔
                </div>
                <div className='col-6 col-md-3 col-lg-2 opacity-25 text-start'>
                    <StarRatingReadOnly score={score} />
                </div>
            </>
        )
    } else {
        dreamCol = (
            <>
                <div className='col-12 col-md-6 col-lg-8 text-truncate text-start'>
                    {title}
                </div>
                <div className='col-6 col-md-3 col-lg-2'>
                    <StarRatingReadOnly score={score} />
                </div>
            </>
        )
    }

    return (
        <div className="row border entry-border bg-dark my-3 align-items-center dream-entry">
            {dateCol}
            {dreamCol}
        </div>
    )
}

export default DreamEntry;
