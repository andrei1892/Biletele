import React from 'react';

import './Toggle.css';

export const Toggle = props => {
    const {label, extraClass, onClick, value=false} = props;

    const onToggle = () => {
        onClick(!value);
    }

    return (
        <label className={`toggle ${extraClass}`}>
            <span className="toggle-label">{label}</span>
            <input className="toggle-checkbox" type="checkbox" onChange={onToggle} checked={value} />
            <div className="toggle-switch"></div>
        </label>
    )
}