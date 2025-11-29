'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { RequestFilters, RequestType } from '../_types/request';
import { getRequests } from '../api/_client/request.client';
import { RequestResponse } from '../api/_services/request.service';
import DesktopRequestsView from './(views)/DesktopRequestsView';
import MobileRequestsView from './(views)/MobileRequestsView';

type RequestsScreenProps = {
  title: string;
  baseRoute: string;
  requestType: RequestType;
};

export default function RequestsScreen({
  title,
  baseRoute,
  requestType,
}: RequestsScreenProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [data, setData] = useState<RequestResponse[]>([]);
  const [filters, setFilters] = useState<RequestFilters>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRequests(requestType, filters, { page: page, pageSize: 20 }).then(
      (res) => {
        if (res.success) {
          setData(res.data);
        } else {
          console.error('Failed to fetch requests', res.status);
        }
      }
    );
  }, []);

  return (
    <Box>
      {isMobile ? (
        <MobileRequestsView
          data={data}
          baseRoute={baseRoute}
          filters={filters}
          setFilters={setFilters}
          page={page}
          setPage={setPage}
        />
      ) : (
        <DesktopRequestsView
          title={title}
          data={data}
          baseRoute={baseRoute}
          requestType={requestType}
          filters={filters}
          setFilters={setFilters}
          page={page}
          setPage={setPage}
        />
      )}
    </Box>
  );
}
