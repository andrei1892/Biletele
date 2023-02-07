import React from 'react';

import './Tooltip.css';

const Tooltip = props => {
    // custom tooltip
    const {children, extraClass='', position, content} = props;
    return (
        <div className='tooltip-container'>
            {children}
            <div className={`tooltip-content tooltip-${position} ${extraClass}`}>
                {content}
            </div>
        </div>
    )
}

Tooltip.POSITION = {
  AUTO: 'auto',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP: 'top',
  RIGHT: 'right',
}

Tooltip.defaultProps = {
  placement: Tooltip.POSITION.AUTO,
  target: null
}

export {Tooltip};
