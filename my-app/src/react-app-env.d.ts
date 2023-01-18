/// <reference types="react-scripts" />

type CitiesByName = {
  state: string,
  country: string,
  name: string,
  lat: number,
  lon: number,
  local_names: {}
}

type CityWeather = {
  date: Date,
  id: number,
  dt: number,
  name: string,
  base: string,
  cod: number,
  timezone: number,
  visibility: number,
  coord: Coord,
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
  },
  sys: {
    country: string,
    id: number,
    sunrise: number,
    sunset: number,
    type: number,
  },
  news: news[],
  wind: {
    deg: number,
    gust: number,
    speed: number
  }
};

type news = {
  id: number,
  main: string,
  description: string,
  icon: string
};

type Coord = {
  lat: number,
  lon: number
};
