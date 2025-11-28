'use client';

import { colors } from '@/utils/colors';
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  FindInPage as FindInPageIcon,
} from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';
import { ApprovalEntryData } from '../dashboard/requests/received/page';

type ApprovalEntryProps = {
  data: ApprovalEntryData;
  onClick: () => void;
  sx?: SxProps<Theme>;
};
export default function ApprovalEntry({
  data,
  onClick,
  sx,
}: ApprovalEntryProps) {
  return (
    <Card
      key={data.id}
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
        },
        maxWidth: '500px',
        background: (() => {
          switch (data.status) {
            case 'APPROVED':
              return colors.approved;
            case 'PENDING':
              return colors.pending;
            case 'REJECTED':
              return colors.rejected;
            default:
              return colors.white;
          }
        })(),
        margin: 2,
        ...sx,
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="caption">
            {`ID ${data.id} • `}
            {data.payee}
          </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {' '}
          <Typography variant="h4">
            {data.amount.toFixed(2)} {` ${data.currency}`}
          </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Typography variant="body1" color="text.secondary">
            {new Date(data.requestDate).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton
              aria-label="preview"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <FindInPageIcon />
            </IconButton>
            <IconButton
              aria-label="approve"
              color="success"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              aria-label="reject"
              color="error"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
