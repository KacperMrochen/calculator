import {useEffect, useState} from 'react';
import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';

import './App.css';

function App() {
  const [memory, setMemory] = useState("");
  const [result, setResult] = useState("");
  const [math, setMath] = useState("");
  const [usedPoint, setUsedPoint] = useState(false);
  const [date, setDate] = useState(new Date());

  //regex

  const symbol = ["/", "*", "+"];
  const negative = "-";
  const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const point = ".";
  
  //Show result

  const calculate = () => {
    if(math === "0" || math==="" || negative.includes(math.at(-2))) {
      return 0;
    } else {
      setResult(eval(math).toString());
    }
  }
  
  //handling user input

  const someMath = (e) => {

    const handleMath = e.target.value

    //toggle point

    if(point.includes(handleMath)) {
      setUsedPoint(true);
    }
    if(symbol.includes(handleMath.at(-2))) {
      setUsedPoint(false);
    }

    //input validation

    if(
      (math === "0" && handleMath ==="0" && usedPoint === false) || // math = "00"
      (math === "" && symbol.includes(handleMath)) || //math = "/ ..."
      (negative.includes(math.at(-4)) && negative.includes(handleMath.at(-2))) || 
      (symbol.includes(handleMath) && symbol.includes(math.at(-1))) || // math = "... // ..."
      (point.includes(handleMath) && point.includes(math.at(-1))) || // math = "'.' ..."
      (symbol.includes(handleMath) && point.includes(math.at(-1))) || // math = "/. ..."
      (point.includes(handleMath) && symbol.includes(math.at(-1))) || //math = "./ ..."
      (symbol.includes(math.at(-2)) && math.at(-1) === "0" && handleMath === "0")// math = "... / 00"
      ) {    
      return;
    } else if(math === "0" && number.includes(handleMath) && usedPoint === false) {
      setMath(handleMath);
    } else if(math.at(-1) === "0" && symbol.includes(math.at(-2)) && number.includes(handleMath) && usedPoint === false) {
      setMath(math.slice(0,-1) + handleMath);
    } else {
      setMath(math+handleMath);
    }

    // calculate after the result
    
    if(result!== "" && symbol.includes(handleMath)) {
      setMath(eval(math) + handleMath);
      setResult("");  
    }

  }
  
  //reseting

  const clear = () => {
    setMath("");
    setResult("");
    setUsedPoint("");
  }

  //time config 

  useEffect(() =>
  {
    setInterval(() => setDate(new Date()), 60000);
  }, [])
  


  //memory 

  const showClearMemory = () => {
    if((memory!=="" && result!=="") || (memory!=="" && result ==="")){
      setResult(memory);
      setMath("");
    } 

    if(memory===result) {
      setMemory("");
    }
  }

  const minusMemory = () => {
    if(result!=="" && memory!=="") {
      setMemory(eval(memory+"-"+result));
      setResult("");
      setMath("");
    }
  }

  const plusMemory = () => {
    if(result!=="" && memory===""){
      setMemory(result);
      setResult("");
      setMath("");
    } else if(result!=="" && memory!=="") {
      setMemory(eval(memory+"+"+result));
      setResult("");
      setMath("");
    }
  }

  //to do: claculator code refactoring + new features (new app) + app start tab

  return (
    <div className="App">
      <Draggable
      defaultPosition={{x: -150, y: -200}}
      bounds="parent"
      handle='.top-bar'
      >
      <div className="calculator">
        <div className="top-bar">
          <div className="right">
            <div className="icon">
              <img src={require('./calculator-icon.png')} alt="calculator icon" width="24px"></img>
            </div>
            <div className="name">Calculator</div>
          </div>
          <div className="left">
            <div className="bar-btn minimize"><button></button></div>
            <div className="bar-btn fullscreen"><button></button></div>
            <div className="bar-btn close"><button></button></div>
          </div>
        </div>
        <div className="display">
          <div className="live">{math ? math.replace(/\s/g, '') : "0"}</div>
          <div className="result" title={memory}>{result ? result : "0"}<span>=</span></div>
        </div>
        <div className="keyboard">
          <div className="memory-keys">
            <button className="key op" onClick={clear}>C</button>
            <button className="key op" onClick={showClearMemory}>MRC</button>
            <button className="key op" onClick={minusMemory}>M-</button>
            <button className="key op" onClick={plusMemory}>M+</button>
          </div>
          <div className="block">
            <div className="numbers">
              <button className="key number row-1" onClick={someMath} value="9">9</button>
              <button className="key number row-1" onClick={someMath} value="8">8</button>
              <button className="key number row-1" onClick={someMath} value="7">7</button><br/>
              <button className="key number row-2" onClick={someMath} value="6">6</button>
              <button className="key number row-2" onClick={someMath} value="5">5</button>
              <button className="key number row-2" onClick={someMath} value="4">4</button><br/>
              <button className="key number row-3" onClick={someMath} value="3">3</button>
              <button className="key number row-3" onClick={someMath} value="2">2</button>
              <button className="key number row-3" onClick={someMath} value="1">1</button><br/>
              <button className="key number row-4" onClick={someMath} value="." disabled={usedPoint}>.</button>
              <button className="key number row-4" onClick={someMath} value="0">0</button>
              <button className="key number row-4" onClick={calculate}>=</button>
            </div>
            <div className="operators">
              <button className="key op divide" onClick={someMath} value="/">/</button>
              <button className="key op multiply" onClick={someMath} value="*">x</button>
              <button className="key op plus" onClick={someMath} value="+">+</button>
              <button className="key op minus" onClick={someMath} value="- ">-</button>
            </div>
          </div>
        </div>
      </div>
      </Draggable>
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
