import axios from 'axios';

const API = 'https://api.spaceflightnewsapi.net';
const Articles_API = `${API}/v3/articles`;

export interface INewsList {
  id: number,
  title: string,
  url: string,
  imageUrl: string,
  newsSite: string,
  summary: string,
  publishedAt: string,
  updatedAt: string,
  featured: boolean,
  launches: ILaunches[],
  events?: []
};

export interface ILaunches {
  id: string,
  provider: string
}

export async function getNewsListAPI(input: string[]) {
  let params = new URLSearchParams();
  params.append('_limit', '30');

    for (let value of input) {
      const searchParam = `title_contains[${input.indexOf(value)}]`
      params.append(searchParam, `${value}`);
    }

  return await axios.get<INewsList>(Articles_API, { params });
};

export async function getNewsByIdAPI(id: number) {
  return await axios.get<INewsList>(`${Articles_API}/${id}`);
};