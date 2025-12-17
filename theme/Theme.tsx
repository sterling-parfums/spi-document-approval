import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { dataDisplayCustomizations } from './components/dataDisplay';
import { inputsCustomizations } from './components/inputs';
import { navigationCustomizations } from './components/navigation';
import { typography } from './themeConstants';

interface ThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions['components'];
}

export default function Theme(props: ThemeProps) {
  const { children, themeComponents } = props;
  const theme = useMemo(() => {
    return createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      typography,
      components: {
        ...themeComponents,
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...navigationCustomizations,
      },
    });
  }, [themeComponents]);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
