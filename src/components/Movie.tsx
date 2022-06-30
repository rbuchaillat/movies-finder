import Image from 'next/image';
import { css } from '@emotion/react';
import { IMovie } from '../interfaces';

export const Movie = (props: Omit<IMovie, 'id'>) => {
  return (
    <section>
      <div css={imageWrapperStyle}>
        <Image
          src={
            process.env.NEXT_PUBLIC_PREFIX_IMAGE_URL +
            (props.poster_path || process.env.NEXT_PUBLIC_DEFAULT_IMAGE || '')
          }
          width={145}
          height={217}
          alt="Poster path"
        />
      </div>
      <h3 css={titleStyle}>{props.original_title}</h3>
      <span css={dateStyle}>
        {new Date(props.release_date ?? '').getFullYear()}
      </span>
    </section>
  );
};

const imageWrapperStyle = {
  img: {
    borderRadius: 10,
  },
};

const titleStyle = css({
  fontSize: '1.2rem',
  color: 'white',
  margin: '0.8rem 0 0',
  maxWidth: '14.5rem',
});

const dateStyle = css({
  fontSize: '1.2rem',
  color: '#5d6e8b',
});
