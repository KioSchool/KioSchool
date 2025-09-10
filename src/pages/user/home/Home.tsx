import { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import HomeMobile from './HomeMobile';
import HomePC from './HomePC';
import { YoutubeGuideToast, YOUTUBE_TOAST_COOKIE } from '@components/user/home/YoutubeGuideToast';

const YOUTUBE_TOAST_ID = 'youtube-guide-toast';

function Home() {
  const [cookies] = useCookies([YOUTUBE_TOAST_COOKIE]);

  useEffect(() => {
    if (!cookies[YOUTUBE_TOAST_COOKIE]) {
      toast(<YoutubeGuideToast onDismiss={() => toast.dismiss(YOUTUBE_TOAST_ID)} />, {
        toastId: YOUTUBE_TOAST_ID,
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: true,
        closeButton: true,
      });
    }

    return () => {
      toast.dismiss(YOUTUBE_TOAST_ID);
    };
  }, [cookies]);

  return isMobile && !isTablet ? <HomeMobile /> : <HomePC />;
}

export default Home;
