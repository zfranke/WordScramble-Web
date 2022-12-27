import React, { useState } from 'react';
import nlp from 'compromise';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField, Grid, Typography } from '@mui/material';

function App() {
  const [input, setInput] = useState('');
  const [combinations, setCombinations] = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const combinations = getCombinations(input);
    const sortedCombinations = combinations.sort((a, b) => {
      const aScore = nlp(a).sentences().toNegative().sentences().out('text');
      const bScore = nlp(b).sentences().toNegative().sentences().out('text');
      return aScore.length - bScore.length;
    });
    setCombinations(sortedCombinations);
  }

  function getCombinations(str) {
    const results = [];
    if (str.length === 1) {
      results.push(str);
      return results;
    }
    for (let i = 0; i < str.length; i++) {
      const firstChar = str[i];
      const charsLeft = str.substring(0, i) + str.substring(i + 1);
      const innerPermutations = getCombinations(charsLeft);
      for (let j = 0; j < innerPermutations.length; j++) {
        results.push(firstChar + innerPermutations[j]);
      }
    }
    return results;
  }

  return (
    //Create a centered input form with a output grid
    <>
    <Typography variant="h1">Word Scrambler</Typography>

    <Grid container justifyContent="center" alignItems="center" direction="column">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            id="input"
            label="Input"
            value={input}
            onChange={handleChange}
            helperText="Enter a string to generate all possible combinations"
          />
          <Button type="submit" variant="contained">Submit</Button>
        </FormControl>
      </form>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <List>
          {combinations.map((combination, index) => (
            <ListItem key={index}>{combination}</ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
    </>


  );
}

export default App;

