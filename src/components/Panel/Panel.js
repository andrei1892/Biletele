import React, { useState } from 'react';
import PropTypes from 'prop-types';

import "./Panel.css";

const Panel = props => {

    const {children, customClass, forcedCollapsed = false, size = '', title} = props;

    const [collapse, setCollapse] = useState(false);

    const panelClasses = ['panel-container'];

    if (size) {
        panelClasses.push(size);
    }
    if (customClass) {
        panelClasses.push(customClass)
    }

    const statusClass = collapse ? 'collapsed' : 'uncollapsed';
    const arrowClass = collapse ? 'panel-collapsed' : 'panel-uncollapsed';
 
    return (
        <div className={panelClasses.join(' ')}>
            <div className='panel-header'>
                <header>{title}</header>
                <span className={`arrow ${arrowClass}`}  onClick={() => setCollapse(!collapse)}/>
            </div>
            <div className={`panel-body ${statusClass}`}>
            {children}
            </div>
        </div>
    )
}

Panel.SIZE = {
    SMALL: 'small',
    REGULAR: 'regular',
    LARGE: 'large',
}

Panel.propTypes = {
    customClass: PropTypes.string,
    forcedCollapsed: PropTypes.bool,
    size:  PropTypes.string,
    title: PropTypes.string,
}

export {Panel};