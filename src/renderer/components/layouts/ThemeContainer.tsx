/** @jsxImportSource @emotion/react */
import { ReactNode, useEffect, useMemo } from 'react';
import darkScrollbar from '@mui/material/darkScrollbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { Global, ThemeProvider, css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

export default function ThemeContainer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const darkMode = useMemo((): boolean => {
    if (stateAppScreen.appConfigTheme === 'auto') {
      return prefersDarkMode;
    }
    return stateAppScreen.isDarkTheme;
  }, [stateAppScreen.appConfigTheme, stateAppScreen.isDarkTheme, prefersDarkMode]);
  const muiTheme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#ff5e47' : '#ff9014',
          },
          secondary: {
            main: darkMode ? '#595959' : '#909090',
          },
          background: {
            default: darkMode ? '#2c2c2c' : '#ececec',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: darkMode ? darkScrollbar() : null,
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                padding: '3px 3px 3px 8px',
              },
            },
          },
          MuiRadio: {
            styleOverrides: {
              root: {
                padding: '3px 3px 3px 8px',
              },
            },
          },
          MuiToolbar: {
            styleOverrides: {
              dense: {
                height: 42,
                minHeight: 42,
                color: darkMode ? '#fff' : '#333',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                background: darkMode ? '#2c2c2c' : '#ffffff',
              },
            },
          },
        },
      }),
    [stateAppScreen.isDarkTheme],
  );

  useEffect(() => {
    if (stateAppScreen.appConfigTheme === 'auto') {
      dispatch(setConfig({ isDarkTheme: prefersDarkMode }));
    }
  }, [prefersDarkMode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Global
        styles={css`
          html {
            overflow-y: hidden;
          }
        `}
      />
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </MuiThemeProvider>
  );
}
