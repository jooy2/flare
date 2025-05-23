/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Replay from '@mui/icons-material/Replay';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useTranslation } from 'react-i18next';
import ModalConfirm from '@/renderer/components/dialogs/ModalConfirm';

export default function FlashPlayer({
  url = '',
  autoplay = true,
  filePath = '',
  header = true,
}: {
  url?: string;
  autoplay?: boolean;
  filePath?: string;
  header?: boolean;
}) {
  const [t] = useTranslation(['menu']);
  const navigate = useNavigate();
  const player: any = useRef(null);
  const [rufflePlayer, setRufflePlayer]: any = useState(null);
  const [openFailedToLoadServerModal, setOpenFailedToLoadServerModal] = useState(false);
  const dispatch = useDispatch();
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const [currentFileName, setCurrentFileName] = useState('');
  const [currentFileDirectory, setCurrentFileDirectory] = useState('');

  const handlePauseOrPlay = () => {
    if (!rufflePlayer) {
      return;
    }

    if (rufflePlayer.isPlaying) {
      rufflePlayer.pause();
    } else {
      rufflePlayer.play();
    }
  };

  const handleMute = () => {
    if (stateAppScreen.flashVolume === 0) {
      rufflePlayer.volume = 1;
      dispatch(setConfig({ flashVolume: 100 }));
    } else {
      rufflePlayer.volume = 0;
      dispatch(setConfig({ flashVolume: 0 }));
    }
  };

  const handleVolumeSliderChange = (event, newValue) => {
    rufflePlayer.volume = newValue / 100;
    dispatch(setConfig({ flashVolume: newValue }));
  };

  const handleBack = () => {
    navigate('/explorer');
  };

  const loadFlash = () => {
    window.mainApi.startStaticServer(currentFileDirectory).then((port) => {
      if (!port) {
        setOpenFailedToLoadServerModal(true);
        return;
      }

      rufflePlayer.ruffle().load({
        url: `http://localhost:${port}/${currentFileName}`,
        autoplay,
        base: currentFileDirectory,
        allowScriptAccess: true,
        letterbox: stateAppScreen.appConfigLetterbox ? 'on' : 'off',
        contextMenu: stateAppScreen.appConfigHideContext ? 'off' : 'on',
        logLevel: 'error',
        openUrlMode: 'confirm',
        preferredRenderer:
          stateAppScreen.appConfigPreferredRenderer === 'auto'
            ? null
            : stateAppScreen.appConfigPreferredRenderer,
        quality: stateAppScreen.appConfigQuality,
        playerRuntime: stateAppScreen.appConfigPlayerRuntime,
        warnOnUnsupportedContent: false,
        playerVersion:
          stateAppScreen.appConfigEmulatePlayerVersion === 0
            ? null
            : stateAppScreen.appConfigEmulatePlayerVersion,
      });
      rufflePlayer.addEventListener('oncontextmenu', (e) => e.preventDefault());
    });
  };

  const getFileName = async () => {
    const fileName = await window.mainApi.getFileNameFromPath(
      filePath.replace('file:///', ''),
      true,
    );
    const dirName = await window.mainApi.getDirnameFromPath(filePath);

    setCurrentFileName(fileName);
    setCurrentFileDirectory(dirName);
  };

  useEffect(() => {
    getFileName().then(() => {
      const ruffle = window.RufflePlayer.newest();
      setRufflePlayer(ruffle.createPlayer());
    });
  }, [url, filePath]);

  useEffect((): any => {
    const container = player.current;
    container.innerHTML = '';

    window.RufflePlayer = window.RufflePlayer || {};
    window.RufflePlayer.config = {
      polyfills: false,
      showSwfDownload: false,
      splashScreen: false,
    };

    if (!rufflePlayer) {
      return;
    }

    rufflePlayer.id = 'player';
    rufflePlayer.addEventListener('loadedmetadata', () => {
      const metaData = rufflePlayer?.metadata;
      dispatch(
        setConfig({
          flashFileSwfVer: metaData?.swfVersion,
          flashFileFrame: metaData?.numFrames,
          flashFileAs3: metaData?.isActionScript3,
          flashFileWidth: metaData?.width,
          flashFileHeight: metaData?.height,
          flashFileBackgroundColor: metaData?.backgroundColor,
          flashFileFrameRate: metaData?.frameRate,
        }),
      );
      if (stateAppScreen.appConfigAdjustOriginalSize && metaData?.width && metaData?.height) {
        window.mainApi.send('resizeWindow', {
          width: metaData.width,
          height: metaData.height,
        });
      }
    });

    container.appendChild(rufflePlayer);
    loadFlash();
  }, [url, filePath, stateAppScreen.appConfigEmulatePlayerVersion, rufflePlayer]);

  return (
    <>
      <div
        css={css`
          height: ${header ? 'calc(100vh - 40px)' : '100vh'};
        `}
      >
        <div
          id="main"
          css={css`
            align-items: stretch;
            width: 100%;
            height: calc(100% - ${stateAppScreen.appConfigShowPlayerController ? 42 : 0}px);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000000;
            color: white;
            #player {
              width: 100%;
              height: 100%;
              display: block;
            }
            #container {
              margin: 10px;
              width: 100%;
              height: 100%;
              align-self: center;
            }
          `}
          ref={player}
          onContextMenu={(e) => e.preventDefault()}
        />
        {stateAppScreen.appConfigShowPlayerController && (
          <Grid
            container
            alignItems="center"
            css={css`
              height: 42px;
            `}
          >
            <Grid size={12}>
              <Grid container alignItems="center">
                <Grid>
                  <IconButton
                    color="primary"
                    size="small"
                    aria-label="player-pause-and-play"
                    onClick={handlePauseOrPlay}
                  >
                    {rufflePlayer?.isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </Grid>
                <Grid>
                  <Tooltip title={t('replay')}>
                    <IconButton
                      size="small"
                      aria-label="player-replay"
                      component="span"
                      onClick={loadFlash}
                    >
                      <Replay />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <IconButton size="small" aria-label="player-mute" onClick={handleMute}>
                      {stateAppScreen.flashVolume === 0 ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                    <Slider
                      value={stateAppScreen.flashVolume}
                      defaultValue={100}
                      onChange={handleVolumeSliderChange}
                      valueLabelDisplay="off"
                      aria-labelledby="player-volume"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <ModalConfirm
        noCancel
        content={t('notice:failed-to-load-server')}
        open={openFailedToLoadServerModal}
        onCancel={() => null}
        onClose={handleBack}
        onOk={handleBack}
      />
    </>
  );
}
