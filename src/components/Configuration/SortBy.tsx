import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { css } from '@emotion/react';

interface Props {
  sort_by: string;
  handleSortByCallback: (sort_by: string) => void;
}

export const SortBy = ({ sort_by, handleSortByCallback }: Props) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    handleSortByCallback(event.target.value);
  };

  return (
    <div css={containerStyle}>
      <span>Trier par :</span>
      <FormControl sx={{ minWidth: '20rem', marginLeft: '0.8rem' }}>
        <Select value={sort_by} onChange={handleChange} css={selectStyle}>
          <MenuItem value={'popularity.desc'}>Movie Finder présente</MenuItem>
          <MenuItem value={'original_title.asc'}>Ordre alphabétique</MenuItem>
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
