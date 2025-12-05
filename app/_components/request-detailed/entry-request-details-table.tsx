'use client';

import { RequestResponseWithFiles } from '@/app/api/_services/request.service';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

type ApprovalTableProps = {
  data: RequestResponseWithFiles & { approvers: string[] };
};

type ApprovalTableRowProps = {
  header: string;
  data: React.ReactNode;
};

function ApprovalTableRow({ header, data }: ApprovalTableRowProps) {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold', width: '200px' }}>
        {header}
      </TableCell>
      <TableCell>{data}</TableCell>
    </TableRow>
  );
}

export default function ApprovalDetailsTable({ data }: ApprovalTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3 }}>
      <Table key={data.id}>
        <TableBody>
          <ApprovalTableRow header="Title" data={data.title} />

          <ApprovalTableRow
            header="Description"
            data={data.description || '—'}
          />
          <ApprovalTableRow header="Payee" data={data.payee} />

          <ApprovalTableRow
            header="Amount"
            data={`${data.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })} ${data.currency}`}
          />

          <ApprovalTableRow
            header="Requester"
            data={data.requester?.name ?? '—'}
          />

          <ApprovalTableRow
            header="Approvers"
            data={data.approvers.length ? data.approvers.join(', ') : '—'}
          />

          <ApprovalTableRow
            header="Status"
            data={data.status?.toString() ?? '—'}
          />

          <ApprovalTableRow
            header="Created At"
            data={new Date(data.createdAt).toLocaleString()}
          />

          <ApprovalTableRow
            header="Approval Document"
            data={data.approvalFile?.filename}
          />

          <ApprovalTableRow
            header="Supporting Documents"
            data={
              data.supportingFiles?.length
                ? data.supportingFiles?.map((file) => {
                    return (
                      <Typography key={file.id}>{file.filename}</Typography>
                    );
                  })
                : '-'
            }
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
