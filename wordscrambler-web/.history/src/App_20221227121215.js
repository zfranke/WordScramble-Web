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
    setCombinations(getCombinations(input));
  }

  function getCombinations(str) {
    const combinations = [];
    const words = nlp(str).terms().out('array');
    words.forEach((word) => {
      const letters = word.split('');
      const permutations = getPermutations(letters);
      permutations.forEach((permutation) => {
        combinations.push(permutation);
      });
    });
    return combinations;
  }

  function getPermutations(letters) {
    const permutations = [];
    if (letters.length === 1) {
      permutations.push(letters[0]);
      return permutations;
    }
    for (let i = 0; i < letters.length; i++) {
      const firstLetter = letters[i];
      const remainingLetters = letters.slice(0, i).concat(letters.slice(i + 1));
      const remainingPermutations = getPermutations(remainingLetters);
      for (let j = 0; j < remainingPermutations.length; j++) {
        permutations.push(firstLetter + remainingPermutations[j]);
      }
    }
    return permutations;
  }
  

  return (
    //Create a centered input form with a output grid
    <>
    

    <Grid container justifyContent="center" alignItems="center" direction="column">
      
      <Typography color="textPrimary" variant="h2" component="h2" gutterBottom>
        Word Scrambler
      </Typography>
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
        <Typography color="textPrimary" variant="h4" component="h4" gutterBottom>
          Combinations
        </Typography>
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

