import '../styles.css';
import React, { useState, useEffect } from 'react';
import NewDreamForm from './NewDreamForm';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen({ onYesButtonClick, onNoButtonClick, onPrevButtonClick, onPrevNoDreamButtonClick }) {
    const [welcome, setWelcome] = useState(true);
    const [question, setQuestion] = useState(false);

    useEffect(() => {
        setTimeout(() => setWelcome(true), 0);
        setTimeout(() => setQuestion(true), 400);
    }, []);

    return (
        <>
            <h1 className={`text-center welcome-text ${welcome ? 'fadeIn' : 'opacity-0'}`}>
                Welcome Back!
            </h1>
            <h1 className={`mt-3 mb-5 text-center ${question ? 'fadeIn' : 'opacity-0'}`}>
                What dreams do you want to record today?
            </h1>
            <div className={`d-flex flex-column col-6 justify-content-between mt-5 text-center ${question ? 'fadeIn' : 'opacity-0'}`}>
                <button className='btn btn-lg btn-secondary m-3' onClick={() => onYesButtonClick()}>I want to add a dream that I had today.</button>
                <button className='btn btn-lg btn-secondary m-3' onClick={() => onPrevButtonClick()}>I want to add a dream that I had on a previous date.</button>
            </div>
        </>
    );
}

function NewDreamScreen({ isAddingToday }) {
    const [formSubmitted, setformSubmitted] = useState(false);

    function NewDreamPrompt() {
        return (
            <div className='col-sm-12 col-lg-6 fadeInCreateNewDream'>
                <h1 className="mt-3 mb-4 text-center fadeInCreateNewDream">
                    Great! Hope you had a sweet one.
                </h1>
                <h4 className="mb-5 text-center fadeInCreateNewDream">
                    Lets note it down!
                </h4>
                <NewDreamForm isAddingToday={isAddingToday} postSubmissionFn={() => setformSubmitted(true)} />
            </div>
        )
    }

    const extraMessage = "Alright! Your dream has been successfully recorded.";

    return (
        <>
            {!formSubmitted && <NewDreamPrompt />}
            {formSubmitted && <PostSubmitScreen extraMessage={extraMessage} />}
        </>
    )
}

function PostSubmitScreen({ extraMessage }) {
    const navigate = useNavigate();

    return (
        <div className='mx-3'>
            <h1 className="mt-3 mb-5 text-center fadeIn">
                {extraMessage}
            </h1>
            <h4 className="mt-3 mb-5 text-center fadeIn">
                If you want to make any changes, you can always do so at the "Past Dreams" tab.
            </h4>
            <h4 className="mt-3 mb-5 text-center fadeIn">
                In the meantime, why not view some of your past dreams, or add another one?
            </h4>
            <div className='d-flex justify-content-evenly fadeIn'>
                <button className='btn btn-secondary btn-lg px-4' onClick={() => navigate('/all/')}>
                    <h5>View Past Dreams</h5>
                </button>
                <button className='btn btn-secondary btn-lg px-4' onClick={() => window.location.reload()}>
                    <h5>Add Another Dream</h5>
                </button>
            </div>
        </div>
    )
}

function MPageUser() {
    const [initPrompt, setInitPrompt] = useState(true);
    const [newDream, setNewDream] = useState(false);
    const [isAddingToday, setIsAddingToday] = useState(true);

    function handleWelcomeYesButtonClick() {
        setInitPrompt(false);
        setNewDream(true);
        setIsAddingToday(true);
    };

    function handleWelcomePrevButtonClick() {
        setInitPrompt(false);
        setNewDream(true);
        setIsAddingToday(false);
    };

    return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '70vh' }}>
            {initPrompt && <WelcomeScreen onYesButtonClick={handleWelcomeYesButtonClick}
                onPrevButtonClick={handleWelcomePrevButtonClick} />}
            {newDream && <NewDreamScreen isAddingToday={isAddingToday} />}
        </div>
    );
};

export default MPageUser;
