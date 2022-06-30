import { useState } from 'react';
import { css } from '@emotion/react';
import { Header } from '../components/Header';
import { Movies } from '../components/Movies';
import { Popular } from '../components/Popular';
import { SearchResult } from '../components/SearchResult';

export const Home = () => {
  const [search, setSearch] = useState('');

  return (
    <main>
      <div css={containerStyle}>
        <Header search={search} setSearch={setSearch} />
        {!search ? (
          <>
            <Popular />
            <Movies />
          </>
        ) : (
          <SearchResult search={search} />
        )}
      </div>
    </main>
  );
};

const containerStyle = css({
  maxWidth: 1240,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
});
