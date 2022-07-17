import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WikiLinksListItems from './components/WikiLinksListItems';
import WikiLinksListItemsSkeleton from './components/WikiLinksListItemsSkeleton';

const ID = 'トマト||||';

const App = () => (
  <Box sx={{ p: 1 }}>
    <Typography variant="h3">
      WikiLinks
    </Typography>
    <Suspense fallback={<WikiLinksListItemsSkeleton />}>
      <WikiLinksListItems id={ID} />
    </Suspense>
  </Box>
);

export default App;
