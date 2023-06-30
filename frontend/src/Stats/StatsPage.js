import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import '../styles.css'
import DreamEntry from '../PastDreams/DreamEntry';
import DreamInfoModal from '../PastDreams/DreamInfoModal';
import { getCsrfToken, getAuthToken, convertYMDToDMY } from '../Misc/Helpers';
import axios from 'axios';

function StatsPage() {
    const interval = 6;

    const [months, setMonths] = useState([]);
    const [dreamCountTotalRecent, setDreamCountTotalRecent] = useState(0);
    const [dreamCountDist, setDreamCountDist] = useState([]);
    const [dreamCountAveRecent, setDreamCountAveRecent] = useState(0);

    const [ratingAveDist, setRatingAveDist] = useState([]);
    const [ratingAveRecent, setRatingAveRecent] = useState(0);
    const [ratingAveLifetime, setRatingAveLifetime] = useState(0);

    const [hasDreamsDist, setHasDreamsDist] = useState([]);
    const [hasDreamCountRecent, setHasDreamCountRecent] = useState(0);
    const [totalDaysRecent, setTotalDaysRecent] = useState(0);
    const [hasDreamPercentageRecent, setHasDreamPercentageRecent] = useState(0);

    const [ratingSpreadRecent, setRatingSpreadRecent] = useState([]);
    const [ratingSpreadLifetime, setRatingSpreadLifetime] = useState(false);

    const [dreamCountTotal, setDreamCountTotal] = useState(0);
    const [dayWithMostDreams, setDayWithMostDreams] = useState(0);
    const [dayWithMostDreamsCount, setDayWithMostDreamsCount] = useState(0);
    const [longestDreamLength, setLongestDreamLength] = useState(0);

    const [longestDream, setLongestDream] = useState(false);
    const [dreamModalShow, setDreamsModalShow] = useState(false);

    const getData = async () => {
        try {
            const response = await axios.post('/api/dream-stats/', {
                "token": getAuthToken(),
                "interval": interval,
            }, {
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                    'Content-Type': 'application/json'
                }
            })
            const data = response.data;

            if (!data.hasAtLeastOneDream) {
                return;
            }

            setMonths(data.months);
            setDreamCountTotalRecent(data.dreamCountTotalRecent);
            setDreamCountDist(data.dreamCountDist);
            setDreamCountAveRecent(data.dreamCountAveRecent.toFixed(2));

            setRatingAveDist(data.ratingAveDist);
            setRatingAveRecent(data.ratingAveRecent.toFixed(2));
            setRatingAveLifetime(data.ratingAveLifetime.toFixed(2));

            setHasDreamsDist(data.hasDreamsDist);
            setHasDreamCountRecent(data.hasDreamCountRecent);
            setTotalDaysRecent(data.totalDaysRecent);
            setHasDreamPercentageRecent(data.hasDreamPercentageRecent);

            setRatingSpreadRecent(data.ratingSpreadRecent);
            setRatingSpreadLifetime(data.ratingSpreadLifetime);

            setDreamCountTotal(data.dreamCountTotal);
            setDayWithMostDreams(convertYMDToDMY(data.mostDreamsDay.date));
            setDayWithMostDreamsCount(data.mostDreamsDay.dreamsOnDay);
            setLongestDreamLength(data.longestDreamLength);

            setLongestDream(data.longestDream);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.AOS.init();
        getData();
    }, [])

    function generateDreamLengthComment(length, rating) {
        const short = 50;
        const medium = 1000;

        const nightmare = 1;
        const sweet = 4;

        if (length <= short) {
            if (rating === nightmare) {
                return "Good thing it's a short one!";
            } else if (rating < sweet) {
                return "You should try describing your dreams more! Pleasant dreams should be remembered...";
            } else {
                return "Short and Sweet.";
            }
        } else if (length <= medium) {
            return "";
        } else {
            if (rating === nightmare) {
                return "That must have been tough!";
            } else if (rating < sweet) {
                return "That must have been pretty memorable.";
            } else {
                return "If only we can relive those dreams once more...";
            }
        }
    }

    return (
        <div className='container-sm my-4 disable-overflow-x disable-overflow-y'>
            <div className="fadeIn">
                <h1 className="text-center fadeIn">Statistics</h1>
                <hr></hr>
            </div>
            <h2 className="fadeIn text-center mb-5">During the last 6 months...</h2>
            <div className="row d-flex align-items-center my-5">
                <div data-aos="fade-right" data-aos-duration="1000" className="col-12 col-lg-8">
                    <LineChart chartTitle='Dream Amount Distribution' months={months} chartData={dreamCountDist} />
                </div>
                <h5 data-aos="fade-up" data-aos-duration="1000" className="order-lg-2 col-12 col-lg-4 text-center mt-4">
                    ...you had a total of <strong>{dreamCountTotalRecent}</strong> dreams with an average of <strong>{dreamCountAveRecent}</strong> a day.
                </h5>
            </div>
            <hr></hr>
            <div className="row d-flex align-items-center my-5">
                <div data-aos="fade-left" data-aos-duration="1000" className="order-lg-2 col-12 col-lg-8">
                    <LineChart chartTitle='Average Rating Distribution' months={months} chartData={ratingAveDist} average={ratingAveLifetime} />
                </div>
                <h5 data-aos="fade-up" data-aos-duration="1000" className="col-12 col-lg-4 text-center mt-4">
                    ...your dreams have an average rating of <strong>{ratingAveRecent}</strong>,
                    compared to your lifetime average of <strong>{ratingAveLifetime}</strong>.
                </h5>
            </div>
            <hr></hr>
            <div className="row d-flex align-items-center my-5">
                <div data-aos="fade-right" data-aos-duration="1000" className="col-12 col-lg-8">
                    <LineChart chartTitle='Days with at least a dream' months={months} chartData={hasDreamsDist} />
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" className="order-lg-2 col-12 col-lg-4 text-center mt-4">
                    <h5>
                        ...you managed to have at least one dream for <strong>{hasDreamCountRecent}</strong> out of <strong>{totalDaysRecent}</strong> days.
                    </h5>
                    <h5>Thats <strong>{(hasDreamPercentageRecent * 100).toFixed(2)}</strong>% of the days.</h5>
                </div>
            </div>
            <hr></hr>
            
            { ratingSpreadLifetime &&
                <div className="row d-flex align-items-center my-5">
                    <div data-aos="fade-up" data-aos-duration="1000" className="col-12 col-md-6">
                        <DonutChart chartTitle='Rating Distribution' chartData={ratingSpreadRecent} />
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" className="col-12 col-md-6">
                        <DonutChart chartTitle='Lifetime Rating Distribution' chartData={ratingSpreadLifetime} />
                    </div>
                    <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-200" className="text-center mt-4">
                            ...and you gave out the above ratings.
                    </h5>
                </div>
            }
            { ratingSpreadLifetime && <hr></hr>}
            
            <h2 data-aos="fade-up" data-aos-duration="1000" className="text-center my-5">Interesting Stats</h2>
            <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-offset="50" className='text-center my-5'>
                You have recorded a total of {dreamCountTotal} dreams in total.
            </h5>

            {
                dreamCountTotal !== 0 &&
                <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-offset="50" className='text-center my-5'>
                You had the most dreams on {dayWithMostDreams} with {dayWithMostDreamsCount} dreams.
                </h5>
            }

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="50" className='text-center'>
            {longestDream &&
                <>
                <h5 className='mb-4'>
                    The dream with the longest description is {longestDreamLength} characters long!
                </h5>
                <div onClick={() => setDreamsModalShow(true)}>
                    <DreamEntry title={longestDream.title} score={longestDream.rating} date={longestDream.date} />
                </div>
                <DreamInfoModal
                    show={dreamModalShow} onHide={() => setDreamsModalShow(false)}
                    entry={longestDream} closefn={() => setDreamsModalShow(false)}
                    onEntryUpdate={() => window.location.reload()}
                    onEntryDelete={() => window.location.reload()} />
                <h5>{generateDreamLengthComment(longestDreamLength, longestDream.rating)}</h5>
                </>
            }
            </div>
        </div>
    )
}

export default StatsPage