import { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import HomeMobile from './HomeMobile';
import HomePC from './HomePC';
import KioSchoolGuideYoutubeContent, { KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE } from '@components/user/home/KioSchoolGuideYoutubeContent';

const YOUTUBE_TOAST_ID = 'youtube-guide-toast';

function Home() {
  const [cookies] = useCookies([KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]);

  useEffect(() => {
    if (!cookies[KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]) {
      toast(<KioSchoolGuideYoutubeContent onDismiss={() => toast.dismiss(YOUTUBE_TOAST_ID)} />, {
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
