import { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import WikiDetail from './WikiDetail';
import WikiDetailSkeleton from './WikiDetailSkeleton';
import { Wiki } from '../types/wiki';

export type WikiLinksListItemProps = {
  wiki: Wiki;
};

const WikiLinksListItem = ({ wiki }: WikiLinksListItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={() => setOpen(prev => !prev)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6">
          {wiki.title}
        </Typography>
      </Box>
      {open &&
        <Box sx={{ px: 2 }}>
          <Suspense fallback={<WikiDetailSkeleton />}>
            <WikiDetail id={wiki.id} />
          </Suspense>
        </Box>
      }
    </Box>
  );
};

export default WikiLinksListItem;
