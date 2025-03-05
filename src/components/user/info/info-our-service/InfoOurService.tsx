import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoTitle from '@components/user/info/InfoTitle';
import { lineSeedKrFont } from '@styles/fonts';
import InfoServiceCard from '@components/user/info/info-our-service/InfoServiceCard';
import InfoRealTimeOrderSvg from '@resources/svg/InfoRealTimeOrderSvg';
import InfoAllOrderSvg from '@resources/svg/InfoAllOrderSvg';
import InfoTableOrderSvg from '@resources/svg/InfoTableOrderSvg';
import InfoProductSvg from '@resources/svg/InfoProductSvg';
import InfoProductCategorySvg from '@resources/svg/InfoProductCategorySvg';
import InfoWorkspaceInfoSvg from '@resources/svg/InfoWorkspaceInfoSvg';
import InfoWorkspaceTableSvg from '@resources/svg/InfoWorkspaceTableSvg';
import { tabletMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })};
`;

const SubContainer = styled.div`
  width: 1120px;
  padding-top: 120px;
  padding-bottom: 120px;
  ${colFlex({ align: 'center' })};
  ${tabletMediaQuery} {
    width: 320px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  gap: 80px;
  padding-top: 30px;
  ${colFlex({ align: 'center' })};
`;

const Description = styled.div`
  width: 1000px;
  font-size: 18px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  text-align: center;
  ${lineSeedKrFont}
  ${tabletMediaQuery} {
    width: 300px;
    font-size: 12px;
  }
`;

const ServiceContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 37px 34px;
  ${tabletMediaQuery} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function InfoOurService() {
  return (
    <Container>
      <SubContainer>
        <InfoTitle text={'Our services'} />
        <ContentContainer>
          <Description>
            키오스쿨은 주점 운영을 더 스마트하고 효율적으로 돕기 위한 종합 관리 시스템입니다. 주문 관리부터 상품, 카테고리, 주점 정보까지 모두 간편하게 관리할
            수 있으며, 테이블별로 주문 현황을 조회하고, 상품과 정보를 자유롭게 수정하는 등 모든 관리 기능을 직관적으로 제공합니다.
          </Description>
          <ServiceContainer>
            <InfoServiceCard
              svg={<InfoRealTimeOrderSvg />}
              title={'실시간 주문 조회'}
              description={'최근 24시간 내의 모든 주문을 실시간으로 확인할 수 있습니다.'}
            />
            <InfoServiceCard svg={<InfoAllOrderSvg />} title={'전체 주문 조회'} description={'해당 주점에 대한 모든 주문 내역을 한눈에 확인할 수 있습니다.'} />
            <InfoServiceCard svg={<InfoTableOrderSvg />} title={'테이블 주문 조회'} description={'각 테이블별로 주문 현황을 세분화하여 볼 수 있습니다.'} />
            <InfoServiceCard svg={<InfoProductSvg />} title={'상품 관리'} description={'상품을 추가하고, 상품의 표시 여부를 관리할 수 있습니다.'} />
            <InfoServiceCard
              svg={<InfoProductCategorySvg />}
              title={'카테고리 관리'}
              description={'상품을 적절한 카테고리로 분류하고, 카테고리를 추가하거나 삭제할 수 있습니다.'}
            />
            <InfoServiceCard
              svg={<InfoWorkspaceInfoSvg />}
              title={'주점 정보 관리'}
              description={'주점의 대표 사진, 설명 등 기본 정보를 등록하고 수정할 수 있습니다.'}
            />
            <InfoServiceCard
              svg={<InfoWorkspaceTableSvg />}
              title={'테이블 관리'}
              description={'테이블 수를 조정하고, 각 테이블에 해당하는 QR 코드도 관리할 수 있습니다.'}
            />
          </ServiceContainer>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default InfoOurService;
