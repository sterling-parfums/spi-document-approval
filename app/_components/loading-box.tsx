import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingBox() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress sx={{ mr: 2 }} />
      <Typography> Loading...</Typography>
    </Box>
  );
}
