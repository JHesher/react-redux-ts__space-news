import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
import { getCoordByNameAPI, getWeatherInfoAPI } from '../api/api';

import { toast } from 'react-toastify';

export interface WeatherState {
  searchResult: CitiesByName[],
  cities: CityWeather[],
  selectedCity: CityWeather | null
};

const initialState: WeatherState = {
  searchResult: [],
  cities: [],
  selectedCity: null
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setsearchResult(state, action: PayloadAction<CitiesByName[]>) {
      state.searchResult = action.payload;
    },
    clearSearchResult(state) {
      state.searchResult = [];
    },
    addNewCity(state, action: PayloadAction<CityWeather>) {
      const newCity = {...action.payload, date: new Date()};
      if (state.cities.find(city => city.coord.lat === newCity.coord.lat 
        && city.coord.lon === newCity.coord.lon )) {
          state.cities = state.cities.map(city => {
            if (city.coord.lat === newCity.coord.lat 
              && city.coord.lon === newCity.coord.lon) {
                return newCity;
              } else {
                return city;
              }
            })
        } else {
          toast.success(`Greate! You add ${newCity.name} to your list!`);
          state.cities = [ ...state.cities, newCity ];
        }

        if (window.location.href.includes('/city-page')) {
          state.selectedCity = newCity;
        }

      state.searchResult = state.searchResult.filter(city => city.lat !== newCity.coord.lat);
    },
    setSelectedCity(state, action) {
      const newCity = {...action.payload, date: new Date()};
      state.selectedCity = newCity;
    },
    deleteCityCard(state, action: PayloadAction<CityWeather>) {
      state.cities = state.cities.filter(city => city.id !== action.payload.id);
    },
    deleteCityFromSearchResult(state, action) {
      state.searchResult = state.searchResult.filter(city => city.lat !== action.payload.lat);
    },
    updateCityWeather(state, action) {
      const newCity = {...action.payload, date: new Date()};
      state.cities = state.cities.map(city => {
        if (city.coord.lat === newCity.coord.lat 
          && city.coord.lon === newCity.coord.lon) {
            toast.success(`Greate! You add ${newCity.name} to your list!`)
            return newCity;
          } else {
            return city;
          }
      })
    }
  },
});

export const getCoordByName = createAsyncThunk(
  'weather/getCoordByName',
  async function (city: string, { rejectWithValue, dispatch }) {
    try {
      const response = await getCoordByNameAPI(city);
      dispatch(setsearchResult(response.data));

      if (response.data.statusCode !== 200) {
        throw new Error('Server error');
      }

    return response.data.response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWeatherInfo = createAsyncThunk(
    'weather/getWeatherInfo',
    async function (city: Coord, { rejectWithValue, dispatch }) {
      try {
        const response = await getWeatherInfoAPI(city);
        dispatch(addNewCity(response.data));

        // if (window.location.href.includes('/city-page')) {
        //   dispatch(setSelectedCity(response.data));
        // }
  
        if (response.data.statusCode !== 200) {
          throw new Error('Server error');
        }
  
      return response.data.response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


export const { 
    setsearchResult,
    clearSearchResult,
    addNewCity,
    deleteCityCard,
    deleteCityFromSearchResult
} = weatherSlice.actions;

export default weatherSlice.reducer;