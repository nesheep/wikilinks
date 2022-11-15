import { Suspense } from 'react';
import Box from '@mui/material/Box';

import ShowMoreButton from './ShowMoreButton';
import WikiLinksListItems from './WikiLinksListItems';
import WikiLinksListItemsSkeleton from './WikiLinksListItemsSkeleton';
import useBrowsingWlIds from '../hooks/useBrowsingWlIds';

const WikiLinksList = () => {
  const browsingWlIds = useBrowsingWlIds();

  return (
    <Box>
      {browsingWlIds.map((id, i) => (
        <Suspense
          key={i}
          fallback={<WikiLinksListItemsSkeleton />}
        >
          <WikiLinksListItems id={id} />
        </Suspense>
      ))}
      {Boolean(browsingWlIds.length) && (
        <Suspense>
          <Box
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
          >
            <ShowMoreButton id={browsingWlIds[browsingWlIds.length - 1]} />
          </Box>
        </Suspense>
      )}
    </Box>
  );
};

export default WikiLinksList;
