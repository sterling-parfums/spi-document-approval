import ApprovalEntry from '@/app/components/approval-entry';
import { Box } from '@mui/system';

export default function Page() {
  const approvals = [
    { id: 1, title: 'Invoice 1', date: '2025-11-10', amount: 10000 },
    { id: 2, title: 'Invoice 2', date: '2025-11-09', amount: 15000 },
    {
      id: 3,
      title: 'Invoice 3',
      date: '2025-11-07',
      amount: 104500,
    },
  ];
  return (
    <Box>
      {approvals.map((item) => (
        <ApprovalEntry
          key={item.id}
          id={item.id}
          documentName={item.title}
          date={item.date}
          amount={item.amount}
          sx={{ mb: 2 }}
        />
      ))}
    </Box>
  );
}
