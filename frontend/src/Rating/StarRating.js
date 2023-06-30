import './starRating.css';

export function StarRating({ on1Click, on2Click, on3Click, on4Click, on5Click, id=0, defaultScore }) {
    return (
        <div className="rate">
            <input type="radio" id={`star5-${id}`} name="rate" value="5" onClick={() => on5Click()} defaultChecked={defaultScore === 5} />
            <label htmlFor={`star5-${id}`} title="Give a rating">5 stars</label>
            <input type="radio" id={`star4-${id}`} name="rate" value="4" onClick={() => on4Click()} defaultChecked={defaultScore === 4} />
            <label htmlFor={`star4-${id}`} title="Give a rating">4 stars</label>
            <input type="radio" id={`star3-${id}`} name="rate" value="3" onClick={() => on3Click()} defaultChecked={defaultScore === 3} />
            <label htmlFor={`star3-${id}`} title="Give a rating">3 stars</label>
            <input type="radio" id={`star2-${id}`} name="rate" value="2" onClick={() => on2Click()} defaultChecked={defaultScore === 2} />
            <label htmlFor={`star2-${id}`} title="Give a rating">2 stars</label>
            <input type="radio" id={`star1-${id}`} name="rate" value="1" onClick={() => on1Click()} defaultChecked={defaultScore === 1} />
            <label htmlFor={`star1-${id}`} title="Give a rating">1 star</label>
        </div>
    )
}

export function StarRatingReadOnly({ score }) {
    return (
        <div className="rateReadOnly">
            <input type="radio" value="5" checked={score === 5} readOnly />
            <label>5 stars</label>
            <input type="radio" value="4" checked={score === 4} readOnly />
            <label>4 stars</label>
            <input type="radio" value="3" checked={score === 3} readOnly />
            <label>3 stars</label>
            <input type="radio" value="2" checked={score === 2} readOnly />
            <label>2 stars</label>
            <input type="radio" value="1" checked={score === 1} readOnly />
            <label>1 star</label>
        </div>
    )
}