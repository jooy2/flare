import { useMemo } from 'react';
import { MPButton, MPDialog, MPIcon, MPTypography } from 'material-plus-ui';
import { FileText, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import { openExternalLink } from '@/renderer/utils/helper';

export default function ModalAbout() {
  const [t] = useTranslation(['common', 'notice', 'menu']);
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const ruffleVersion = useMemo(() => stateAppScreen.mainGlobalValues.APP_RUFFLE_VERSION_DATE, []);
  const author = useMemo(() => stateAppScreen.mainGlobalValues.APP_AUTHOR, []);

  const handleDialogClose = () => {
    dispatch(setConfig({ dialogAboutOpen: false }));
  };

  return (
    <MPDialog
      size="md"
      open={stateAppScreen.dialogAboutOpen}
      onOpenChange={(next) => {
        if (!next) handleDialogClose();
      }}
      title={t('about-title')}
      actions={
        <MPButton variant="text" color="primary" onClick={handleDialogClose}>
          {t('menu:close')}
        </MPButton>
      }
    >
      <div className="app-about">
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
      </div>
    </MPDialog>
  );
}
