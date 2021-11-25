import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { FunctionButtons } from './FunctionButtons';
import { FunctionButtonsAccordion } from './FunctionButtonsAccordion';
import { ExcelFunction } from '../commonTypes';
import { SearchIcon } from '../assets/SearchIcon';
import { functions } from '../functions';

type FunctionButtonsWrapperProps = {
  mobile: boolean,
  functionButtonOnClick: (excelFunction: ExcelFunction) => void
}

const FunctionButtonsWrapper = React.memo(function FunctionButtonsWrapper(props: FunctionButtonsWrapperProps) {
  const { mobile, functionButtonOnClick } = props;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { }, [mobile]);

  const [searchInput, setSearchInput] = React.useState('');
  const [searchedFunctions, setSearchedFunctions] = React.useState(functions);

  function onChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      setSearchedFunctions(functions);
    }
    setSearchedFunctions(functions.filter((f: ExcelFunction) => f.commonName.toLowerCase().includes(e.target.value)));
  };

  const content = (
    <Grid item container xs={12} md={8} spacing={mobile ? 0 : 2} component='section'>
      {!mobile &&
        <Typography component="h2" variant='h4' style={{lineHeight:'3.5rem', height:'max-content'}}>
          Excel Functions
        </Typography>
      }
      <div style={{ display: 'flex', marginBottom: 20, marginLeft: 8, height: "max-content" }}>
        <div className='function-textfield'>
          <TextField
            id="function-search"
            placeholder="Search function"
            value={searchInput}
            onChange={onChangeSearchInput}
            variant="outlined"
            size='small'
            style={{width:open?"100%":"46px", transition: "width .2s ease-in-out .2s"}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={()=>{setOpen(!open)}}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: 23,
                paddingLeft: 0,
                height:46
              }
            }}
          />
        </div>
      </div>
      <FunctionButtons
        mobile={mobile}
        functionButtonOnClick={functionButtonOnClick}
        searchedFunctions={searchedFunctions}
      />
    </Grid>
  );

  if (mobile) {
    return (
      <FunctionButtonsAccordion>
        {content}
      </FunctionButtonsAccordion>
    )
  }
  else {
    return content;
  }
});

export { FunctionButtonsWrapper };