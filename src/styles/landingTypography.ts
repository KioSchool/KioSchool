import { css } from '@emotion/react';
import { Color } from '@resources/colors';
import { mobileMediaQuery } from './globalStyles';

/**
 * 랜딩/서비스 소개 페이지 타이포그래피 토큰.
 *
 * 4단 계층:
 * - 제목 (heading): 섹션 h2
 * - 서브타이틀 (subheading): 제목 아래 보조 문구
 * - 본문 (body): 단락
 * - 캡션 (caption): 작은 라벨, 부가 설명
 *
 * 특별 변형:
 * - displayHeading: Hero h1 대형 제목
 * - eyebrowLabel: 섹션 상단 오렌지 라벨 ("OUR VISION", "CASE STUDIES" 등)
 */

export const displayHeadingTypography = css`
  font-size: 64px;
  font-weight: 800;
  color: #3c3530;
  letter-spacing: -0.04em;
  line-height: 1.3;

  ${mobileMediaQuery} {
    font-size: 36px;
  }
`;

export const headingTypography = css`
  font-size: 36px;
  font-weight: 700;
  color: #191f28;
  letter-spacing: -0.02em;
  line-height: 1.35;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

export const subheadingTypography = css`
  font-size: 18px;
  font-weight: 400;
  color: #6b7684;
  letter-spacing: -0.01em;
  line-height: 1.6;

  ${mobileMediaQuery} {
    font-size: 15px;
  }
`;

export const bodyTypography = css`
  font-size: 15px;
  font-weight: 400;
  color: #6b7684;
  line-height: 1.7;
`;

export const captionTypography = css`
  font-size: 13px;
  font-weight: 500;
  color: #8b95a1;
  line-height: 1.5;
`;

export const eyebrowTypography = css`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE};
  letter-spacing: 0.04em;
`;
