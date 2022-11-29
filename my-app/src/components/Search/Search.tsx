import React from 'react';
import './Search.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getCoordByName } from '../../redux/weatherSlice';

import { Box, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { handleSubmit, reset, control } = useForm({
    defaultValues: { textValue: '' }
  });

  const onSubmit = (data: any) => {
    dispatch(getCoordByName(data.textValue));
    reset();
  };

  return (
    <header className="Search">
      <div className="Search__container">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            display: 'flex',
            width: '100%'
          }}
          noValidate
          autoComplete="off"
        >
          <Controller
            name={"textValue"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField 
                onChange={onChange}
                value={value}
                id="outlined-search" 
                label="Enter city"
                type="search" 
                size="small"
              /> 
            )}
          />
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Search
          </Button>
        </Box>
      </div>
    </header>
  );
};


