import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const WikiLinksListItemsSkeleton = () => (
  <Stack spacing={1}>
    {new Array<JSX.Element>(25).fill(<Skeleton variant="text" />)}
  </Stack>
);

export default WikiLinksListItemsSkeleton;
