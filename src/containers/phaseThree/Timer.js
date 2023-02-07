import React, {useState, useEffect} from "react";

import {Button} from '../../components/Button/Button';

import './Timer.css';

// const START_STATE = 'start';
// const STOP_STATE = 'stop';
// const PAUSE_STATE = 'pause';


const Timer = (props) => {
    const {inPlay, onEnd} = props;
    // const [roundState , changeState] = useState(STOP_STATE);
    const [pause, togglePause] = useState(false);
    const [pauseText, toggleText] = useState('Pauza')
    const [seconds, setSeconds] = useState(55);

    const time = Math.floor(seconds % 60);

    const onReset = () => {
        // changeState(STOP_STATE);
        setSeconds(55);
        toggleText('Pauza');
        togglePause(false);
        onEnd();
    }

    const onToggle = () => {
        pause ? toggleText('Pauza') : toggleText('Continua');
        togglePause(!pause);
    }

    useEffect(()=>{
        if(inPlay) {
            let myInterval = setInterval(() => {
                    if (seconds > 0) {
                        setSeconds(seconds - 1);
                    }
                    if (seconds === 0) {
                        setSeconds(55);
                        onEnd();
                        return  ()=> clearInterval(myInterval);
                    } 
                    if (pause) {
                    toggleText('Continua');
                    setSeconds(seconds);
                    return  ()=> clearInterval(myInterval);
                }

                }, 1000);

            return ()=> clearInterval(myInterval);
        } else {
            setSeconds(55);
        }

    },[inPlay, onEnd, pause, seconds]);

    const timerClass = time < 10 && time >= 0 ? 'timer-component alert' : 'timer-component';

    return (
        <div className={timerClass}>
            <div className='timer'>
                <label>Timp Ramas</label>
                <span>{time}</span>
            </div>
            <div className="buttons">
                <Button
                    onClick={() => onToggle()}
                    text={pauseText}
                />
                 <Button
                    onClick={() => onReset()}
                    text={'Restart'}
                />
            </div>
        </div>
    )
}

export {Timer};