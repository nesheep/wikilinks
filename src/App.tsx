import Box from '@mui/material/Box';

import SearchBar from './components/SearchBar';
import WikiLinksList from './components/WikiLinksList';


const App = () => (
  <Box>
    <SearchBar />
    <Box sx={{
      pt: 7,
      pb: 2,
      px: 1,
    }}>
      <WikiLinksList />
    </Box>
  </Box>
);

export default App;
