import React, { useState } from 'react';
import nlp from 'compromise';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField, Grid, Typography } from '@mui/material';

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
    //setCombinations(sortCombinations(combinations));
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

  //Function to sort the combinations for words that are considered proper english words
  function sortCombinations(combinations) {
    const sortedCombinations = [];
    combinations.forEach((combination) => {
      if (nlp(combination).isA('Noun')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Verb')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Adjective')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Adverb')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Determiner')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Pronoun')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Preposition')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Conjunction')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Interjection')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Phrase')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Value')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Date')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Place')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Organization')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Person')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Money')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Percent')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Ordinal')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Cardinal')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Duration')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Email')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Url')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Hashtag')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Emoji')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Acronym')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Abbreviation')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Phone')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Address')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Zipcode')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Ip')) {
        sortedCombinations.push(combination);
      }
      else if (nlp(combination).isA('Domain')) {
        sortedCombinations.push(combination);
      }
    });
    return sortedCombinations;
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

