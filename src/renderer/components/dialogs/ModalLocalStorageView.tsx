import { useDispatch, useSelector } from 'react-redux';
import { MPButton, MPDialog, MPTextField } from 'material-plus-ui';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import { useMemo, useState } from 'react';
import ModalConfirm from '@/renderer/components/dialogs/ModalConfirm';

export default function ModalLocalStorageView() {
  const [t] = useTranslation(['common', 'notice', 'menu']);
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const [data, setData] = useState(JSON.stringify(localStorage));
  const [error, setError] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const i18LngValue = useMemo(
    () => localStorage.getItem('i18nextLng') || 'en',
    [stateAppScreen.appConfigLanguage],
  );

  const handleDialogClose = () => {
    setData(JSON.stringify(localStorage));
    setError(false);
    dispatch(setConfig({ dialogLocalStorageViewOpen: false }));
  };

  const handleTextChange = (value: string) => {
    setError(false);
    setData(value);
  };

  const handleSave = async () => {
    setError(false);

    if (data.length < 1) {
      setError(true);
      return;
    }

    try {
      JSON.parse(data, (key, value) => {
        if (key !== 'i18nextLng' && key.length > 0 && value.length > 0) {
          localStorage.setItem(key, value.toString());
        }
      });
      handleDialogClose();
    } catch {
      setError(true);
    }
  };

  const handleOpenConfirm = (value) => {
    setOpenConfirm(value);
  };

  const handleReset = async () => {
    localStorage.clear();
    localStorage.setItem('i18nextLng', i18LngValue);
    setData(JSON.stringify(localStorage));
    handleOpenConfirm(false);
    handleDialogClose();
  };

  return (
    <>
      <MPDialog
        open={stateAppScreen.dialogLocalStorageViewOpen}
        dismissible={false}
        showClose={false}
        onOpenChange={(next) => {
          if (!next) handleDialogClose();
        }}
        title={t('menu:manage-data')}
        description={t('notice:localstorage-desc')}
        actions={
          <>
            <MPButton
              variant="text"
              color="error"
              onClick={() => handleOpenConfirm(true)}
              disabled={error}
            >
              {t('menu:reset-localstorage')}
            </MPButton>
            <MPButton variant="filled" color="primary" onClick={handleSave} disabled={error}>
              {t('menu:save')}
            </MPButton>
            <MPButton variant="text" color="secondary" onClick={handleDialogClose}>
              {t('menu:close')}
            </MPButton>
          </>
        }
      >
        <MPTextField
          fullWidth
          rows={9}
          value={data}
          onChange={handleTextChange}
          type="text"
          label="LocalStorageData"
          errorMessage={error ? (t('notice:invalid-localstorage') as string) : undefined}
        />
      </MPDialog>
      <ModalConfirm
        content={t('notice:confirm')}
        open={openConfirm}
        onClose={() => handleOpenConfirm(false)}
        onCancel={() => handleOpenConfirm(false)}
        onOk={handleReset}
      />
    </>
  );
}
