import PreviewDialog from '@/app/_components/preview-dialog';
import { getFile } from '@/app/api/_client/file.client';
import { useState } from 'react';

export function usePreviewDialog() {
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [open, setOpen] = useState(false);

  const openPreview = async (fileId: string) => {
    const res = await getFile(fileId, { download: false });
    if (!res.success) {
      alert('Failed to load file');
      return;
    }
    setFileBlob(res.data);
    setOpen(true);
  };

  const closePreview = () => setOpen(false);

  const dialog = (
    <PreviewDialog open={open} onClose={closePreview} fileBlob={fileBlob} />
  );

  return { openPreview, dialog };
}
