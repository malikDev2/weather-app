import React, { useState } from 'react';
import './index.css';

function Mode(){

    /* Create mutatable variables using useState */
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isDarkMode, setIsDarkMode] = useState(false);

    /* Change background color using color input */
    function changeColor(event){
        const newColor = event.target.value;
        setBackgroundColor(newColor);
        document.documentElement.style.setProperty('--dynamic-color', newColor);
    }

    /* Change background from light to dark using button */
    function changeMode(event){
        const newColorMode = isDarkMode ? '#ffffff' : '#000000';
        document.documentElement.style.setProperty('--color-mode', newColorMode);
        setIsDarkMode(!isDarkMode);
    }

    return(<>
    <button className="mode"
            onClick = {changeMode}
    >☾</button>
    <input className ="color" 
            type="color" 
            value={backgroundColor}
            onChange={changeColor}/>
    </>);
}

export default Mode