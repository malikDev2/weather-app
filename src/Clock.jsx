import React, { useState, useEffect} from 'react';

function Clock(){

    /* Store current time as Date object */
    const[time, setTime] = useState(new Date());

    /* Prevent excess rerendering using useEffect, update time */
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        /* Cleanup */
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    /* Format hours, minutes, seconds, and meridiem */
    function formatTime(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    /* Pad time with zero's if necessary*/
    function padZero(number){
        return (number < 10 ? "0" : "") + number;

    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>);
}


export default Clock