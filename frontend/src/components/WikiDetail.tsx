import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HideImageIcon from '@mui/icons-material/HideImage';
import SearchIcon from '@mui/icons-material/Search';

import useWiki from '../hooks/useWiki';

export type WikiDetailProps = {
  id: string;
};

const WikiDetail = ({ id }: WikiDetailProps) => {
  const navigate = useNavigate();
  const wiki = useWiki(id);

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ flex: 1 }}>
          {wiki.image ? (
            <img
              src={wiki.image}
              alt={wiki.title}
              style={{ height: 100 }}
            />
          ) : (
            <Box
              sx={{
                width: 100,
                height: 100,
                color: 'grey.400',
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HideImageIcon />
            </Box>
          )}
        </Box>
        <IconButton onClick={() => navigate(`/${wiki.title}`)}>
          <SearchIcon />
        </IconButton>
      </Box>
      {wiki.extract && <Typography>{wiki.extract}</Typography>}
    </Stack>
  );
};

export default WikiDetail;
