import React from 'react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import AppLabel from '@components/common/label/AppLabel';
import InstagramSvg from '@resources/svg/InstagramSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import AppFooter from '@components/common/footer/AppFooter';
import { tabletMediaQuery } from '@styles/globalStyles';
import { isMobile } from 'react-device-detect';

const Container = styled.div`
  width: 100%;
  height: 365px;
  gap: 60px;
  background: ${Color.KIO_ORANGE};
  ${colFlex({ align: 'center' })};
  ${tabletMediaQuery} {
    height: 230px;
  }
`;

const SubContainer = styled.div`
  width: 1120px;
  gap: 30px;
  ${colFlex()};
  ${tabletMediaQuery} {
    width: 320px;
    ${rowFlex({ align: 'end', justify: 'space-between' })};
  }
`;

const ContentContainer = styled.div`
  padding-top: 70px;
  gap: 5px;
  ${colFlex()};
`;

const BadgeContainer = styled.div`
  gap: 10px;
  ${rowFlex()};
`;

const InstagramBadge = styled(InstagramSvg)`
  ${expandButtonStyle};
  ${tabletMediaQuery} {
    width: 44px;
    height: 44px;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  ${rowFlex({ align: 'center' })};
`;

function InfoFooter() {
  const handleInstagramClick = () => {
    const instagramUrl = 'https://www.instagram.com/kioschool/';

    window.open(instagramUrl, '_blank');
  };

  const pcContentSizes = {
    logoSize: 40,
    descriptionSize: 20,
  };
  const mobileContentSizes = {
    logoSize: 20,
    descriptionSize: 15,
  };
  const contentSizes = isMobile ? mobileContentSizes : pcContentSizes;

  return (
    <Container>
      <SubContainer>
        <ContentContainer>
          <AppLabel color={Color.WHITE} size={contentSizes.logoSize} style={{ fontWeight: 700 }}>
            KIOSCHOOL
          </AppLabel>
          <AppLabel color={Color.WHITE} size={contentSizes.descriptionSize} style={{ fontWeight: 700 }}>
            스마트한 주점 운영의 시작
          </AppLabel>
        </ContentContainer>
        <BadgeContainer>
          <InstagramBadge onClick={handleInstagramClick} />
        </BadgeContainer>
      </SubContainer>
      <FooterContent>
        <AppFooter fixed={false} color={Color.WHITE} />
      </FooterContent>
    </Container>
  );
}

export default InfoFooter;
