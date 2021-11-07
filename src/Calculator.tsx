import React from 'react';
import { Typography, Grid, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FunctionButtons } from './FunctionButtons/FunctionButtons';
import { createFormula } from './createFormula';
import { MyDialog } from './MyDialog';
import './Calculator.css';

function Calculator() {
  const [formula, setFormula] = React.useState('');
  const [userInput, setUserInput] = React.useState('');
  let element:JSX.Element = <Grid></Grid>;
  const [form, setForm] = React.useState(element);
  const [inputRef, setInputRef] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));

  const addToUserInput = async (strToAdd:string, inputRef:HTMLInputElement) => {
    const selectionStart = inputRef.selectionStart ? inputRef.selectionStart : inputRef.size;
    const selectionEnd = inputRef.selectionEnd ? inputRef.selectionEnd : inputRef.size;
    const newUserInput = userInput.substring(0, selectionStart!) + strToAdd + userInput.substring(selectionEnd!);
    inputRef.focus();

    setUserInput(newUserInput);
  };

  const clearInput = () => {
    setUserInput("");
  };

  const onEqualsClick = () => {
    setFormula(createFormula(userInput));
  };

  const onType = (event:any) => {
    setUserInput(event.target.value);
  };

  type InputButtonProps = {
    input: string
  }

  function InputButton(props:InputButtonProps) {
    return (
      <Button
        className="button small-button"
        variant="outlined"
        onClick={e => addToUserInput(props.input, inputRef!)}
        aria-label="open parentheses"
        disableRipple
      >
        {props.input}
      </Button>
    );
  }

  function backspace() {
    setUserInput(userInput.substring(0, userInput.length - 2));
  }

  function BackspaceButton() {
    return (
      <Button
        className="button small-button"
        variant="outlined"
        onClick={e => backspace()}
        aria-label="backspace"
        disableRipple
      >
        ⌫
      </Button>
    );
  }

  return (
    <div className="App" >
      <h1>SimpliFunction</h1>
      <Grid container className={mobile ? "" : "input-containers"}>
        <TextField
          autoFocus
          fullWidth
          type="text"
          onChange={onType}
          inputRef={ref => { setInputRef(ref); }}
          value={userInput}
          className="user-input-text-field"
          placeholder="Enter your calculation"
          label="input"
          variant='filled'
        />
        <FunctionButtons
          setDialogOpen={setDialogOpen}
          setForm={setForm}
          addToUserInput={addToUserInput}
          mobile={mobile}
          inputRef={inputRef!}
        />
        <Grid item container xs={12} sm={6} md={8} className="small-button-container">
          <Grid item xs={12}>
            <InputButton input="( " />
            <InputButton input=" )" />
          </Grid>
          {mobile &&
            <Grid item xs={9}>
              {[0,3,2,1,6,5,4,9,8,7].reverse().map((num) => // number buttons
                <InputButton input={num.toString()} key={num} />
              )}
              <InputButton input='.' />
              <BackspaceButton />
            </Grid>
          }
          <Grid item xs={3} sm={12}>
            <InputButton input=" + " />
            <InputButton input=" - " />
            <InputButton input=" × " />
            <InputButton input=" ÷ " />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="button utility-button clear-button"
              variant="outlined"
              onClick={clearInput}
              aria-label="clear input"
              disableRipple
            >
              clear
            </Button>
            <Button
              className="button utility-button equals-button"
              variant="outlined"
              onClick={onEqualsClick}
              aria-label="equals"
              disableRipple
            >
              equals
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {formula && <Typography>Here is your formula:</Typography>}
      <p className="formula">{formula}</p>
      <MyDialog open={dialogOpen} onClose={(e:any) => setDialogOpen(false)} form={form} />
    </div>
  );
};

export { Calculator };