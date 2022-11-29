import React, { useEffect } from 'react';
import './CityPage.scss';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getWeatherInfo } from '../../redux/weatherSlice';
import moment from 'moment';
import { convertTemp, useAppSelector } from '../../hooks';

export const CityPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCity } = useAppSelector(state => state.persistedReducer.weather);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    dispatch(getWeatherInfo({lat: +params.lat, lon: +params.lon}));
  }, []);
  
  return (
    <div className="CityPage">
      {selectedCity && (
        <Card sx={{ minWidth: 275, position: 'relative' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {moment(selectedCity.date).format('MMM Do, h:mm a')}
            </Typography>
            <Typography variant="h5" component="div">
              {`${selectedCity.name}, ${selectedCity.sys.country}`}
            </Typography>
            <Typography variant="h2" component="div" color="text.secondary">
              {`${convertTemp(selectedCity.main.temp)}°C`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {`Feels like ${convertTemp(selectedCity.main.temp)}°C, ${selectedCity.weather[0].description}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              size="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(getWeatherInfo({
                  lat: selectedCity.coord.lat,
                  lon: selectedCity.coord.lon
                }));
                }}
            >
              Udate
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};