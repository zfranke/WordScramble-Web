import React, { useState } from 'react';
import nlp from 'compromise';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField, Grid, Typography, Chip } from '@mui/material';

function App() {
  const [input, setInput] = useState('');
  const [combinations, setCombinations] = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function makeLowercase() {
    setInput(input.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    makeLowercase();
    setCombinations(getCombinations(input));
    
  }

  //Function to remove a specific word from the list of combinations.
  function removeElement(array, element) {
    console.log(element);
    const index = array.indexOf(element);
    console.log(index);
    if (index > -1) {
      array.splice(index, 1);
      console.log(array);
    }
    setCombinations(array);
    console.log(combinations);
    //Refresh the page to update the list of combinations
    
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
      <br></br>
      <Typography color="textPrimary" variant="h3" component="h3" gutterBottom>
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
        <br></br>
        <Typography color="textPrimary" variant="h4" component="h4" gutterBottom>
          Combinations
        </Typography>
        <Grid item xs={12} sm={6}>
        <List>
          {combinations.map((combination) => (
            <ListItem>
              <Chip label={combination} onClick={() => removeElement(combinations, combination)} />
            </ListItem>
          ))}

        </List>
        </Grid>
      </Grid>
    </Grid>
    </>


  );
}

export default App;

