import React, { useState } from 'react';
import nlp from 'compromise';
import { Button, FormControl, FormHelperText, Input, List, ListItem, TextField, Grid, Typography, Chip, Card, CardItem, CardContent} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function App() {
  const [input, setInput] = useState('');
  const [combinations, setCombinations] = useState([]);
  const [color, setColor] = useState('');
  const [inputValid, setInputValid] = useState(false);
  const [inputNumber, setInputNumber] = useState(10);

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
    setInputValid(true);
    
  }

  

  const handleInputNumberChange = (event) => {
    setInputNumber(event.target.value);
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

  //Function to alert the value of the selected chip
  const handleClick = (event) => {
    console.log(event.target.value);
  }


  const resetInput = () => {
    setInput('');
    setInputValid(false);
  }

  const regenerateChips = () => {
    setCombinations(getCombinations(input));
  }

  //Function to reset the 

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
      <br></br>
      <Button variant="contained" onClick={resetInput}><RestartAltIcon />Reset</Button>
      <br></br>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <br></br>
        <Typography color="textPrimary" variant="h4" component="h4" gutterBottom>
          Combinations
        </Typography>
        <Grid container justifyContent="center" alignItems="center" direction="column">
        
          {inputValid &&
          <Grid container justifyContent="center" alignItems="center" direction="column">
            
              
              <FormControl>
                <TextField
                  id="inputNumber"
                  label="Number of Cards"
                  value={inputNumber}
                  onChange={handleInputNumberChange}
                  helperText="Enter the number of chips to display"
                />               
              </FormControl>
              <br></br>

              
              <Typography color="textPrimary" variant="h5" component="h5" gutterBottom>
                Possible Combinations: {combinations.length} 
              </Typography>

              <br></br>

              <Button variant="contained" onClick={regenerateChips}><RestartAltIcon />Regenerate</Button>

              <br></br>
              
              <Grid container justifyContent="center" alignItems="center" direction="column">
                {combinations.slice(0, inputNumber).map((combination) => (
                  <>                 
                  <div>
                    <Card 
                      sx={{ minWidth: 275, maxWidth: 275, bgcolor: color, m: 1, p: 1, borderRadius: 1, border: 1, borderColor: 'text.primary' }}
                      variant="outlined"
                      
                    >
                      <CardContent>
                        <Typography color="textPrimary" variant="h5" component="h2" gutterBottom align="center">
                          <div>
                          {combinations[Math.floor(Math.random() * combinations.length)]} 
                          </div>

                        </Typography>
                      </CardContent>
                    </Card>

                  </div>
                  <br></br>
                  </>
                ))}
              </Grid>

              <br></br>
              <br></br>
              
              
            
            </Grid>
      }
            

            
          


        </Grid>
      </Grid>
    </Grid>
    </>


  );
}

export default App;

