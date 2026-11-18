import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import PointList from '@components/user/landing/PointList';
import ProductShot from '@components/user/landing/ProductShot';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import products from '@resources/image/landing/products.webp';
import workspaceEdit from '@resources/image/landing/workspace-edit.webp';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';

const PRODUCTS_RATIO = 2320 / 940;
const WORKSPACE_EDIT_RATIO = 2040 / 1460;

const MENU_POINTS = [
  { title: '메뉴 사진·가격·카테고리', description: '음식과 음료처럼 카테고리를 나누면 손님 메뉴판에도 같은 구분이 적용됩니다.' },
  { title: '품절은 버튼 한 번', description: '재고가 소진된 메뉴를 품절로 바꾸면 손님 화면에도 바로 반영됩니다.' },
  { title: '대표 사진·소개·공지', description: '주점 사진과 소개, 송금 안내 같은 공지를 메뉴판 상단에 보여 줄 수 있습니다.' },
];

const Layout = styled.div`
  gap: 64px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    gap: 32px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Text = styled.div`
  width: 420px;
  flex: none;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Visual = styled(motion.div)`
  position: relative;
  flex: 1;
  height: 560px;

  ${mobileMediaQuery} {
    height: auto;
    padding-bottom: 120px;
  }
`;

const ProductsShot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${mobileMediaQuery} {
    position: static;
  }
`;

const WorkspaceEditShot = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 430px;
  max-width: 70%;
`;

const Tip = styled.div`
  margin-top: 32px;
  padding: 20px 24px;
  border-radius: 12px;
  background: ${LandingColor.SURFACE};
  font-size: 16px;
  line-height: 1.5;
  color: ${LandingColor.SUB_TEXT};
`;

const TipLabel = styled.b`
  margin-right: 10px;
  color: ${LandingColor.TEXT};
`;

function InfoMenuSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.MENU} tone="white">
      <LandingInner>
        <Layout>
          <Text>
            <SectionHeading eyebrow="메뉴와 주점" titleLines={['메뉴와 주점 소개는', '직접 꾸며요']} />
            <PointList points={MENU_POINTS} layout="vertical" />
          </Text>
          <Visual
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <ProductsShot>
              <ProductShot src={products} alt="상품 관리 화면" ratio={PRODUCTS_RATIO} />
            </ProductsShot>
            <WorkspaceEditShot>
              <ProductShot src={workspaceEdit} alt="주점 정보 수정 화면" ratio={WORKSPACE_EDIT_RATIO} />
            </WorkspaceEditShot>
          </Visual>
        </Layout>
        <RevealOnScroll>
          <Tip>
            <TipLabel>활용 예시</TipLabel>
            직원 호출이나 물 요청을 0원 메뉴로 등록해 사용하는 주점도 있습니다.
          </Tip>
        </RevealOnScroll>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoMenuSection;
