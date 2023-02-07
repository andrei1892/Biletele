import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = (props) => {
    const {
        defaultValue,
        disabled,
        extraClass = '',
        error,
        onEdit,
        onBlur,
        placeholder,
        type,
        validator,
        value,
        ...rest
    } = props;

    const [hasError, setError] = useState(false)

    const onChange = ev => {
        if (validator && typeof validator === 'function') {
            validator(ev.target.value) ? setError(false) : setError(true)
        }
        onEdit(ev.target.value)
    }

    const onInputBlur = () => {
        if (validator && typeof validator === 'function') { 
            validator(value) ? setError(false) : setError(true)
        }
        if (onBlur && typeof onBlur === 'function') { 
            onBlur(value)
       }
    }

    
    const classes = [];

    if (type === 'range') {
        classes.push('range-input');
    }

    if (disabled) {
        classes.push('input-disabled')
    }

    if (extraClass) {
        classes.push(extraClass);
    }

    if(hasError) {
        classes.push('error');
    }

    return (
        <>
            <input
                className={classes.join(' ')}
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                value={value}
                onChange={(ev) => onChange(ev)}
                onBlur={onInputBlur}
                disabled={disabled}
                {...rest}
            />
            {hasError && <span className='error-message'>{error}</span>}
        </>
    )
}

Input.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    extraClass: PropTypes.string,
    error: PropTypes.string,
    onBlur: PropTypes.func,
    onEdit: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    validator: PropTypes.func, // validation function should return true if the validation is correct and false if there is an error
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};


export {Input};