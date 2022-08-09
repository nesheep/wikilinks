import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const WikiLinksListItemsSkeleton = () => (
  <Stack spacing={1}>
    {new Array(25).fill(0).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
      />
    ))}
  </Stack>
);

export default WikiLinksListItemsSkeleton;
