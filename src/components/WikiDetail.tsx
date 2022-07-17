import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import useWiki from '../hooks/useWiki';

export type WikiDetailProps = {
  id: string;
};

const WikiDetail = ({ id }: WikiDetailProps) => {
  const wiki = useWiki(id);

  return (
    <Stack spacing={1}>
      <Typography variant="h6">
        {wiki.title}
      </Typography>
      {wiki.extract &&
        <Typography>
          {wiki.extract}
        </Typography>
      }
    </Stack>
  );
};

export default WikiDetail;
