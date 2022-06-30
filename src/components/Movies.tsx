import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Movie } from './Movie';
import { IMovie, IMovies } from '../interfaces';
import { SortBy } from './Configuration/SortBy';
import { FilterBy } from './Configuration/FilterBy';
import { fetcher } from '../utils/fetcher';

export const Movies = () => {
  const { data, error } = useSWR(
    '/api/movies?page=1&sort_by=popularity.desc&with_genres=',
    fetcher
  );
  const [items, setItems] = useState<IMovie[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState({
    page: 1,
    sort_by: 'popularity.desc',
    with_genres: '',
    loadInfinite: false,
  });

  useEffect(() => {
    setItems(data?.results ?? []);
  }, [data]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(
          `/api/movies?page=${query.page}&sort_by=${query.sort_by}&with_genres=${query.with_genres}`
        );
        const jsonRes: IMovies = await response.json();
        const arrayItems = jsonRes.results ?? [];

        setItems(query.loadInfinite ? [...items, ...arrayItems] : arrayItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!!error) return <div>Erreur du chargement des films tendances ...</div>;

  const fetchData = () => {
    if (items === undefined || items.length >= (data?.total_results || 0)) {
      setHasMore(false);
      return;
    }

    setQuery({ ...query, page: query.page + 1, loadInfinite: true });
  };

  const handleSortByCallback = (sort_by: string) => {
    setHasMore(true);
    setQuery({ ...query, page: 1, sort_by, loadInfinite: false });
  };

  const handleFilterByCallback = (with_genres: string) => {
    setHasMore(true);
    setQuery({ ...query, page: 1, with_genres, loadInfinite: false });
  };

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>Tous les films</h2>
      <div css={configurationStyle}>
        <SortBy
          sort_by={query.sort_by}
          handleSortByCallback={handleSortByCallback}
        />
        <FilterBy
          with_genres={query.with_genres}
          handleFilterByCallback={handleFilterByCallback}
        />
      </div>
      <InfiniteScroll
        dataLength={items?.length || 0}
        next={fetchData}
        hasMore={hasMore}
        loader={<p css={messageInfiniteScrollStyle}>Chargement...</p>}
        endMessage={
          <p css={messageInfiniteScrollStyle}>
            <b>Hourra ! Vous avez tout vu</b>
          </p>
        }
      >
        <div css={itemsWrapperStyle}>
          {items?.map((movie: IMovie) => (
            <div key={movie.id}>
              <Movie {...movie} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

const containerStyle = css({
  margin: '0 2.5rem',
  padding: '4rem 0',
  borderTop: 'solid 2px #ffffff17',
});

const titleStyle = css({
  fontSize: '2rem',
  color: 'white',
});

const configurationStyle = css({
  maxWidth: '50rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '1.5rem 0 3rem',
  ['@media (max-width: 600px)']: {
    flexDirection: 'column',
    rowGap: '1rem',
  },
});

const messageInfiniteScrollStyle = css({
  color: 'white',
  fontSize: '1rem',
  textAlign: 'center',
  marginTop: '3.5rem',
});

const itemsWrapperStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  rowGap: '3rem',
  columnGap: '8rem',
  ['@media (max-width: 900px)']: {
    columnGap: '5rem',
  },
  ['@media (max-width: 600px)']: {
    columnGap: '1rem',
  },
});
