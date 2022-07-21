import Button from '@mui/material/Button';

import useAddBrowsingWlIds from '../hooks/useAddBrowsingWlIds';
import useWikiLinks from '../hooks/useWikiLinks';

export type ShowMoreButtonProps = {
  id: string;
};

const ShowMoreButton = ({ id }: ShowMoreButtonProps) => {
  const addBrowsingWlIds = useAddBrowsingWlIds();
  const wikiLinks = useWikiLinks(id);

  return (
    <Button
      variant="contained"
      color='inherit'
      onClick={() => addBrowsingWlIds(wikiLinks)}
      sx={wikiLinks.next ? null : { display: 'none' }}
    >
      show more
    </Button>
  );
};

export default ShowMoreButton;
