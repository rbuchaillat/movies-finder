import useSWR from 'swr';
import { css } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Movie } from './Movie';
import { IMovie } from '../interfaces';
import { fetcher } from '../utils/fetcher';

export const Popular = () => {
  const { data, error } = useSWR('/api/popular', fetcher);
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!!error) return <div>Erreur du chargement des films populaires ...</div>;

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>Les 10 meilleures films</h2>
      <div css={swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={isMobile ? 20 : 5}
          slidesPerView={isMobile ? 3.5 : 4}
          navigation={!isMobile}
        >
          {data?.map((movie: IMovie) => (
            <SwiperSlide key={movie.id}>
              <Movie {...movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const containerStyle = css({
  padding: '0 2.5rem',
  ['@media (max-width: 600px)']: {
    padding: '0 0 0 2.5rem',
  },
});

const titleStyle = css({
  fontSize: '2rem',
  color: 'white',
});

const swiperCustomButton = {
  width: '5rem',
  height: '5rem',
  backgroundColor: '#ffffff1a',
  borderRadius: '50%',
  '::after': {
    fontSize: '2.2rem',
    fontWeight: 900,
  },
};

const swiperWrapper = css({
  padding: '2.5rem 0 5rem',
  '.swiper': {
    '.swiper-slide': {
      display: 'flex',
      justifyContent: 'center',
      ['@media (max-width: 600px)']: {
        justifyContent: 'flex-start',
      },
    },
  },
  '.swiper-button-prev': {
    left: 0,
    ...swiperCustomButton,
  },
  '.swiper-button-next': {
    right: 0,
    ...swiperCustomButton,
  },
});
