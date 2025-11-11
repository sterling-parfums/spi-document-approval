import {
  Check as CheckIcon,
  Clear as ClearIcon,
  FindInPage as FindInPageIcon,
} from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

type ApprovalEntryProps = {
  id: number;
  documentName: string;
  date: string;
  amount: number;
  sx?: SxProps<Theme>;
};
export default function ApprovalEntry({
  id,
  documentName,
  date,
  amount,
  sx,
}: ApprovalEntryProps) {
  return (
    <Card
      key={id}
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },
        ...sx,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="h6">{documentName}</Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{amount.toLocaleString()}</Typography>
          <Box display="flex" gap={1}>
            <IconButton aria-label="preview">
              <FindInPageIcon />
            </IconButton>
            <IconButton aria-label="approve" color="success">
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="reject" color="error">
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
