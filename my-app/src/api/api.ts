import axios from 'axios';

const KeyAPI = '6b21cc570e621db9ca7efc6f7a9d5d1e';

const API = "http://api.openweathermap.org";
const Geo_API = `${API}/geo/1.0/direct?`;
const Weather_API = `${API}/data/2.5/weather?`;

export async function getCoordByNameAPI(city: string) {
  return await axios.get(`${Geo_API}q=${city}&limit=5&appid=${KeyAPI}`);
};

export async function getWeatherInfoAPI(city: Coord) {
    return await axios.get(`${Weather_API}lat=${city.lat}&lon=${city.lon}&appid=${KeyAPI}`);
  };

export async function fetchProducts() {
  return await axios.get('https://testbackend.nc-one.com/image');
};