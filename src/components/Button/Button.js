import React from 'react';

import './Button.css';

const Button = props => {
    const {disabled, extraClass, onClick, text} = props;

    const classes = ['standard-button'];

    const onButtonClick = (ev) => {
        // if(ev) {
        //     console.log(ev);
        // }
        onClick(ev)
    } 

    if (extraClass) {
        classes.push(extraClass);
    }

    if (disabled) {
        classes.push('disabled');
    }

    return (
        <button
            className={classes.join(' ')}
            disabled={disabled}
            onClick={onButtonClick}
        >
            {text}
        </button>
    )
}

export {Button};