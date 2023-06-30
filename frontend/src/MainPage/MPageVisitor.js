import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import addEntryImage from './images/addEntry.png';
import pastDreamsImage from './images/pastDreams.png';
import statsImage from './images/stats.png';
import mobile1 from './images/mobileSupport1.png';
import mobile2 from './images/mobileSupport2.png';

function MPageVisitor() {
    const WINDOW_HEIGHT = window.innerHeight;
    // Hero, Add view, Edit, Stats, Mobile Support 1 & 2, Register
    const TOTAL_SEGMENTS = 7;
    const init_state = useMemo(() => new Array(TOTAL_SEGMENTS), [TOTAL_SEGMENTS]);
    init_state.fill(false);

    const [displayedSegment, setDisplayedSegment] = useState(false);
    const [segments, setSegments] = useState(init_state);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const determineCurrSegment = useCallback (() => {
        const currSegment = Math.floor(window.scrollY / WINDOW_HEIGHT);


        if (currSegment === displayedSegment) {
            return;
        }

        const newSegmentState = init_state.slice();
        newSegmentState[currSegment] = true;

        setIsTransitioning(true);
        setTimeout(() => {
            setSegments(newSegmentState);
            setIsTransitioning(false);
        }, 300);
        setDisplayedSegment(currSegment);
    }, [displayedSegment, WINDOW_HEIGHT, init_state]);

    useEffect(() => {
        window.addEventListener("scroll", determineCurrSegment);

        return () => {
            window.removeEventListener('scroll', determineCurrSegment);
        };
    }, [displayedSegment, determineCurrSegment])

    useEffect(() => {
        determineCurrSegment();
    }, [determineCurrSegment])

    function HeroPage() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h2 className='my-5'>Introducing</h2>
                    <h1 className={`text-center hero-text display-1`}>
                        Saudade
                    </h1>
                    <h2 className={`my-5 py-5 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}>
                        A site to track your dreams
                    </h2>
                </div>
            </>
        )
    }

    function AddPagePreview() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h1>
                    Add and Rate Dreams
                    </h1>
                    <img className={`preview-image border mt-4 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}
                        src={addEntryImage} alt='Add an entry'
                    />
                </div>
            </>
        )
    }
    
    function PastDreamsPreview() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h1>
                        View and Filter Past Dreams
                    </h1>
                    <img className={`preview-image border mt-4 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}
                        src={pastDreamsImage} alt='View and Filter Past Dreams'
                    />
                </div>
            </>
        )
    }

    function StatsPagePreview() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h1>
                        View Dream Statistics
                    </h1>
                    <img className={`preview-image border mt-4 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}
                        src={statsImage} alt='View Dream Statistics'
                    />
                </div>
            </>
        )
    }

    function MobileSupportPreview1() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h1 className='mb-5'>Mobile Responsive</h1>
                    <h2>PC view:</h2>
                    <img className={`preview-image border mt-4 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}
                        src={mobile1} alt='PC view'
                    />
                </div>
            </>
        )
    }

    function MobileSupportPreview2() {
        const [subtextActive, setSubtextActive] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h2>Mobile view:</h2>
                    <img className={`preview-image border mt-4 ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}
                        src={mobile2} alt='Mobile view'
                    />
                </div>
            </>
        )
    }

    function ConclusionPage() {
        const [subtextActive, setSubtextActive] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => {
                setSubtextActive(true);
            }, 500);
        }, [])
        
        return (
            <>
                <div className={`container text-center ${isTransitioning ? 'fastFadeOut' : 'fadeIn'}`}>
                    <h1 className={`text-center hero-text display-1`}>
                        Saudade
                    </h1>
                    <div className={`my-5 py-5 d-flex justify-content-evenly ${isTransitioning ? '' : subtextActive ? 'fadeIn' : 'opacity-0'}`}>
                        <button className='btn btn-success btn-xl px-4' onClick={() => navigate('/login/')}>
                            <h1>Login</h1>
                        </button>
                        <button className='btn btn-success btn-xl px-4' onClick={() => navigate('/register/')}>
                            <h1>Register</h1>
                        </button>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div style={{ height: `${TOTAL_SEGMENTS * 100}vh`}}>
            <div className="container-fluid position-fixed top-50 start-50 translate-middle">
                {segments[0] && <HeroPage />}
                {segments[1] && <AddPagePreview />}
                {segments[2] && <PastDreamsPreview />}
                {segments[3] && <StatsPagePreview />}
                {segments[4] && <MobileSupportPreview1 />}
                {segments[5] && <MobileSupportPreview2 />}
                {segments[6] && <ConclusionPage />}
            </div>
        </div>
    );
}

export default MPageVisitor;