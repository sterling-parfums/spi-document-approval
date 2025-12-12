import { redirect } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { FileResponse } from '../_services/file.service';
import { apiFetch } from './apiFetch';
import { getMe } from './user.client';

export type UploadedFile = {
  id: string;
  key: string;
  filename: string;
  mimeType: string;
  sizeInBytes: number;
  createdById: number;
  createdAt: string;
  updatedAt: string;
};

export async function uploadFileClient(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiFetch('/api/files', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error: { error?: string } = await res.json().catch(() => ({}));
    return {
      success: false,
      status: res.status,
      error: error.error ?? 'Upload failed',
    };
  }

  const data: UploadedFile = await res.json();

  return { success: true, data };
}

type FileRequestResult =
  | { success: true; data: Blob; headers: Headers }
  | { success: false; status: number };

export async function getFile(
  fileId: string,
  params: { download: boolean } = { download: true }
): Promise<FileRequestResult> {
  const res = await apiFetch(
    `/api/files/${fileId}${!params.download ? '/preview' : ''}`
  );
  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const blob = await res.blob();

  return {
    success: true,
    data: blob,
    headers: res.headers,
  };
}

type SignedFileRequestResult =
  | { success: true; data: FileResponse }
  | { success: false; status: number };

export async function getSignedFile(
  requestId: string
): Promise<SignedFileRequestResult> {
  const res = await apiFetch(`/api/requests/${requestId}/signed`);

  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const fileData = await res.json();

  return {
    success: true,
    data: fileData,
  };
}

export async function downloadFile(fileId: string) {
  const res = await getFile(fileId, { download: true });

  if (!res.success) {
    alert(`Error fetching file: ${res.status}`);
    return;
  }

  const blob = res.data;
  const disposition = res.headers.get('Content-Disposition') || '';
  const filenameMatch = disposition.match(/filename="?(.+?)"?($|;)/);
  const fileName = filenameMatch ? filenameMatch[1] : 'file';

  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(downloadUrl);
}

export async function openPreview(fileId: string) {
  const me = await getMe();

  if (!me.success) {
    redirect('/login');
  }

  window.open(`/api/files/${fileId}/preview`);
}

export async function openSignedApprovalFile(
  requestId: string,
  props?: { download: boolean }
) {
  const signed = await getSignedFile(requestId);

  if (!signed.success) {
    enqueueSnackbar(`Unable to fetch signed file ${signed.status}`, {
      variant: 'error',
    });
    return;
  }

  if (props?.download) {
    await downloadFile(signed.data.id);
    return;
  }

  await openPreview(signed.data.id);
}
