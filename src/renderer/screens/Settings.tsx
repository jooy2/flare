import { useState } from 'react';
import { MPButton, MPCard, MPCheckbox, MPRadio, MPRadioGroup, MPSelect } from 'material-plus-ui';
import { useMPMediaQuery } from 'material-plus-ui/hooks';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import Layout from '@/renderer/components/layouts/Layout';
import PanelHeader from '@/renderer/components/views/PanelHeader';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import ModalLocalStorageView from '../components/dialogs/ModalLocalStorageView';

const LANGUAGES = ['auto', 'ko', 'en', 'es', 'pt', 'de', 'fr', 'ja'];

export default function Settings() {
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation(['common', 'notice', 'menu']);
  const [themeCheck, setThemeCheck] = useState(stateAppScreen.appConfigTheme);
  const [preferredRendererCheck, setPreferredRendererCheck] = useState(
    stateAppScreen.appConfigPreferredRenderer,
  );
  const [qualityCheck, setQualityCheck] = useState(stateAppScreen.appConfigQuality);
  const [playerRuntimeCheck, setPlayerRuntimeCheck] = useState(
    stateAppScreen.appConfigPlayerRuntime,
  );
  const [language, setLanguage] = useState(stateAppScreen.appConfigLanguage);
  const [hideHeaderChecked, setHideHeaderChecked] = useState(stateAppScreen.appConfigHideHeader);
  const [letterboxChecked, setLetterboxChecked] = useState(stateAppScreen.appConfigLetterbox);
  const [hideContextChecked, setHideContextChecked] = useState(stateAppScreen.appConfigHideContext);
  const [showPlayerControllerChecked, setShowPlayerControllerChecked] = useState(
    stateAppScreen.appConfigShowPlayerController,
  );
  const [showPlayerVersionSelectChecked, setShowPlayerVersionSelectChecked] = useState(
    stateAppScreen.appConfigShowPlayerVersionSelect,
  );
  const [restoreWindowBoundsChecked, setRestoreBoundsChecked] = useState(
    stateAppScreen.appConfigRestoreWindowBounds,
  );
  const [adjustOriginalSizeChecked, setAdjustOriginalSizeChecked] = useState(
    stateAppScreen.appConfigAdjustOriginalSize,
  );
  const prefersDarkMode = useMPMediaQuery('(prefers-color-scheme: dark)');

  const handleRadioChange = (name: string, value: string): void => {
    switch (name) {
      case 'themeCheck':
        setThemeCheck(value);
        window.mainApi.send('setAppConfig', { theme: value });
        dispatch(setConfig({ appConfigTheme: value }));
        if (value === 'auto') {
          dispatch(setConfig({ isDarkTheme: prefersDarkMode }));
        } else {
          dispatch(setConfig({ isDarkTheme: value !== 'light' }));
        }
        break;
      case 'preferredRendererCheck':
        setPreferredRendererCheck(value);
        window.mainApi.send('setAppConfig', { preferredRenderer: value });
        dispatch(setConfig({ appConfigPreferredRenderer: value }));
        break;
      case 'qualityCheck':
        setQualityCheck(value);
        window.mainApi.send('setAppConfig', { quality: value });
        dispatch(setConfig({ appConfigQuality: value }));
        break;
      case 'playerRuntimeCheck':
        setPlayerRuntimeCheck(value);
        window.mainApi.send('setAppConfig', { playerRuntime: value });
        dispatch(setConfig({ appConfigPlayerRuntime: value }));
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (name: string, value: boolean): void => {
    switch (name) {
      case 'hideHeaderChecked':
        setHideHeaderChecked(value);
        window.mainApi.send('setAppConfig', { hideHeader: value });
        dispatch(setConfig({ appConfigHideHeader: value }));
        break;
      case 'letterboxChecked':
        setLetterboxChecked(value);
        window.mainApi.send('setAppConfig', { letterbox: value });
        dispatch(setConfig({ appConfigLetterbox: value }));
        break;
      case 'hideContextChecked':
        setHideContextChecked(value);
        window.mainApi.send('setAppConfig', { hideContext: value });
        dispatch(setConfig({ appConfigHideContext: value }));
        break;
      case 'restoreWindowBoundsChecked':
        setRestoreBoundsChecked(value);
        window.mainApi.send('setAppConfig', { restoreWindowBounds: value });
        dispatch(setConfig({ appConfigRestoreWindowBounds: value }));
        break;
      case 'adjustOriginalSizeChecked':
        setAdjustOriginalSizeChecked(value);
        window.mainApi.send('setAppConfig', { adjustOriginalSize: value });
        dispatch(setConfig({ appConfigAdjustOriginalSize: value }));
        break;
      case 'showPlayerVersionSelectChecked':
        setShowPlayerVersionSelectChecked(value);
        window.mainApi.send('setAppConfig', { showPlayerVersionSelect: value });
        dispatch(setConfig({ appConfigShowPlayerVersionSelect: value }));
        break;
      case 'showPlayerControllerChecked':
        setShowPlayerControllerChecked(value);
        window.mainApi.send('setAppConfig', { showPlayerController: value });
        dispatch(setConfig({ appConfigShowPlayerController: value }));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = async (value): Promise<void> => {
    const next = String(value);
    setLanguage(next);
    window.mainApi.send('setAppConfig', { language: next });
    dispatch(setConfig({ appConfigLanguage: next }));
    await i18n.changeLanguage(next);
  };

  const handleReset = (ev): void => {
    ev.preventDefault();
    window.mainApi.send('resetAppConfig');
  };

  const handleOpenLocalStorageViewModal = (): void => {
    dispatch(setConfig({ dialogLocalStorageViewOpen: true }));
  };

  const checkboxes = [
    {
      name: 'showPlayerControllerChecked',
      checked: showPlayerControllerChecked,
      label: 'menu:show-player-controller',
    },
    { name: 'hideHeaderChecked', checked: hideHeaderChecked, label: 'menu:hide-header' },
    { name: 'letterboxChecked', checked: letterboxChecked, label: 'menu:letterbox' },
    { name: 'hideContextChecked', checked: hideContextChecked, label: 'menu:hide-context' },
    {
      name: 'adjustOriginalSizeChecked',
      checked: adjustOriginalSizeChecked,
      label: 'menu:adjust-original-size',
    },
    {
      name: 'showPlayerVersionSelectChecked',
      checked: showPlayerVersionSelectChecked,
      label: 'menu:show-player-version-select',
    },
    {
      name: 'restoreWindowBoundsChecked',
      checked: restoreWindowBoundsChecked,
      label: 'menu:restore-bounds',
    },
  ];

  return (
    <Layout title={t('menu:settings') as string} withBackButton>
      <div className="app-scroll">
        <MPCard className="app-panel" variant="elevated" elevation={1}>
          <h2 className="app-settings__title">{t('menu:settings')}</h2>
          <span className="app-panel-header__desc">{t('settings-info')}</span>
          <div className="app-settings__group">
            <div>
              <PanelHeader
                title={t('settings-language-title')}
                desc={t('settings-language-desc')}
              />
              <div className="app-settings__control">
                <MPSelect
                  fullWidth
                  name="language"
                  id="system-language"
                  items={LANGUAGES.map((value) => ({
                    value,
                    label: t(`menu:language-${value}`),
                  }))}
                  value={language}
                  onValueChange={handleSelectChange}
                />
              </div>
            </div>
            <div>
              <PanelHeader title={t('settings-title-2')} desc={t('settings-desc-2')} />
              <MPRadioGroup
                className="app-settings__control"
                orientation="horizontal"
                aria-label="theme"
                name="themeCheck"
                value={themeCheck}
                onValueChange={(value) => handleRadioChange('themeCheck', value)}
              >
                <MPRadio value="auto" label={t('menu:theme-auto')} />
                <MPRadio value="light" label={t('menu:theme-light')} />
                <MPRadio value="dark" label={t('menu:theme-dark')} />
              </MPRadioGroup>
            </div>
            <div>
              <PanelHeader title={t('settings-title-1')} desc={t('settings-desc-1')} />
              <div className="app-settings__checks">
                {checkboxes.map((item) => (
                  <MPCheckbox
                    key={item.name}
                    name={item.name}
                    checked={item.checked}
                    onCheckedChange={(value) => handleCheckboxChange(item.name, value)}
                    label={t(item.label)}
                  />
                ))}
              </div>
            </div>
            <div>
              <PanelHeader title={t('settings-title-3')} desc={t('settings-desc-3')} />
              <MPRadioGroup
                className="app-settings__control"
                aria-label="renderer"
                name="preferredRendererCheck"
                value={preferredRendererCheck}
                onValueChange={(value) => handleRadioChange('preferredRendererCheck', value)}
              >
                <MPRadio value="auto" label={t('menu:renderer-auto')} />
                <MPRadio value="wgpu-webgl" label={t('menu:renderer-wgpu-webgl')} />
                <MPRadio value="webgl" label={t('menu:renderer-webgl')} />
                <MPRadio value="canvas" label={t('menu:renderer-canvas')} />
                <MPRadio value="webgpu" label={t('menu:renderer-webgpu')} />
              </MPRadioGroup>
            </div>
            <div>
              <PanelHeader title={t('settings-title-4')} desc={t('settings-desc-4')} />
              <MPRadioGroup
                className="app-settings__control"
                orientation="horizontal"
                aria-label="quality"
                name="qualityCheck"
                value={qualityCheck}
                onValueChange={(value) => handleRadioChange('qualityCheck', value)}
              >
                <MPRadio value="low" label={t('menu:quality-low')} />
                <MPRadio value="medium" label={t('menu:quality-medium')} />
                <MPRadio value="high" label={t('menu:quality-high')} />
                <MPRadio value="best" label={t('menu:quality-best')} />
              </MPRadioGroup>
            </div>
            <div>
              <PanelHeader title={t('settings-title-5')} desc={t('settings-desc-5')} />
              <MPRadioGroup
                className="app-settings__control"
                orientation="horizontal"
                aria-label="player runtime"
                name="playerRuntimeCheck"
                value={playerRuntimeCheck}
                onValueChange={(value) => handleRadioChange('playerRuntimeCheck', value)}
              >
                <MPRadio value="flashPlayer" label="Adobe Flash Player" />
                <MPRadio value="air" label="Adobe AIR" />
              </MPRadioGroup>
            </div>
            <div>
              <PanelHeader title={t('settings-other-title')} desc={t('settings-other-desc')} />
              <div className="app-settings__control">
                <MPButton
                  color="primary"
                  variant="filled"
                  onClick={() => handleOpenLocalStorageViewModal()}
                >
                  {t('menu:manage-data')}
                </MPButton>
                <ModalLocalStorageView />
              </div>
            </div>
            <div>
              <PanelHeader title={t('settings-reset-title')} desc={t('settings-reset-desc')} />
              <div className="app-settings__control">
                <MPButton variant="filled" color="secondary" onClick={handleReset}>
                  {t('menu:reset-and-restart')}
                </MPButton>
              </div>
            </div>
          </div>
        </MPCard>
      </div>
    </Layout>
  );
}
