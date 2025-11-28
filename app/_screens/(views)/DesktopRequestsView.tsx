'use client';

import SearchBar from '@/app/_components/search-bar';
import { ApprovalEntryData } from '@/app/dashboard/requests/received/page';
import { colors } from '@/utils/colors';
import { Add } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

type RequestsScreenProps = {
  title: string;
  data: ApprovalEntryData[];
  baseRoute: string;

  requestType: 'Sent' | 'Recieved';
};

export default function DesktopRequestsView({
  title,
  data,
  baseRoute,
  requestType,
}: RequestsScreenProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h2">{title}</Typography>
        {requestType === 'Sent' && (
          <IconButton
            aria-label="add_request"
            color="inherit"
            onClick={() => router.push('/dashboard/requests/sent/new')}
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              width: 48,
              height: 48,
              borderRadius: '50%',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            <Add />
          </IconButton>
        )}
      </Box>

      <SearchBar onSearch={() => {}} />

      <Table
        sx={{
          borderCollapse: 'separate',
          borderSpacing: '0 12px',
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: '#fff',
              borderRadius: 2,
              boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden',
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Request Date</TableCell>
            <TableCell>Payee</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Requester</TableCell>
            <TableCell>NULL</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((req) => (
            <TableRow
              key={req.id}
              sx={{
                background: (() => {
                  switch (req.status) {
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
                borderRadius: 2,
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'scale(1.01)',
                },
              }}
              onClick={() => router.push(`${baseRoute}/${req.id}`)}
            >
              <TableCell>{req.id}</TableCell>
              <TableCell>{req.requestDate}</TableCell>
              <TableCell>{req.payee}</TableCell>
              <TableCell>{req.amount.toFixed(2)}</TableCell>
              <TableCell>{req.currency}</TableCell>
              <TableCell>{req.requester}</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
