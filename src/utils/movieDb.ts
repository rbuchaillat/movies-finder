import { MovieDb } from 'moviedb-promise';

export class MovieDatabase {
  static db: MovieDb;

  static getDb(): MovieDb {
    return this.db
      ? this.db
      : new MovieDb(process.env.MOVIE_DB_API_KEY || 'API_KEY');
  }
}
