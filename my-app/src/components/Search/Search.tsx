import React from 'react';
import './Search.scss';

import { Box, TextField, InputAdornment, FormLabel, FormControl, FormControlProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const SearchInput = styled(FormControl)<FormControlProps>(({ theme }) => ({
  width: '100%',
  '& .MuiFormLabel-root': {
    color: '#363636',
    fontFamily: 'Montserrat, sans-serif !important',
    fontWeight: 600,
    marginBottom: '10px'
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    color: '#575757',
    fontFamily: 'Montserrat, sans-serif !important',
    height: '50px'
  }
}));

interface IProps {
  onChange: (value: string) => void
}

export const Search: React.FC<IProps> = ({ onChange }) => {

  let filterTimeout: any
  const filterNews = (query: string) => {
    clearTimeout(filterTimeout)
    if (!query) return onChange('')

    filterTimeout = setTimeout(() => {
      onChange(query)
    }, 500)
  }

  return (
    // <div className="Search">
      <Box
        component="form"
        sx={{
          width: 600,
          marginBottom: '40px'
        }}
        autoComplete="off"
        noValidate
      >
        <SearchInput variant="standard">
          <FormLabel component="legend">Filter by keywords</FormLabel>
          <TextField
            fullWidth 
            onChange={(event) => filterNews(event.target.value)}
            id="outlined-search" 
            type="search" 
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          /> 
        </SearchInput>
      </Box>
    // </div>
  );
};


