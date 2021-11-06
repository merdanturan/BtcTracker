import React, { useState, useEffect } from 'react'
import './style.css'

const Counter = () => {

    ///States for hour, minute and second

    const [hours, setHours] = useState(10)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    ///Button logics

    const buttonHandler = (type) => {
        if (type === "hourIncrease") {
            setHours( hours + 1);
        }
        else if (type === "hourDecrease" && hours !== 0) {
            setHours( hours - 1);
        }
        else if (type === "minuteIncrease" && minutes !== 59) {
            setMinutes( minutes + 1);
        }
        else if (type === "minuteDecrease" && minutes !== 0) {
            setMinutes( minutes - 1);
        }
        else if (type === "secondIncrease" && seconds !== 59) {
            setSeconds( seconds + 1);
        }
        else if (type === "secondDecrease" && seconds !== 0) {
            setSeconds( seconds - 1);
        }
    }

    ///Countdown

    function updateTime() {
        if (minutes === 0 && seconds === 0 && hours === 0) {
            //reset
            setSeconds(0);
            setMinutes(0);
            setHours(10);
        }
        else {
            if (minutes === 0 && seconds === 0) {
                setHours(hours => hours - 1);
                setMinutes(59);
                setSeconds(59);
            }
            else if (seconds === 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            }
        }
    }


    useEffect(() => {
        // use set timeout and be confident because updateTime will cause rerender
        // rerender mean re call this effect => then it will be similar to how setinterval works
        // but with easy to understand logic
        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
            clearTimeout(token);
        }
    })




    return (
        <div className="timer">
            <div>
                <button onClick={()=>buttonHandler("hourIncrease")}>+</button> 
                <button onClick={()=>buttonHandler("minuteIncrease")}>+</button> 
                <button onClick={()=>buttonHandler("secondIncrease")}>+</button> 
            </div>

            <span>
                {hours < 10 ? 0 : ""}{hours}
                :
                {minutes < 10 ? 0 : ""}{minutes}
                :
                {seconds < 10 ? 0 : ""}{seconds}
            </span>

            <div>
                <button onClick={()=>buttonHandler("hourDecrease")}>-</button> 
                <button onClick={()=>buttonHandler("minuteDecrease")}>-</button> 
                <button onClick={()=>buttonHandler("secondDecrease")}>-</button> 
            </div>
        </div>
    );
}

export default Counter
