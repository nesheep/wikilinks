import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import WikiLinkButton from './WikiLinkButton';
import useSearch from '../hooks/useSearch';

const SearchBar = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const [word, setWord] = useState('');
  const [composition, setComposition] = useState(false);
  const search = useSearch();

  useEffect(() => {
    const firstWord = title || 'トマト';
    setWord(firstWord);
    search(firstWord);
  }, [search, title]);

  return (
    <Box
      sx={{
        py: 0.5,
        px: 1,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        bgcolor: 'common.white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={() => navigate(`/${encodeURIComponent(word)}`)}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="検索"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !composition && navigate(`/${encodeURIComponent(word)}`)}
        onCompositionStart={() => setComposition(true)}
        onCompositionEnd={() => setComposition(false)}
        sx={{ flex: 1 }}
      />
      <WikiLinkButton title={word} />
    </Box>
  );
};

export default SearchBar;
