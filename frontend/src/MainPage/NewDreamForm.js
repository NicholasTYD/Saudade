import React, { useState } from 'react';
import axios from 'axios'
import { getCsrfToken, getAuthToken, jsDateToDjangoDate } from '../Misc/Helpers';
import { StarRating } from '../Rating/StarRating';

function NewDreamForm({ isAddingToday, postSubmissionFn }) {
    const [message, setMessage] = useState(false)

    const [formData, setFormData] = useState({
        token: getAuthToken(),
        title: '',
        rating: '',
        date: isAddingToday ? jsDateToDjangoDate(new Date()) : '',
        desc: '',
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    function handleRatingChange(score) {
        return () => {
            setFormData({...formData, rating: score});
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        axios.post('/api/dream-create/', formData, {
            headers: {
              'X-CSRFToken': getCsrfToken(),
              'Content-Type': 'application/json'
            }
        })
        .then(response => postSubmissionFn())
        .catch(error => {
            console.log(error);
            setMessage(error.response.data['message']);
        })
    }

    const dreamForm = (
        <div className='container'>
        {message && <div className="alert alert-warning p-2">{message}</div>}
        <form onSubmit={handleSubmit}>
            <div className="row mx-1 mb-2">
                <input autoFocus className="form-control" type="text" name="title" placeholder="Give your dream a title" onChange={handleInputChange} />
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="my-2 mx-2 col-10 col-sm-5 d-flex justify-content-center">
                    <StarRating 
                        on1Click={handleRatingChange(1)} 
                        on2Click={handleRatingChange(2)} 
                        on3Click={handleRatingChange(3)} 
                        on4Click={handleRatingChange(4)} 
                        on5Click={handleRatingChange(5)}
                    />
                </div>
                <div className="my-2 mx-2 col-10 col-sm-5">
                    <input className="form-control" type="date" name="date" defaultValue={formData.date} onChange={handleInputChange} />
                </div>
            </div>
            <div className="row mx-1 my-4">
                <textarea className="form-control" rows='10' name="desc" placeholder="Dream details" onChange={handleInputChange} />
            </div>
            <div className="text-center my-2">
                <input className="btn btn btn-secondary text-center col-4" type="submit" value="Save!" />
            </div>
        </form>
        </div>
    );

    return dreamForm;
}

export default NewDreamForm;