/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';

export default function PanelHeader({ title, desc }) {
  return (
    <>
      <Typography component="h3">{title}</Typography>
      <Typography component="span">{desc}</Typography>
    </>
  );
}
