import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const WikiDetailSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton variant="text" />
    <Skeleton variant="rectangular" height={80} />
  </Stack>
);

export default WikiDetailSkeleton;
