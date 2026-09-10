import { useDispatch, useSelector } from 'react-redux';
import { MPButton, MPDataList, MPDataListItem, MPDialog } from 'material-plus-ui';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';

export default function ModalMetadata() {
  const [t] = useTranslation(['common', 'notice', 'menu']);
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setConfig({ dialogMetadataOpen: false }));
  };

  return (
    <MPDialog
      open={stateAppScreen.dialogMetadataOpen}
      dismissible={false}
      showClose={false}
      onOpenChange={(next) => {
        if (!next) handleDialogClose();
      }}
      actions={
        <MPButton variant="text" color="primary" onClick={handleDialogClose}>
          {t('menu:close')}
        </MPButton>
      }
    >
      <MPDataList className="app-metadata" orientation="horizontal" labelWidth={180} dividers>
        {[
          { name: 'SWF Version', value: stateAppScreen.flashFileSwfVer },
          { name: 'Total Frame', value: stateAppScreen.flashFileFrame },
          { name: 'SWF Frame Rate', value: stateAppScreen.flashFileFrameRate },
          { name: 'SWF Width', value: stateAppScreen.flashFileWidth },
          { name: 'SWF Height', value: stateAppScreen.flashFileHeight },
          { name: 'SWF Background Color', value: stateAppScreen.flashFileBackgroundColor },
        ].map((row) => (
          <MPDataListItem key={row.name} label={row.name}>
            {row.value}
          </MPDataListItem>
        ))}
      </MPDataList>
    </MPDialog>
  );
}
