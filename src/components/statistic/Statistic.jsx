import { useEffect, useRef, useState } from 'react';
import './statistic.css'

const Statistic = (props) => {
    const [timer, setTimer] = useState(0)
    const wpm = (props.correct/5) / (timer/60)
    const accuracy = (props.correct / (props.correct + props.errors))*100;
    let intervalRef = useRef(0)
    let counter = 0;

    // Calculate WPM
    

    // timer
    useEffect(() => {
        if(props.isStarted && !props.isFinshed) {
            console.log(wpm ? true : false);
            intervalRef.current = setInterval(() => {
                counter++
                setTimer(counter + 1)
            }, 1000)
            setTimer(counter + 1)
        } else if (props.isFinshed) {
            clearInterval(intervalRef.current)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.isStarted, props.isFinshed])

    return ( 
        <div className="statistic">
            <div className="wpm st">
                <h3>Speed:</h3>
                <span>{isNaN(wpm) ? 0 : Math.round(wpm)} WPM</span>
            </div>
            {props.isFinshed ? 
                <div className="accuracy st">
                    <h3>Accuracy:</h3>
                    <span>{Math.round(accuracy)}%</span>
                </div>
            : <div></div>}
            <div className="timer st">
                <h3>Timer:</h3>
                <span>{timer}s</span>
            </div>
        </div>
     );
}
 
export default Statistic;