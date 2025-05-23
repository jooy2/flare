/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from 'react-i18next';

import { userSelectNone } from '@/renderer/utils/styles';

export default function ModalConfirm({
  open = false,
  noCancel = false,
  onOk,
  onCancel,
  onClose,
  content,
}: {
  open?: boolean;
  noCancel?: boolean;
  onOk: () => void;
  onCancel: () => void;
  onClose: () => void;
  content: string;
}) {
  const [t] = useTranslation(['common', 'notice', 'menu']);

  const handleDialogClose = () => {
    onClose();
  };

  return (
    <Dialog
      css={userSelectNone}
      open={open}
      onClose={handleDialogClose}
      disableEscapeKeyDown
      aria-labelledby="alert-title"
      aria-describedby="alert-desc"
    >
      <DialogContent>
        <DialogContentText id="alert-desc">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!noCancel && <Button onClick={onCancel}>{t('menu:cancel')}</Button>}
        <Button variant="contained" color="primary" onClick={onOk}>
          {t('menu:ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
