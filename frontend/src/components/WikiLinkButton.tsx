import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export type WikiLinkButtonProps = {
  title: string;
};

const WikiLinkButton = ({ title }: WikiLinkButtonProps) => (
  <IconButton
    href={`https://ja.wikipedia.org/wiki/${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener"
  >
    <OpenInNewIcon />
  </IconButton>
);

export default WikiLinkButton;
