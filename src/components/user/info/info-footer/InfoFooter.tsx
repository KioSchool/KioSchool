import React from 'react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import AppLabel from '@components/common/label/AppLabel';
import { RiInstagramLine, RiNotionLine } from '@remixicon/react';
import AppFooter from '@components/common/footer/AppFooter';
import { tabletMediaQuery } from '@styles/globalStyles';
import { isMobile } from 'react-device-detect';
import { css } from '@emotion/react';
import { expandButtonStyle } from '@styles/buttonStyles';

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

const BadgeStyle = css`
  width: 40px;
  height: 40px;
  color: ${Color.WHITE};
  padding: 8px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.2);
  ${tabletMediaQuery} {
    width: 25px;
    height: 25px;
  }
`;

const InstagramBadge = styled(RiInstagramLine)`
  ${expandButtonStyle};
  ${BadgeStyle};
`;

const NotionBadge = styled(RiNotionLine)`
  ${expandButtonStyle};
  ${BadgeStyle};
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

  const handleNotionClick = () => {
    const notionUrl = 'https://ji-in.notion.site/FAQ-09eb07eac4a34ab4aa883727994e0b08?pvs=4';

    window.open(notionUrl, '_blank');
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
          <NotionBadge onClick={handleNotionClick} />
        </BadgeContainer>
      </SubContainer>
      <FooterContent>
        <AppFooter fixed={false} color={Color.WHITE} />
      </FooterContent>
    </Container>
  );
}

export default InfoFooter;
