import { MovieResult } from 'moviedb-promise/dist/request-types';

export type IMovie = Pick<
  MovieResult,
  'id' | 'poster_path' | 'release_date' | 'original_title'
>;
