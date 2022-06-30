import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Movie } from './Movie';
import { IMovie, IMovies } from '../interfaces';
import { fetcher } from '../utils/fetcher';

interface Props {
  search: string;
}

export const SearchResult = ({ search }: Props) => {
  const { data, error } = useSWR(`/api/movie?page=1&q=${search}`, fetcher);
  const [items, setItems] = useState<IMovie[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState({
    page: 1,
  });

  useEffect(() => {
    setItems(data?.results ?? []);
  }, [data]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(
          `/api/movies?page=${query.page}&q=${search}`
        );
        const jsonRes: IMovies = await response.json();
        const arrayItems = jsonRes.results ?? [];

        setItems([...items, ...arrayItems]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!!error)
    return <div>Erreur du chargement de la recherche des films ...</div>;

  const fetchData = () => {
    if (items === undefined || items.length >= (data?.total_results || 0)) {
      setHasMore(false);
      return;
    }

    setQuery({ ...query, page: query.page + 1 });
  };

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>Recherche du film : {search}</h2>
      {items.length === 0 ? (
        <p css={messageInfiniteScrollStyle}>Pas de résultat ...</p>
      ) : (
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
            {items?.map((movie: IMovie, index: number) => (
              <div key={index}>
                <Movie {...movie} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
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
