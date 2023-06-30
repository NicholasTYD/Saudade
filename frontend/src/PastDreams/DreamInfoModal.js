import { getAuthToken, getCsrfToken, convertYMDToDMY } from '../Misc/Helpers';
import React, { useState } from 'react';
import { StarRating, StarRatingReadOnly } from '../Rating/StarRating';
import Modal from "react-bootstrap/Modal";

import axios from 'axios';

function DreamInfoModal(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const originalData = {
        id: props.entry.id,
        title: props.entry.title,
        rating: props.entry.rating,
        date: props.entry.date,
        desc: props.entry.desc,
        user: props.entry.user,
    }
    const additionalParams = { token: getAuthToken() };
    const [dreamData, setDreamData] = useState({...originalData, ...additionalParams});

    function handleChange(e) {
        const { name, value } = e.target;
        setDreamData({ ...dreamData, [name]: value });
    }

    function handleRatingChange(score) {
        return () => {
            setDreamData({ ...dreamData, rating: score });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(dreamData);

        axios.post('/api/dream-update/', dreamData, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json'
            }
        }).then(response => {
            props.onEntryUpdate(response.data);
            setIsEditing(false);
        }).catch(error => {
            console.log(error);
            setMessage(error.response.data['message']);
        })
    }

    function handleDelete(e) {
        e.preventDefault();
        axios.post('/api/dream-delete/', dreamData, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Deleted Item");
            props.onEntryDelete();
        }).catch(error => {
            console.log(error);
            setMessage(error.response.data['message']);
        })
    }

    const EditDreamInfo =
        (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => { 
                    setIsEditing(false);
                    setDreamData(originalData);
                }}
            >
                <form className='bg-dark modal-border' onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title className='w-100' id="contained-modal-title-vcenter">
                            <input className='w-100 text-dark' type="text" name="title" defaultValue={dreamData.title} placeholder='title' onChange={handleChange}></input>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Header className='py-0 my-0'>
                        <div>
                            <input className='w-100 text-dark' type="date" name="date" defaultValue={dreamData.date} onChange={handleChange}></input>
                        </div>
                        <div>
                            <StarRating defaultScore={dreamData.rating}
                                on1Click={handleRatingChange(1)}
                                on2Click={handleRatingChange(2)}
                                on3Click={handleRatingChange(3)}
                                on4Click={handleRatingChange(4)}
                                on5Click={handleRatingChange(5)}
                                id={1}
                            />
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea className='w-100 text-dark bg-white' rows='10' name="desc" defaultValue={dreamData.desc} placeholder='Dream description' onChange={handleChange} />
                        {message && <div className='font-weight-italic alert mb-0 p-1 alert-warning alert-sm'>{message}</div>}
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between" >
                        <button onClick={() => setIsEditing(false)} type="button" className="btn btn-primary">Back</button>
                        <button type="submit" className="btn btn-success">Confirm</button>
                    </Modal.Footer>
                </form>
            </Modal>
        )

    const DeleteConfirmationModal = (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => { setShowDeleteConfirmation(false); }}
            centered
        >
            <div className='bg-dark modal-border '>
                <Modal.Body>
                    <Modal.Title>
                        Are you sure you want to delete this entry?
                    </Modal.Title>
                    This action is irreversible!
                </Modal.Body>
                <Modal.Footer className="justify-content-between" >
                    <button onClick={() => setShowDeleteConfirmation(false)} type="button" className="btn btn-success">Back</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
                </Modal.Footer>

            </div>
        </Modal>
    )

    const ViewDetailedInfoModal = (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='bg-dark modal-border'>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className='text-break'>
                        {props.entry.title}
                    </Modal.Title>
                    <button type="button" className="float-right btn btn-danger" onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
                </Modal.Header>
                <Modal.Header className='py-0 my-0'>
                    <div>{convertYMDToDMY(props.entry.date)}</div>
                    <div><StarRatingReadOnly score={props.entry.rating} /></div>
                </Modal.Header>
                <Modal.Body className='text-break' style={{ whiteSpace: 'pre-line' }}>
                    {props.entry.desc}
                </Modal.Body>
                <Modal.Footer className="justify-content-between" >
                    <button onClick={props.closefn} type="button" className="btn btn-secondary" closeButton>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
                </Modal.Footer>
            </div>
        </Modal>
    )

    const ViewDreamInfo = (
        <>
            {!showDeleteConfirmation && ViewDetailedInfoModal}
            {showDeleteConfirmation && DeleteConfirmationModal}
        </>
    )

    return (
        <>
            {isEditing && EditDreamInfo}
            {!isEditing && ViewDreamInfo}
        </>
    );
}

export default DreamInfoModal;