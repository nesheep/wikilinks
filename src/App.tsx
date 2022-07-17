import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WikiDetail from './components/WikiDetail';
import WikiDetailSkeleton from './components/WikiDetailSkeleton';

const IDS = ['3051', '1211', '3137'];

const App = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h3">
        WikiLinks
      </Typography>
      {IDS.map(id => (
        <Box
          key={id}
          sx={{ p: 1 }}
        >
          <Suspense fallback={<WikiDetailSkeleton />}>
            <WikiDetail id={id} />
          </Suspense>
        </Box>
      ))}
    </Box>
  );
};

export default App;
