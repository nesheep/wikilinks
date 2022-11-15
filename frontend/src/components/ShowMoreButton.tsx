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
      variant="outlined"
      color="inherit"
      onClick={() => addBrowsingWlIds(wikiLinks)}
      sx={wikiLinks.next ? null : { display: 'none' }}
    >
      もっと見る
    </Button>
  );
};

export default ShowMoreButton;
