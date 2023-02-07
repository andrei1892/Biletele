import React from 'react';
import PropTypes from 'prop-types';

import './Description.css';

const Description = (props) => {
    const {error, disabled, extraClass, onEdit, placeholder, resize, value} = props;

    const onChange = (ev) => {
        onEdit(ev.target.value)
    }

    const classes = ['textarea'];

    if (resize) {
        classes.push('allow-resize');
    }

    if(disabled) {
        classes.push('description-disabled')
    }

    if (extraClass) {
        classes.push(extraClass);
    }

    return (
        <>
            <textarea
                className={classes.join(' ')}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            {error && <div>{error}</div>}
        </>
    )
}


Description.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    onEdit: PropTypes.func,
    placeholder: PropTypes.string,
    resize: PropTypes.bool,
    value: PropTypes.string,
};

export {Description}