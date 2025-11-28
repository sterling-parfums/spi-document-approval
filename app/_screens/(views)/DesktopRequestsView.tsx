'use client';

import SearchBar from '@/app/_components/search-bar';
import { ApprovalEntryData } from '@/app/dashboard/requests/received/page';
import { colors } from '@/utils/colors';
import {
  Box,
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
  headerAction?: React.ReactNode;
};
const requests = [
  {
    id: 1012,
    requestDate: '18-10-2024',
    payee: 'Acme Supplies Ltd.',
    amount: 450.75,
    currency: 'GBP',
    requester: 'John Smith',
    status: 'APPROVED',
  },
  {
    id: 1013,
    requestDate: '20-10-2024',
    payee: 'Global Stationery Co.',
    amount: 89.99,
    currency: 'GBP',
    requester: 'Sarah Johnson',
    status: 'PENDING',
  },
  {
    id: 1014,
    requestDate: '21-10-2024',
    payee: 'IT Hardware Express',
    amount: 1299.5,
    currency: 'USD',
    requester: 'Michael Brown',
    status: 'REJECTED',
  },
  {
    id: 1015,
    requestDate: '22-10-2024',
    payee: 'EventHub Services',
    amount: 750.0,
    currency: 'EUR',
    requester: 'Emily Davis',
    status: 'APPROVED',
  },
  {
    id: 1016,
    requestDate: '25-10-2024',
    payee: 'Office Cleaning Group',
    amount: 320.0,
    currency: 'GBP',
    requester: 'Daniel Wilson',
    status: 'PENDING',
  },
  {
    id: 1017,
    requestDate: '26-10-2024',
    payee: 'Catering World',
    amount: 567.25,
    currency: 'GBP',
    requester: 'Emma Thompson',
    status: 'APPROVED',
  },
  {
    id: 1018,
    requestDate: '27-10-2024',
    payee: 'TechFix Repairs',
    amount: 210.0,
    currency: 'USD',
    requester: 'Lucas Gray',
    status: 'REJECTED',
  },
];

export default function DesktopRequestsView({
  title,
  data,
  baseRoute,
  headerAction,
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
        {headerAction}
      </Box>
      <SearchBar onSearch={() => {}} />

      <Table
        sx={{
          borderCollapse: 'separate',
          borderSpacing: '0 12px', // horizontal spacing
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
              }}
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
