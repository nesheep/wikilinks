import Box from '@mui/material/Box';
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
      {wiki.image &&
        <Box>
          <img
            src={wiki.image}
            alt={wiki.title}
            style={{ height: 100 }}
          />
        </Box>
      }
      {wiki.extract &&
        <Typography>
          {wiki.extract}
        </Typography>
      }
    </Stack>
  );
};

export default WikiDetail;
