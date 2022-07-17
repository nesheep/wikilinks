import Stack from '@mui/material/Stack';

import WikiLinksListItem from './WikiLinksListItem';
import useWikiLinks from '../hooks/useWikiLinks';

export type WikiLinksListItemsProps = {
  id: string;
};

const WikiLinksListItems = ({ id }: WikiLinksListItemsProps) => {
  const wikiLinks = useWikiLinks(id);

  return (
    <Stack spacing={1}>
      {wikiLinks.items.map(wiki => (
        <WikiLinksListItem
          key={wiki.id}
          wiki={wiki}
        />
      ))}
    </Stack>
  )
};

export default WikiLinksListItems;
