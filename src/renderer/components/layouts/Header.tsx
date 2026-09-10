import { useMemo } from 'react';
import { MPHeader, MPIcon, MPIconButton, MPSelect, MPTypography } from 'material-plus-ui';
import { ArrowLeft, BarChart3, CircleHelp, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import ModalMetadata from '@/renderer/components/dialogs/ModalMetadata';
import { arrWithNumber } from '@/renderer/utils/helper';

export default function Header({
  title,
  withBackButton,
  withRefresh = false,
}: {
  title: string;
  withBackButton: boolean;
  withRefresh?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const playerVersionItems = useMemo(
    () =>
      arrWithNumber(0, 32).map((value) => ({ value, label: value === 0 ? 'Auto' : `${value}` })),
    [],
  );

  const handleGoToLink = (url) => {
    if (url === location.pathname) {
      if (!withRefresh) return;
      navigate(url);
    } else navigate(url);
  };

  const handleGoHome = (e) => {
    if (e) e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/explorer');
    }
  };

  const handleOpenMetadata = () => {
    dispatch(setConfig({ dialogMetadataOpen: true }));
  };

  const handleFlashEmulatePlayerVersionChange = (value) => {
    dispatch(setConfig({ appConfigEmulatePlayerVersion: Number(value) }));
  };

  return (
    <MPHeader
      className="app-header"
      position="fixed"
      variant="filled"
      size="xs"
      elevation={1}
      maxWidth="none"
      brand={
        <>
          {withBackButton && (
            <MPIconButton
              variant="text"
              size="xs"
              label="back"
              onClick={handleGoHome}
              icon={<MPIcon icon={ArrowLeft} size={18} />}
            />
          )}
          <MPTypography className="app-header__title" level="body">
            {title}
          </MPTypography>
        </>
      }
      actions={
        <div className="app-header__actions">
          {location.pathname === '/player' && (
            <>
              {stateAppScreen.appConfigShowPlayerVersionSelect && (
                <MPSelect
                  size="xs"
                  name="playerVersion"
                  id="player-version"
                  items={playerVersionItems}
                  value={stateAppScreen.appConfigEmulatePlayerVersion}
                  onValueChange={handleFlashEmulatePlayerVersionChange}
                />
              )}
              <MPIconButton
                variant="text"
                size="xs"
                label="metadata"
                onClick={() => handleOpenMetadata()}
                icon={<MPIcon icon={BarChart3} size={18} />}
              />
            </>
          )}
          {!withBackButton && (
            <>
              <MPIconButton
                variant="text"
                size="xs"
                label="about"
                onClick={() => handleGoToLink('/about')}
                icon={<MPIcon icon={CircleHelp} size={18} />}
              />
              <MPIconButton
                variant="text"
                size="xs"
                label="settings"
                onClick={() => handleGoToLink('/settings')}
                icon={<MPIcon icon={Settings} size={18} />}
              />
            </>
          )}
          <ModalMetadata />
        </div>
      }
    />
  );
}
