import React from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import HomeMobile from './HomeMobile';
import HomePC from './HomePC';

function Home() {
  return isMobile && !isTablet ? <HomeMobile /> : <HomePC />;
}

export default Home;
