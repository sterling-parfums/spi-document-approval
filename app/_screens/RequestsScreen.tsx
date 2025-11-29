'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ApprovalEntryData } from '../dashboard/requests/received/page';
import DesktopRequestsView from './(views)/DesktopRequestsView';
import MobileRequestsView from './(views)/MobileRequestsView';

type RequestsScreenProps = {
  title: string;
  data: ApprovalEntryData[];
  baseRoute: string;
  requestType: 'Sent' | 'Received';
};

export default function RequestsScreen({
  title,
  data,
  baseRoute,
  requestType,
}: RequestsScreenProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {isMobile ? (
        <MobileRequestsView data={data} baseRoute={baseRoute} />
      ) : (
        <DesktopRequestsView
          title={title}
          data={data}
          baseRoute={baseRoute}
          requestType={requestType}
        />
      )}
    </Box>
  );
}
