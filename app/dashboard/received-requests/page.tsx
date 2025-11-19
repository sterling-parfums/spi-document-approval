'use client';

import ApprovalEntry from '@/app/_components/entry-approval';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type ApprovalEntryData = {
  id: number;
  documentName: string;
  requester: string;
  approvers: string[];
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
};

export default function Page() {
  const [selected, setSelected] = useState<ApprovalEntryData | null>(null);

  const approvals = [
    {
      id: 1,
      documentName: 'Invoice 1',
      date: '10-11-2025',
      amount: 10000,
      requester: 'Bob',
      approvers: ['Alice', 'George'],
      status: 'PENDING' as const,
    },
    {
      id: 2,
      documentName: 'Invoice 2',
      date: '09-11-2025',
      amount: 15000,
      requester: 'Bob',
      approvers: ['Alice', 'George'],
      status: 'PENDING' as const,
    },
    {
      id: 3,
      documentName: 'Invoice 3',
      date: '07-11-2025',
      amount: 104500,
      requester: 'Bob',
      approvers: ['Alice', 'George'],
      status: 'PENDING' as const,
    },
  ];
  const router = useRouter();
  // if (selected) {
  //   // Detail View
  //   return (
  //     <DetailedView data={selected} onClickBack={() => setSelected(null)} />
  //   );
  // }

  return (
    <Box
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Approvals
      </Typography>
      {approvals.map((item) => (
        <ApprovalEntry
          key={item.id}
          data={item}
          sx={{ mb: 2 }}
          onClick={() => router.push(`/dashboard/received-requests/${item.id}`)}
        />
      ))}
    </Box>
  );
}
