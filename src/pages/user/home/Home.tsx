import { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { RiPlayFill } from '@remixicon/react';
import HomeMobile from './HomeMobile';
import HomePC from './HomePC';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import youtubeThumbnail from '@resources/image/home/youtubeThumbnail.png';

const YOUTUBE_TOAST_COOKIE = 'youtube_toast_hidden';
const YOUTUBE_TOAST_ID = 'youtube-guide-toast';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=4tZjnj48hBk';

const ToastContent = styled.div`
  gap: 15px;
  padding: 8px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }

  &:hover::after {
    height: 100%;
  }

  &:hover .play-button {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  z-index: 1;
  ${colFlex({ justify: 'center', align: 'center' })};

  svg {
    color: white;
  }
`;

const VideoTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  background-color: #f5f5f5;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function Home() {
  const [cookies, setCookie] = useCookies([YOUTUBE_TOAST_COOKIE]);

  useEffect(() => {
    if (!cookies[YOUTUBE_TOAST_COOKIE]) {
      toast(
        <ToastContent>
          <VideoTitle>키오스쿨 가이드 영상을 확인해보세요!</VideoTitle>
          <ThumbnailContainer
            onClick={() => {
              window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
              toast.dismiss(YOUTUBE_TOAST_ID);
            }}
          >
            <ThumbnailImage src={youtubeThumbnail} alt="YouTube 썸네일" />
            <PlayButton>
              <RiPlayFill size={24} />
            </PlayButton>
          </ThumbnailContainer>
          <Button
            onClick={() => {
              const oneWeekLater = new Date();
              oneWeekLater.setDate(oneWeekLater.getDate() + 7);
              setCookie(YOUTUBE_TOAST_COOKIE, 'true', { expires: oneWeekLater });
              toast.dismiss(YOUTUBE_TOAST_ID);
            }}
          >
            일주일간 보지 않기
          </Button>
        </ToastContent>,
        {
          toastId: YOUTUBE_TOAST_ID,
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          draggable: true,
          closeButton: true,
        },
      );
    }

    return () => {
      toast.dismiss(YOUTUBE_TOAST_ID);
    };
  }, [cookies, setCookie]);

  return isMobile && !isTablet ? <HomeMobile /> : <HomePC />;
}

export default Home;
