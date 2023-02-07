import React from "react";
import * as BootstrapIcon from 'react-bootstrap-icons';

// The icon names are the PascalCase version of the original name. 
// For those icons whose name begins with a number, the Icon prefix will be used. Examples: arrow-right → ArrowRight, 1-circle → Icon1Circle
// icon list -> https://icons.getbootstrap.com

const Icon = props => {
    const {type, extraClass='' , color, onClick, ...rest} = props;

    const IconCompoent = BootstrapIcon[type]

    return (
        <div className={`icon-container ${extraClass}`} onClick={onClick} {...rest}>
            <IconCompoent color={color}/>
        </div>
    )
}

export {Icon}