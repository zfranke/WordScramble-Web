import React, { useState } from 'react';
import natural from 'natural';

function App() {
  const [input, setInput] = useState('');
  const [combinations, setCombinations] = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newCombinations = getCombinations(input);
    newCombinations.sort((a, b) => {
      const aLikelihood = natural.PorterStemmer.stem(a).length;
      const bLikelihood = natural.PorterStemmer.stem(b).length;
      return bLikelihood - aLikelihood;
    });
    setCombinations(newCombinations);
  }

  function getCombinations(str) {
    const combinations = [];

    function helper(combination, index) {
      combinations.push(combination);
      for (let i = index; i < str.length; i++) {
        helper(combination + str[i], i + 1);
      }
    }

    helper('', 0);

    return combinations;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a string:
          <input type="text" value={input} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {combinations.length > 0 && (
        <ul>
          {combinations.map((combination, index) => (
            <li key={index}>{combination}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

