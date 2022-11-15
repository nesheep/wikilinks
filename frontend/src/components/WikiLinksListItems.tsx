import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import WikiLinksListItem from './WikiLinksListItem';
import useWikiLinks from '../hooks/useWikiLinks';

export type WikiLinksListItemsProps = {
  id: string;
};

const WikiLinksListItems = ({ id }: WikiLinksListItemsProps) => {
  const wikiLinks = useWikiLinks(id);

  return wikiLinks.items.length ? (
    <Stack>
      {wikiLinks.items.map((wiki) => (
        <WikiLinksListItem
          key={wiki.id}
          wiki={wiki}
        />
      ))}
    </Stack>
  ) : (
    <Box sx={{ textAlign: 'center' }}>
      <Typography>一致するページは見つかりませんでした。</Typography>
    </Box>
  );
};

export default WikiLinksListItems;
