'use client';

import { useColorScheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';

import Theme from '@/theme/Theme';
import './globals.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setMode } = useColorScheme();
  useEffect(() => {
    setMode('light');
  });
  return (
    <SnackbarProvider>
      <html lang="en">
        <body>
          <Theme>{children} </Theme>
        </body>
      </html>
    </SnackbarProvider>
  );
}
