import { ChangeEvent } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  search: string;
  setSearch: (sort_by: string) => void;
}

export const Header = ({ search, setSearch }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <header css={headerStyle}>
      <Image src="/images/logo.svg" alt="logo" width="225" height="38" />
      <FormControl sx={{ maxWidth: '30rem', width: '100%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search" css={inputLabelStyle}>
          Rechercher un film
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          label="With normal TextField"
          value={search}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-search-helper-text"
          inputProps={{
            'aria-label': 'search',
          }}
          css={inputStyle}
        />
      </FormControl>
    </header>
  );
};

const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2.5rem',
  color: '#ffffff4f',
  ['@media (max-width: 600px)']: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: '2rem',
  },
});

const inputLabelStyle = css({
  fontSize: '1.6rem',
  color: '#ffffff4f',
});

const inputStyle = css({
  color: '#ffffff4f',
  borderRadius: 15,
  fontSize: '1.6rem',
  svg: {
    color: '#ffffff4f',
  },
  fieldset: {
    borderColor: '#ffffff4f',
  },
});
