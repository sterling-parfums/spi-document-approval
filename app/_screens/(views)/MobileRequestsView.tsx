'use client';

import ApprovalEntry from '@/app/_components/entry-approval';
import SearchBar from '@/app/_components/search-bar';
import { ApprovalEntryData } from '@/app/dashboard/requests/received/page';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

type RequestsScreenProps = {
  title: string;
  data: ApprovalEntryData[];
  baseRoute: string;
  headerAction?: React.ReactNode;
};

export default function MobileRequestsView({
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
      <SearchBar onSearch={() => {}} />
      {data.map((item) => (
        <ApprovalEntry
          key={item.id}
          data={item}
          sx={{ mb: 2 }}
          onClick={() => router.push(`${baseRoute}/${item.id}`)}
        />
      ))}
    </Box>
  );
}
