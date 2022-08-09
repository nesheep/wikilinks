import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const WikiDetailSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton
      variant="rectangular"
      width={100}
      height={100}
    />
    <Skeleton
      variant="rectangular"
      height={70}
    />
  </Stack>
);

export default WikiDetailSkeleton;
