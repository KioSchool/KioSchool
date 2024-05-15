import AccountInfo from '@components/admin/info/AccountInfo';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import infoImage1 from '../../resources/image/myInfoImage1.png';
import infoImage2 from '../../resources/image/myInfoImage2.png';
import infoImage3 from '../../resources/image/myInfoImage3.png';
import infoImage4 from '../../resources/image/myInfoImage4.png';
import infoImage5 from '../../resources/image/myInfoImage5.png';
import infoImage6 from '../../resources/image/myInfoImage6.png';

const ContentContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  justify-direction: column;
`;

function Info() {
  return (
    <AppContainer justifyValue={'center'} alignItems={'center'} fullWidth={true} useNavBackground={true}>
      <ContentContainer>
        <AccountInfo
          mainDescription="마이페이지 > 계좌관리"
          subDescription="1. 먼저 로그인 후 계좌 등록을 해야 운영할 워크스페이스를 생성할 수 있습니다."
          imageSrc={infoImage1}
          imageWidth="1050px"
          imageHeight="500px"
        />
        <AccountInfo
          mainDescription="주점 > 상품 관리 > 카테고리 관리"
          subDescription="2. 상품을 등록할 카테고리를 먼저 생성해줍니다."
          imageSrc={infoImage2}
          imageWidth="1050px"
          imageHeight="600px"
        />
        <AccountInfo
          mainDescription="주점 > 상품 관리"
          subDescription="3. 메뉴를 등록하고 나면 하단의 버튼을 통해 상품의 공개여부를 조절할 수 있습니다."
          imageSrc={infoImage3}
          imageWidth="1050px"
          imageHeight="370px"
        />
        <AccountInfo
          mainDescription="주점 > 주문 페이지 관리"
          subDescription="4. 주문 페이지 관리에서 고객화면을 모니터링 할 수 있고, 각 테이블의 주문 QR도 확인할 수 있습니다."
          imageSrc={infoImage4}
          imageWidth="1050px"
          imageHeight="600px"
        />
        <AccountInfo
          mainDescription="주점 > 실시간 주문 조회"
          subDescription="5. 실시간 주문 조회에서는 최근 12시간 이내에 접수된 주문에 대해 보여줍니다."
          additionalDescription={
            <>
              {'1) 결제 대기: 고객이 주문 완료 후 결제 확인을 기다리는 주문입니다.'}
              <br />
              <br />
              {'2) 결제완료: 결제 완료가 확인된 주문이며, 아직 모든 메뉴의 서빙이 완료되지 않은 주문입니다.'}
              <br />
              {'이때, 서빙이 완료되지 않은 메뉴들은 하단 현황판에 표시됩니다.'}
              <br />
              <br />
              {'3) 서빙완료: 모든 메뉴가 서빙 완료된 주문 건 입니다.'}
            </>
          }
          imageSrc={infoImage5}
          imageWidth="1050px"
          imageHeight="700px"
        />
        <AccountInfo
          mainDescription="주점 > 전체 주문 조회"
          subDescription="6. 전체 주문 조회에서는 설정 기간 내 모든 주문과 총 금액을 확인할 수 있습니다."
          imageSrc={infoImage6}
          imageWidth="1050px"
          imageHeight="600px"
        />
        <h1>더 자세한 내용이 궁금하다면?</h1>
      </ContentContainer>
    </AppContainer>
  );
}

export default Info;
