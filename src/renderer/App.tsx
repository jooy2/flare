import { HashRouter, Route, Routes } from 'react-router-dom';

import NotFound from '@/renderer/screens/NotFound';
import Main from '@/renderer/screens/Main';
import Explorer from '@/renderer/screens/Explorer';
import Player from '@/renderer/screens/Player';
import About from '@/renderer/screens/About';
import Settings from '@/renderer/screens/Settings';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/player" element={<Player />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
