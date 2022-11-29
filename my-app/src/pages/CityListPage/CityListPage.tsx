import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './CityListPage.scss';
import { AppDispatch } from '../../redux/store';
import { deleteCityCard, getWeatherInfo } from '../../redux/weatherSlice';
import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { convertTemp, useAppSelector } from '../../hooks';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export const CityListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities } = useAppSelector(state => state.persistedReducer.weather);


  useEffect(() => {
    cities.map(city => dispatch(getWeatherInfo({
      lat: city.coord.lat,
      lon: city.coord.lon
    })));
  }, [window.performance.navigation.type == 1]);

  return (
    <div className="CityListPage">
      <Box sx={{ flexGrow: 1, textDecoration: 'none' }}>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {cities.map((city: CityWeather, index: number) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <NavLink
                className="Sidebar__item"
                to={`/city-page?lat=${city.coord.lat}&lon=${city.coord.lon}`}
              >
                <Card sx={{ minWidth: 275, position: 'relative' }}>
                  <ClearIcon style={{ 
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'end',
                    right: '14px',
                    top: '14px',
                    cursor: 'pointer'
                  }}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteCityCard(city));
                    }}
                  />
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {moment(city.date).format('MMM Do, h:mm a')}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {`${city.name}, ${city.sys.country}`}
                    </Typography>
                    <Typography variant="h2" component="div" color="text.secondary">
                      {`${convertTemp(city.main.temp)}°C`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {`Feels like ${convertTemp(city.main.temp)}°C, ${city.weather[0].description}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(getWeatherInfo({
                          lat: city.coord.lat,
                          lon: city.coord.lon
                        }));
                       }}
                    >
                      Udate
                    </Button>
                  </CardActions>
                </Card>
              </NavLink>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};


// const ItemRenderer = ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
//   const styles = {
//     ...style,
//     left: columnIndex === 0
//       ? style.left : Number(style.left) + columnIndex * 30,
//     top: rowIndex === 0
//       ? style.top : Number(style.top) + rowIndex * 70,
//     margin: '5%',
//   };

//   return (
//     <div style={styles}>
//       <ProductCard
//         product={data[rowIndex + (columnIndex * 4)]}
//         type={'productsListPage'}
//       />
//     </div>
//   )
// };


