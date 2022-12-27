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
    const newCombinations = getCombinations(input);
    newCombinations.sort((a, b) => {
      const aLikelihood = nlp.text(a).values().length;
      const bLikelihood = nlp.text(b).values().length;
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

