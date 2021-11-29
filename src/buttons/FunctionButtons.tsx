import React from 'react';
import {
  Typography,
  Grid,
  ListSubheader
} from '@mui/material';
import '../styling/Calculator.css';
import { conversionFunction, trigonometryFunction } from '../functions';
import { ExcelFunctionCategory, ExcelFunction } from '../commonTypes';
import { FunctionButton } from './FunctionButton';
import { noop } from '../util/util';

type SectionHeaderProps = {
  children: React.ReactNode,
}
function SectionHeader(props: SectionHeaderProps) {
  return (
    <ListSubheader className="section-header">
      <Typography component="p" variant="h5">
        {props.children}
      </Typography>
    </ListSubheader>
  );
}

type FunctionButtonsProps = {
  mobile: boolean,
  functionButtonOnClick: (excelFunction: ExcelFunction) => void,
  searchedFunctions: Array<ExcelFunction>
}

export function FunctionButtons(props: FunctionButtonsProps):JSX.Element {
  const { mobile, functionButtonOnClick, searchedFunctions } = props;

  React.useEffect(noop, [mobile, searchedFunctions]);

  const ExcelFunctionTypeArray = [
    ExcelFunctionCategory.BasicMath,
    ExcelFunctionCategory.Algebra,
    ExcelFunctionCategory.Text,
    ExcelFunctionCategory.Lookup,
    ExcelFunctionCategory.Statistics,
    ExcelFunctionCategory.Date,
    ExcelFunctionCategory.Bitwise,
    ExcelFunctionCategory.Web
  ];

  return (
    <Grid item container spacing={2} className="function-buttons-grid-container">
      {ExcelFunctionTypeArray.map((functionType: ExcelFunctionCategory, index1: number) => {
        const categorizedFunctions = searchedFunctions.filter((func: ExcelFunction) =>
          func.category === functionType
        );
        if (categorizedFunctions.length === 0) {
          return <></>;
        }
        return (
          <React.Fragment key={index1}>
            <SectionHeader>
              {functionType}
            </SectionHeader>
            {categorizedFunctions.filter((f: ExcelFunction) => f.category === functionType).map((obj: ExcelFunction, index2: number) => (
              <FunctionButton
                key={index2}
                label={obj.commonName}
                onClick={() => { functionButtonOnClick(obj); } } />
            ))}
          </React.Fragment>
        );
      })}
      <SectionHeader>
        Number Base Conversion
      </SectionHeader>
      <FunctionButton
        label='Conversion functions'
        onClick={() => { functionButtonOnClick(conversionFunction); }}
      />
      <SectionHeader>
        Trigonometry functions
      </SectionHeader>
      <FunctionButton
        label='Trigonometry functions'
        onClick={() => { functionButtonOnClick(trigonometryFunction); }}
      />
    </Grid>
  );
}
