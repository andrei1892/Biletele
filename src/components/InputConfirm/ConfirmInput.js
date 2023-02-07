import React, {useState} from 'react';

import {Input} from '../Input/Input';
import {Icon} from '../Icons/Icon';

import './ConfirmInput.css';

const ConfirmInput = (props) => {

    const {onDelete, onConfirm, value} = props;
    const [initial, setInitial] = useState(value);
    const [editValue, setNewValue] = useState(value);
    const [inEdit, isEditing] = useState(false);

    const onChange = (val) => {
        setNewValue(val);
    }

    const onFocus = () => {
        isEditing(true);
    }

    const onBlur = () => {
        isEditing(false);
        setNewValue(initial);
    }

    // const onCofirmEdit = () => {
        //  if (inEdit) {
        //     onConfirm(initial, editValue);
        //     setInitial(editValue)
        // }
    // }

    const onDeleteValue = () => {
        onDelete(editValue);
    }


    // const getIconType =  inEdit ? 'CheckCircle' : 'Pencil';
    // const getIconColor = inEdit ? 'green' : '#f39339';
    
    return (
        <div className='confirm-input'>
            <Input
                type={'text'}
                value={editValue}
                onEdit={value => onChange(value)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <Icon type={'Trash'}  onClick={() => onDeleteValue()} color={'red'} />
            {/* <Icon type={getIconType} onClick={() => onCofirmEdit()} color={getIconColor} /> */}
        </div>
    )
}

export {ConfirmInput};