import React from 'react';
import { isMobile } from 'react-device-detect';
import HomeMobile from './HomeMobile';
import HomePC from './HomePC';

function Home() {
  return isMobile ? <HomeMobile /> : <HomePC />;
}

export default Home;
