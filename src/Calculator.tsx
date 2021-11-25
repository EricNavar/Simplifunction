import React from 'react';
import {
  Typography,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FunctionButtonsWrapper } from './buttons/FunctionButtonsWrapper';
import { createFormula } from './util/createFormula';
import { MyDialog } from './MyDialog';
import { BasicButtons } from './buttons/BasicButtons';
import { ExcelFunction, FormProps, ParameterFormat } from './commonTypes';
import { ListParameterForm } from './forms/ListParameterForm';
import { SingleParameterForm } from './forms/SingleParameterForm';
import { NParameterForm } from './forms/NParameterForm';
import { ConversionForm } from './forms/ConversionForm';
import { TrigonometryForm } from './forms/TrigonometryForm';
import { UserInput } from './UserInput';
import './styling/Calculator.css';

export const Calculator = function Calculator() {
  const [formula, setFormula] = React.useState('');
  const [formulaRevealed, setFormulaRevealed] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [form, setForm] = React.useState(<Grid></Grid>);
  const [inputRef, setInputRef] = React.useState<HTMLInputElement | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => { }, []);

  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));

  function addToUserInput(strToAdd: string, focus: boolean): void {
    if (inputRef == null) {
      console.log("INPUTREF IS NULL");
      return;
    }
    const selectionStart = inputRef.selectionStart ? inputRef.selectionStart : inputRef.size;
    const selectionEnd = inputRef.selectionEnd ? inputRef.selectionEnd : inputRef.size;
    const newUserInput = userInput.substring(0, selectionStart!) + strToAdd + userInput.substring(selectionEnd!);
    setUserInput(newUserInput);
    if (focus) {
      inputRef.focus();
    }
  };

  function clearInput(): void {
    setUserInput("");
    setFormula("");
  };

  function onEqualsClick(): void {
    setFormula(createFormula(userInput));
    setFormulaRevealed(true);
  };

  function backspace(): void {
    setUserInput(userInput.substring(0, userInput.length - 2));
  }

  const functionButtonOnClick = (excelFunction: ExcelFunction) => {
    let FormComponent: React.NamedExoticComponent<FormProps> = ConversionForm;
    if (excelFunction.parameterFormat === ParameterFormat.LIST) {
      FormComponent = ListParameterForm;
    }
    else if (excelFunction.parameterFormat === ParameterFormat.SINGLE) {
      FormComponent = SingleParameterForm;
    }
    else if (excelFunction.parameterFormat === ParameterFormat.N) {
      FormComponent = NParameterForm;
    }
    else if (excelFunction.parameterFormat === ParameterFormat.TRIGONOMETRY) {
      FormComponent = TrigonometryForm;
    }
    setForm(
      <FormComponent
        addToUserInput={addToUserInput}
        setDialogOpen={setDialogOpen}
        excelFunction={excelFunction}
      />
    );
    setDialogOpen(true);
  }

  return (
    <>
      <div className="App" >
        <header>
          <Typography component='h1' variant='h4' style={{ marginBottom: 20 }} >
            SimpliFunction
          </Typography>
        </header>
        <Grid container component='main' spacing={2} className={mobile ? "" : "input-containers"}>
          <UserInput setUserInput={setUserInput} setInputRef={setInputRef} userInput={userInput} />
          <div style={{height:60,width:'100%'}}>
          {formulaRevealed &&
            <div className="formula-container">
              <Typography component="span" variant='body1'>Result:</Typography>
              <span className="formula">{formula}</span>
            </div>
          }
          </div>
          <FunctionButtonsWrapper
            mobile={mobile}
            functionButtonOnClick={functionButtonOnClick}
          />
          <BasicButtons
            addToUserInput={addToUserInput}
            backspace={backspace}
            onEqualsClick={onEqualsClick}
            clearInput={clearInput}
            mobile={mobile}
          />
        </Grid>
      </div>
      <MyDialog open={dialogOpen} setDialogOpen={setDialogOpen} form={form} />
    </>
  );
};
