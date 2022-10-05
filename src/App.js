import {useState} from 'react';
import React from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState("");
  const [math, setMath] = useState("");
  const [usedPoint, setUsedPoint] = useState(false);

  const symbol = ["/", "*", "+", "-"];
  const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const point = ".";
  
  //Show result

  const calculate = () => {
    if(math === "0" || math==="") {
      return 0;
    } else {
      setResult(eval(math).toString());
    }
  }

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
      (symbol.includes(handleMath) && symbol.includes(math.at(-1))) || // math = "... // ..."
      (point.includes(handleMath) && point.includes(math.at(-1))) || // math = "'.' ..."
      (symbol.includes(handleMath) && point.includes(math.at(-1))) || // math = "/. ..."
      (point.includes(handleMath) && symbol.includes(math.at(-1))) || //math = "./ ..."
      (symbol.includes(math.at(-2)) && math.at(-1) === "0" && handleMath === "0") // math = "... / 00"
      ) {    
      return;
    } else if(math === "0" && number.includes(handleMath) && usedPoint === false) {
      setMath(handleMath);
    } else if(math.at(-1) === "0" && symbol.includes(math.at(-2)) && number.includes(handleMath) && usedPoint === false) {
      setMath(math.slice(0,-1) + handleMath);
    } else {
      setMath(math+handleMath);
    }

    // calculate on the result

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

  //to do memory logic + set to negative

  return (
    <div className="App">
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
          <div className="live">{math ? math : "0"}</div>
          <div className="result">{result ? result : "0"}<span>=</span></div>
        </div>
        <div className="keyboard">
          <div className="memory-keys">
            <button className="key op" onClick={clear}>C</button>
            <button className="key op">MRC</button>
            <button className="key op">M-</button>
            <button className="key op">M+</button>
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
              <button className="key number row-4" >+/-</button><br/>  
            </div>
            <div className="operators">
              <button className="key op divide" onClick={someMath} value="/">/</button>
              <button className="key op multiply" onClick={someMath} value="*">x</button>
              <button className="key op plus" onClick={someMath} value="+">+</button>
              <button className="key op minus" onClick={someMath } value="-">-</button>
            </div>
        </div>
        <div className="calc">
          <button className="row-5" onClick={calculate} key="done" >=</button>
        </div>
      </div>
    </div>
    <div className='start bar'>
      <div className='Start-btn'></div>
      <div className='calculator app'></div>
      <div className='time'></div>
    </div>
  </div>
  );
}

export default App;
