import { Fetcher } from 'swr';
import { IMovie, IMovies } from '../interfaces';

export const fetcher: Fetcher<IMovies & IMovie[], string> = (...args) =>
  fetch(...args).then((res) => res.json());
