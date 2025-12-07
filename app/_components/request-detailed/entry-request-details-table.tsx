'use client';

import {
  getPreviewFileLink,
  openApprovalFilePreview,
} from '@/app/api/_client/file.client';
import { RequestResponseWithFiles } from '@/app/api/_services/request.service';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

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
      <TableCell
        sx={{ fontWeight: 'bold', width: { sm: '100px', md: '200px' } }}
      >
        {header}
      </TableCell>
      <TableCell>{data}</TableCell>
    </TableRow>
  );
}

type FileData = Record<string, string>;

export default function ApprovalDetailsTable({ data }: ApprovalTableProps) {
  const [supportingURLs, setSupportingURLs] = useState<FileData>({});
  useEffect(() => {
    async function loadSupportingFiles() {
      const urls: FileData = {};
      if (!data.supportingFiles) return;

      await Promise.all(
        data.supportingFiles.map(async (f) => {
          const url = await getPreviewFileLink(f.id);
          if (url) urls[f.id] = url;
        })
      );

      setSupportingURLs(urls);
    }

    loadSupportingFiles();
  }, []);
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
            data={
              <a href="#" onClick={() => openApprovalFilePreview(data.id)}>
                {data.approvalFile?.filename ?? '-'}
              </a>
            }
          />

          <ApprovalTableRow
            header="Supporting Documents"
            data={
              data.supportingFiles?.length
                ? data.supportingFiles?.map((file) => {
                    return (
                      <a
                        key={file.id}
                        href={supportingURLs[file.id]}
                        target="_blank"
                      >
                        {file.filename}
                      </a>
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
