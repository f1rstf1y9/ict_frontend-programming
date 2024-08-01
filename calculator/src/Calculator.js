import { useState } from "react";

export default function Calculator() {
  const [result, setResult] = useState("0");

  const handleClick = (e) => {
    const input = e.target.textContent;
    if (input === "C") {
      setResult("0");
    } else if (input === "=") {
      if (!["+", "-", "*", "/"].includes(result.charAt(result.length - 1))) {
        const calcResult = String(eval(result));
        if (calcResult === "Infinity" || calcResult === "-Infinity") {
          setResult("0으로 나눌 수 없습니다.");
        } else {
          setResult(calcResult);
        }
      }
    } else {
      if (result === "0" || result === "0으로 나눌 수 없습니다.") {
        setResult(input);
      } else if (
        ["+", "-", "*", "/"].includes(result.charAt(result.length - 2)) &&
        result.charAt(result.length - 1) === "0" &&
        !["+", "-", "*", "/"].includes(input)
      ) {
        setResult(result.slice(0, result.length - 1) + input);
      } else {
        setResult(result + input);
      }
    }
  };

  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">
          <input name="" id=""></input>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={handleClick}>1</button>
          <button onClick={handleClick}>2</button>
          <button onClick={handleClick}>3</button>
          <button onClick={handleClick}>+</button>
          <button onClick={handleClick}>4</button>
          <button onClick={handleClick}>5</button>
          <button onClick={handleClick}>6</button>
          <button onClick={handleClick}>-</button>
          <button onClick={handleClick}>7</button>
          <button onClick={handleClick}>8</button>
          <button onClick={handleClick}>9</button>
          <button onClick={handleClick}>*</button>
          <button onClick={handleClick}>C</button>
          <button onClick={handleClick}>0</button>
          <button onClick={handleClick}>=</button>
          <button onClick={handleClick}>/</button>
        </div>
      </div>
    </>
  );
}
