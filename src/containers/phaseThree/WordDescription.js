import React, { useState } from 'react';

import {Toggle} from '../../components/Toggle/Toggle';

import './phaseThree.css';

export const WordDescription = (props) => {
    const {text} = props;
    const [description, toggleDescription] = useState(false);
    
    return (
        <div className='current-description'>
             <Toggle label={'Descriere'} extraClass={'toggle-container'} value={description} onClick={toggleDescription}/>
            {description && <span className='description-text'>{text}</span>}
         </div>
    )
}