'use client';

import RequestsScreen from '@/app/_screens/RequestsScreen';

export type ApprovalEntryData = {
  id: number;
  requestDate: string;
  payee: string;
  amount: number;
  currency: string;
  requester: string;
  status: string;
};

export default function ReceivedRequestsPage() {
  return (
    <RequestsScreen
      baseRoute="/dashboard/requests/received"
      title="Received Requests"
      requestType="Received"
    />
  );
}
