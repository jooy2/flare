import { ReactNode, useEffect, useMemo } from 'react';
import { MPConfigProvider } from 'material-plus-ui';
import { useMPMediaQuery } from 'material-plus-ui/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';

export default function ThemeContainer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const prefersDarkMode = useMPMediaQuery('(prefers-color-scheme: dark)');
  const darkMode = useMemo((): boolean => {
    if (stateAppScreen.appConfigTheme === 'auto') {
      return prefersDarkMode;
    }
    return stateAppScreen.isDarkTheme;
  }, [stateAppScreen.appConfigTheme, stateAppScreen.isDarkTheme, prefersDarkMode]);

  // Material Plus reads the scheme off the document, and `app.css` hangs the
  // application's own colours on the same attribute.
  useEffect(() => {
    document.documentElement.dataset.mpScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    if (stateAppScreen.appConfigTheme === 'auto') {
      dispatch(setConfig({ isDarkTheme: prefersDarkMode }));
    }
  }, [prefersDarkMode]);

  return (
    <MPConfigProvider size="sm" density={-2}>
      {children}
    </MPConfigProvider>
  );
}
