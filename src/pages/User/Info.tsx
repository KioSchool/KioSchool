import KioSchoolInfo from '@components/user/info/KioSchoolInfo';
import styled from '@emotion/styled';
import infoImage1 from '@resources/image/myInfoImage1.png';
import infoImage2 from '@resources/image/myInfoImage2.png';
import infoImage3 from '@resources/image/myInfoImage3.png';
import infoImage4 from '@resources/image/myInfoImage4.png';
import infoImage5 from '@resources/image/myInfoImage5.png';
import infoImage6 from '@resources/image/myInfoImage6.png';
import AppFooter from '@components/common/footer/AppFooter';
import NavBar from '@components/common/nav/NavBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const InfoContainer = styled.div`
  width: 100%;
  gap: 30px;
  ${colFlex({ align: 'center' })}
`;

const TitleContainer = styled.div`
  padding-top: 70px;
  width: 70%;
  min-width: 1000px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Label = styled.div`
  font-size: 50px;
  font-weight: 800;
`;

const LinkButton = styled.button`
  width: 200px;
  background: ${Color.kioOrange};
  color: ${Color.WHITE};
  font-size: 23px;
  font-weight: 800;
  border: none;
  border-radius: 50px;
  height: 50px;
  padding: 0 18px;
  user-select: none;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
  &:hover {
    background: #ff7b2b;
  }
`;

const LinkTextContainer = styled.div`
  width: 100%;
  height: 300px;
  gap: 30px;
  ${colFlex({ align: 'center', justify: 'center' })}
`;

const OrderedListContainer = styled.ol`
  line-height: 35px;
`;

function Info() {
  const faqUrl = 'https://www.notion.so/ji-in/FAQ-09eb07eac4a34ab4aa883727994e0b08';

  return (
    <InfoContainer>
      <NavBar />
      <TitleContainer>
        <Label>키오스쿨 사용 설명서</Label>
        <LinkButton onClick={() => window.open(faqUrl)}>F&Q 바로가기</LinkButton>
      </TitleContainer>
      <KioSchoolInfo
        mainDescription="마이페이지 > 계좌관리"
        subDescription="1. 먼저 로그인 후 계좌 등록을 해야 운영할 워크스페이스를 생성할 수 있습니다."
        imageSrc={infoImage1}
        imageWidth="1050px"
        imageHeight="500px"
      />
      <KioSchoolInfo
        mainDescription="주점 > 상품 관리 > 카테고리 관리"
        subDescription="2. 상품을 등록할 카테고리를 먼저 생성해줍니다."
        imageSrc={infoImage2}
        imageWidth="1050px"
        imageHeight="600px"
      />
      <KioSchoolInfo
        mainDescription="주점 > 상품 관리"
        subDescription="3. 메뉴를 등록하고 나면 하단의 버튼을 통해 상품의 노출여부를 조절할 수 있습니다."
        imageSrc={infoImage3}
        imageWidth="1050px"
        imageHeight="370px"
      />
      <KioSchoolInfo
        mainDescription="주점 > 주문 페이지 관리"
        subDescription="4. 주문 페이지 관리에서 고객화면을 모니터링 할 수 있고, 각 테이블의 주문 QR도 확인할 수 있습니다."
        imageSrc={infoImage4}
        imageWidth="1050px"
        imageHeight="600px"
      />
      <KioSchoolInfo
        mainDescription="주점 > 실시간 주문 조회"
        subDescription="5. 실시간 주문 조회에서는 최근 2시간 이내에 접수된 주문에 대해 보여줍니다."
        additionalDescription={
          <OrderedListContainer>
            <li> {'결제 대기: 고객이 주문 완료 후 결제 확인을 기다리는 주문입니다.'}</li>
            <li>
              {'결제완료: 결제 완료가 확인된 주문이며, 아직 모든 메뉴의 서빙이 완료되지 않은 주문입니다.'}
              <br />
              {'이때, 서빙이 완료되지 않은 메뉴들은 하단 현황판에 표시됩니다.'}
            </li>
            <li> {'서빙완료: 모든 메뉴가 서빙 완료된 주문 건 입니다.'}</li>
          </OrderedListContainer>
        }
        imageSrc={infoImage5}
        imageWidth="1050px"
        imageHeight="700px"
      />
      <KioSchoolInfo
        mainDescription="주점 > 전체 주문 조회"
        subDescription="6. 전체 주문 조회에서는 설정 기간 내 모든 주문과 총 금액을 확인할 수 있습니다."
        imageSrc={infoImage6}
        imageWidth="1050px"
        imageHeight="600px"
      />
      <LinkTextContainer>
        <Label>더 자세한 내용이 궁금하다면?</Label>
        <LinkButton onClick={() => window.open(faqUrl)}>F&Q 바로가기</LinkButton>
      </LinkTextContainer>
      <AppFooter fixed={false} />
    </InfoContainer>
  );
}

export default Info;
