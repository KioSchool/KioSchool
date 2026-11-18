import styled from '@emotion/styled';
import PointList, { LandingPoint } from '@components/user/landing/PointList';
import ProductShot from '@components/user/landing/ProductShot';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, LandingTone } from '@styles/landingStyles';

const Visual = styled.div`
  margin-top: 64px;

  ${mobileMediaQuery} {
    margin-top: 40px;
  }
`;

interface InfoScreenSectionProps {
  id: string;
  tone: LandingTone;
  eyebrow: string;
  titleLines: string[];
  lead: string;
  image: string;
  imageAlt: string;
  imageRatio: number;
  points: LandingPoint[];
}

function InfoScreenSection({ id, tone, eyebrow, titleLines, lead, image, imageAlt, imageRatio, points }: InfoScreenSectionProps) {
  return (
    <LandingSection id={id} tone={tone}>
      <LandingInner>
        <SectionHeading eyebrow={eyebrow} titleLines={titleLines} lead={lead} />
        <Visual>
          <RevealOnScroll offsetY={24} delay={0.1}>
            <ProductShot src={image} alt={imageAlt} ratio={imageRatio} />
          </RevealOnScroll>
        </Visual>
        <PointList points={points} />
      </LandingInner>
    </LandingSection>
  );
}

export default InfoScreenSection;
