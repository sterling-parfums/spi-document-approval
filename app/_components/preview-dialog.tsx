'use client';

import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  fileBlob: Blob | null;
};

export default function PreviewDialog({ open, onClose, fileBlob }: Props) {
  const previewUrl = useMemo(() => {
    if (!fileBlob) return null;
    return URL.createObjectURL(fileBlob);
  }, [fileBlob]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const isPDF = fileBlob?.type === 'application/pdf';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      slotProps={{
        paper: {
          sx: {
            height: '90vh',
            borderRadius: 2,
            overflow: 'hidden',
          },
        },
      }}
    >
      <DialogContent
        sx={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {!fileBlob ? (
          <Box sx={{ p: 4 }}>
            <Typography>No file to preview</Typography>
          </Box>
        ) : isPDF ? (
          <object
            data={previewUrl!}
            type="application/pdf"
            style={{ width: '100%', height: '100%' }}
          >
            <Box sx={{ p: 4 }}>
              <Typography>
                PDF preview is not supported on this device.
              </Typography>
              <a href={previewUrl!} download>
                Download PDF
              </a>
            </Box>
          </object>
        ) : (
          // UNSUPPORTED TYPE
          <Box sx={{ p: 4 }}>
            <Typography>Preview not supported for this file.</Typography>
            <a href={previewUrl!} download>
              Download File
            </a>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
