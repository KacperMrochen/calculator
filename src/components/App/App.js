import {useEffect, useState} from 'react';
import React from 'react';

import Calculator from '../Calculator/Calculator';
import './App.css';

function App() {
  
  const [date, setDate] = useState(new Date());

  useEffect(() =>
  {
    setInterval(() => setDate(new Date()), 60000);
  }, [])

  return (
    <div className="App">
        <Calculator/>
      <div className='start bar'>
        <div className='left'>
          <div className='start-btn'></div>
          <div className='calculator app'></div>
        </div>
        <div className='right'>
          <div className='time'>
            {date.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
