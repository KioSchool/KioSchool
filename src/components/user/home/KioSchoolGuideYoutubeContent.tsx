import { useCookies } from 'react-cookie';
import { RiPlayFill } from '@remixicon/react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import youtubeThumbnail from '@resources/image/home/youtubeThumbnail.png';

const KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE = 'kioschool_guide_youtube_toast_hidden';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=4tZjnj48hBk';
const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

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

interface KioSchoolGuideYoutubeContentProps {
  onDismiss: () => void;
}

function KioSchoolGuideYoutubeContent({ onDismiss }: KioSchoolGuideYoutubeContentProps) {
  const [, setCookie] = useCookies([KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]);

  const handleVideoClick = () => {
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
    onDismiss();
  };

  const handleDismissClick = () => {
    setCookie(KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE, 'true', { maxAge: ONE_WEEK_IN_SECONDS });
    onDismiss();
  };

  return (
    <ToastContent>
      <VideoTitle>키오스쿨 가이드 영상을 확인해보세요!</VideoTitle>
      <ThumbnailContainer onClick={handleVideoClick}>
        <ThumbnailImage src={youtubeThumbnail} alt="키오스쿨 가이드 영상 썸네일" />
        <PlayButton>
          <RiPlayFill size={24} />
        </PlayButton>
      </ThumbnailContainer>
      <Button onClick={handleDismissClick}>일주일간 보지 않기</Button>
    </ToastContent>
  );
}

export { KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE };
export default KioSchoolGuideYoutubeContent;
