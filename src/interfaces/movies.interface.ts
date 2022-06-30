import { DiscoverMovieResponse } from 'moviedb-promise/dist/request-types';

export type IMovies = Pick<
  DiscoverMovieResponse,
  'page' | 'results' | 'total_pages' | 'total_results'
>;
