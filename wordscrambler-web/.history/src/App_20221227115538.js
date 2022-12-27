import React, { useState } from 'react';
import nlp from 'compromise';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField } from '@mui/material';

function App() {
  const [input, setInput] = useState('');
  const [combinations, setCombinations] to=python = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newCombinations = getCombinations(input);
    newCombinations.sort((a, b) => {
      const aLikelihood = nlp.term(a).is_known() ? 1 : 0;
      const bLikelihood = nlp.term(b).is_known() ? 1 : 0;
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

