import { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import WikiDetail from './WikiDetail';
import WikiDetailSkeleton from './WikiDetailSkeleton';
import WikiLinkButton from './WikiLinkButton';
import { Wiki } from '../types/wiki';

export type WikiLinksListItemProps = {
  wiki: Wiki;
};

const WikiLinksListItem = ({ wiki }: WikiLinksListItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{
        width: '100%',
        display: 'flex',
      }}>
        <ButtonBase
          onClick={() => setOpen(prev => !prev)}
          sx={{
            flex: 1,
            justifyContent: 'flex-start',
            textAlign: 'start',
          }}
        >
          <Box sx={{ p: 1 }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
          <Typography variant="h6">
            {wiki.title}
          </Typography>
        </ButtonBase>
        <WikiLinkButton title={wiki.title} />
      </Box>
      {open &&
        <Box sx={{ pt: 1 }}>
          <Suspense fallback={<WikiDetailSkeleton />}>
            <WikiDetail id={wiki.id} />
          </Suspense>
        </Box>
      }
    </Box>
  );
};

export default WikiLinksListItem;
