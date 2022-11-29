import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { clearSearchResult, deleteCityFromSearchResult, getWeatherInfo } from '../../redux/weatherSlice';

import { List, ListItem, ListItemText, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const SearchResultList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResult } = useAppSelector((state) => state.persistedReducer.weather);

  return (
    <List className="SearchResultList">
      {searchResult.map((city) => (
        <ListItem
          key={city.lat}
          disableGutters
          secondaryAction={
            <IconButton 
              aria-label="comment" 
              onClick={() => {
                dispatch(getWeatherInfo(city));
                dispatch(deleteCityFromSearchResult(city));
              }}
            >
              <AddCircleIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`${city.name}, ${city.country}`} />
        </ListItem>
      ))}
      {searchResult.length !== 0 && (
        <Button
          variant="contained"
          onClick={() => dispatch(clearSearchResult())}
        >
          Clear Result
        </Button>
      )}
    </List>
  );
}