import { useMemo } from 'react';
import { MPButton, MPCard, MPIcon, MPTypography } from 'material-plus-ui';
import { FileText, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Layout from '@/renderer/components/layouts/Layout';
import { openExternalLink } from '@/renderer/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

export default function About() {
  const [t] = useTranslation(['common', 'notice', 'menu']);
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const ruffleVersion = useMemo(() => stateAppScreen.mainGlobalValues.APP_RUFFLE_VERSION_DATE, []);
  const author = useMemo(() => stateAppScreen.mainGlobalValues.APP_AUTHOR, []);

  return (
    <Layout title={t('about-title') as string} withBackButton>
      <MPCard className="app-panel app-panel--about" variant="elevated" elevation={1} density={0}>
        <img className="app-about__logo" draggable="false" alt="logo" src="images/app-logo.webp" />
        <MPTypography level="body">
          Flare Player {stateAppScreen.mainGlobalValues.APP_VERSION_NAME} By {author}
        </MPTypography>
        <MPTypography level="body">
          Flash Emulator Based on Ruffle (Nightly {ruffleVersion})
        </MPTypography>
        <div className="app-about__links">
          <MPButton
            variant="text"
            startIcon={<MPIcon icon={FileText} size={18} />}
            onClick={(ev) =>
              openExternalLink(ev, 'https://github.com/ruffle-rs/ruffle/blob/master/LICENSE.md')
            }
          >
            Ruffle LICENSE
          </MPButton>
          <MPButton
            variant="text"
            startIcon={<MPIcon icon={RefreshCw} size={18} />}
            onClick={(ev) => openExternalLink(ev, 'https://github.com/jooy2/flare/releases')}
          >
            {t('menu:update-check')}
          </MPButton>
        </div>
      </MPCard>
    </Layout>
  );
}
