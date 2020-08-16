import React, { useState } from 'react'
import './ComboBox.scss';

function ComboBox({ countries, onChange }) {
    const [isOpen, setOpen] = useState(false),
        [placeholder, setPlaceholder] = useState('Worldwide')

    const showDropdown = () => {
        setOpen(true);
        document.addEventListener("click", hideDropdown);
    };

    const hideDropdown = () => {
        setOpen(false);
        document.removeEventListener("click", hideDropdown);
    };

    const renderDataDropDown = ({ name, value }, index) => {
        const { key, label } = { key: index, label: name };
        return (
            <li
                key={key}
                value={value}
                onClick={() => {
                    chooseItem(label);
                    onChange(label);
                }}
            >{label}
            </li>
        )
    };

    const chooseItem = (chosenValue) => {
        if (placeholder !== chosenValue) {
            setPlaceholder(chosenValue)
        }
    };
    return (
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
            <button className="dropdown-toggle" type="button" onClick={showDropdown}>
                {placeholder}
                <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
                <li
                    key="0"
                    onClick={() => {
                        chooseItem('Worldwide');
                        onChange('worldwide');
                    }}
                >Worldwide</li>
                {countries.map(renderDataDropDown)}
            </ul>
        </div>
    )
}

export default ComboBox
