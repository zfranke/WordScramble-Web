import React, { useState } from 'react';
import natural from 'natural';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField } from '@mui/material';



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
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="Enter a string"
          value={input}
          onChange={handleChange}
        />
        <FormHelperText>Enter a string to generate and sort combinations</FormHelperText>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
      {combinations.length > 0 && (
        <List>
          {combinations.map((combination, index) => (
            <ListItem key={index}>{combination}</ListItem>
          ))}
        </List>
      )}
    </form>
  );
}

export default App;

