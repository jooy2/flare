/** @jsxImportSource @emotion/react */
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import BarChart from '@mui/icons-material/BarChart';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Settings from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import ModalMetadata from '@/renderer/components/dialogs/ModalMetadata';
import { buttonGroupButtonBase, marginRightXs } from '@/renderer/utils/styles';
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

  const handleFlashEmulatePlayerVersionChange = (event) => {
    dispatch(setConfig({ appConfigEmulatePlayerVersion: event.target.value }));
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      css={css`
        user-select: none;
        background: ${stateAppScreen.isDarkTheme ? '#2c2c2c' : '#ffffff'};
      `}
    >
      <Toolbar variant="dense">
        {withBackButton && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleGoHome}
            edge="start"
            css={css`
              margin-right: 5px;
            `}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography
          css={css`
            flex-grow: 1;
          `}
          variant="body1"
          noWrap
        >
          {title}
        </Typography>
        <ButtonGroup variant="text" disableRipple disableElevation>
          {location.pathname === '/player' && (
            <>
              {stateAppScreen.appConfigShowPlayerVersionSelect && (
                <Select
                  size="small"
                  fullWidth
                  value={stateAppScreen.appConfigEmulatePlayerVersion}
                  onChange={handleFlashEmulatePlayerVersionChange}
                  inputProps={{
                    name: 'playerVersion',
                    id: 'player-version',
                  }}
                >
                  {arrWithNumber(0, 32).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value === 0 ? 'Auto' : value}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Button
                css={[buttonGroupButtonBase]}
                color="inherit"
                onClick={() => handleOpenMetadata()}
              >
                <BarChart fontSize="small" />
              </Button>
            </>
          )}
          {!withBackButton && (
            <>
              <Button
                css={[marginRightXs, buttonGroupButtonBase]}
                color="inherit"
                aria-label="open"
                onClick={() => handleGoToLink('/about')}
              >
                <HelpOutline fontSize="small" />
              </Button>
              <Button
                css={[buttonGroupButtonBase]}
                color="inherit"
                aria-label="open"
                onClick={() => handleGoToLink('/settings')}
              >
                <Settings fontSize="small" />
              </Button>
            </>
          )}
        </ButtonGroup>
        <ModalMetadata />
      </Toolbar>
    </AppBar>
  );
}
