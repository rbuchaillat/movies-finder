import { Genre } from 'moviedb-promise/dist/types';
import Head from 'next/head';
import { createContext } from 'react';
import { Home as HomeScene } from '../src/scenes/Home';
import { MovieDatabase } from '../src/utils/movieDb';

const genres: Genre[] = [];

export const GenresContext = createContext(genres);

export default function Home({ genres }: { genres: Genre[] }) {
  return (
    <>
      <Head>
        <title>Movie Finder</title>
        <meta name="description" content="Movie Finder application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GenresContext.Provider value={genres}>
        <HomeScene />
      </GenresContext.Provider>
    </>
  );
}

export async function getStaticProps() {
  const genres = await MovieDatabase.getDb().genreMovieList();

  return {
    props: {
      genres: genres.genres,
    },
  };
}
