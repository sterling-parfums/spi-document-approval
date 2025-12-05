'use client';

import { RequestEntry } from '@/app/_components/entry-requests-card';
import SearchFilters from '@/app/_components/search-filters';
import { RequestFilters, RequestType } from '@/app/_types/request';
import { RequestResponse } from '@/app/api/_services/request.service';
import { usePreviewDialog } from '@/hooks/use-preview-dialog';
import { Add } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

type RequestsScreenProps = {
  data: RequestResponse[];
  baseRoute: string;
  requestType: RequestType;
  filters: RequestFilters;
  applyFilters: (f: RequestFilters) => void;
  page: number;
  setPage: (page: number) => void;
  canApproveMap: Record<string, boolean>;
};

export default function MobileRequestsView({
  data,
  baseRoute,
  requestType,
  applyFilters,
  canApproveMap,
}: RequestsScreenProps) {
  const router = useRouter();

  const { openPreview, dialog } = usePreviewDialog();
  const new_request_button = (
    <IconButton
      aria-label="add_request"
      variant="contained"
      size="large"
      onClick={(e) => {
        e.stopPropagation();
        router.push('/dashboard/requests/sent/new');
      }}
      sx={{ borderRadius: '50%' }}
    >
      <Add />
    </IconButton>
  );
  return (
    <Box
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SearchFilters onSearch={applyFilters} requestType={requestType} />
      {data.map((item) => (
        <RequestEntry
          key={item.id}
          data={item}
          sx={{ mb: 2 }}
          onClick={() => router.push(`${baseRoute}/${item.id}`)}
          viewOnly={!canApproveMap[item.id]}
          openPreview={openPreview}
        />
      ))}
      {dialog}
      <Paper sx={{ position: 'fixed', bottom: 20 }}>
        {requestType === 'Sent' && new_request_button}
      </Paper>
    </Box>
  );
}
