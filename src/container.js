import React from 'react';
import MapObj from './map.js'

function Container()
{
    return(
        <div className='container' style={{backgroundColor: 'grey'}}>
            <MapObj />
            
            <p id='state'></p>
        </div>
    );


}

export default Container;