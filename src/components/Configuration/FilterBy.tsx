import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { css } from '@emotion/react';
import { GenresContext } from '../../../pages';

interface Props {
  with_genres: string | undefined;
  handleFilterByCallback: (with_genres: string) => void;
}

export const FilterBy = ({ with_genres, handleFilterByCallback }: Props) => {
  const genres = useContext(GenresContext);

  const handleChange = (event: SelectChangeEvent<string>) => {
    handleFilterByCallback(event.target.value);
  };

  return (
    <div css={containerStyle}>
      <span>Filtrer par :</span>
      <FormControl sx={{ minWidth: '13rem', marginLeft: '0.8rem' }}>
        <InputLabel id="genre-select-label" css={inputLabelStyle}>
          Genre
        </InputLabel>
        <Select
          labelId="genre-select-label"
          label="Genre"
          value={with_genres}
          onChange={handleChange}
          css={selectStyle}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem value={genre.id} key={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.1rem',
  color: '#ffffff4f',
});

const inputLabelStyle = css({
  fontSize: '1.2rem',
  color: '#ffffff4f',
});

const selectStyle = css({
  color: '#ffffff4f',
  borderRadius: 15,
  fontSize: '1.2rem',
  svg: {
    color: '#ffffff4f',
  },
  fieldset: {
    borderColor: '#ffffff4f',
  },
});
