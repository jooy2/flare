import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/renderer/App';
import { store } from '@/renderer/store';
import '@/renderer/i18n';
import ThemeContainer from '@/renderer/components/layouts/ThemeContainer';
import '@/renderer/styles/app.css';

// Add API key defined in contextBridge to window object type
declare global {
  interface Window {
    mainApi?: any;
    RufflePlayer?: any;
  }
}

createRoot(document.getElementById('app')!).render(
  <Provider store={store}>
    <ThemeContainer>
      <App />
    </ThemeContainer>
  </Provider>,
);
