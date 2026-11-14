import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';

import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct } from '@@types/index';
import { SetProductComponentFormValue } from '@@types/setProduct';

import SetProductComponentRow from './SetProductComponentRow';

const Section = styled.section`
  width: 100%;
  gap: 14px;
  ${colFlex()}
`;

const Header = styled.div`
  gap: 16px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const Heading = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${Color.MUTED_GREY};
`;

const ComponentList = styled.div`
  gap: 10px;
  ${colFlex()}
`;

const Notice = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: ${Color.BLUE_FAINT};
  font-size: 12px;
  line-height: 1.5;
  color: ${Color.TEXT_BODY};
`;

interface SetProductComponentsFieldProps {
  components: SetProductComponentFormValue[];
  products: AdminProduct[];
  onAdd: () => void;
  onChange: (index: number, component: SetProductComponentFormValue) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onDelete: (index: number) => void;
}

function SetProductComponentsField({ components, products, onAdd, onChange, onMove, onDelete }: SetProductComponentsFieldProps) {
  return (
    <Section>
      <Header>
        <Heading>
          <Title>제공 구성</Title>
          <Description>실제로 내주는 구성품을 입력하고, 품절 상태를 따라갈 일반 메뉴를 연결해주세요.</Description>
        </Heading>
        <NewCommonButton type="button" size="xs" icon={<RiAddLine size={16} />} onClick={onAdd}>
          구성품 추가
        </NewCommonButton>
      </Header>

      <Notice>연결 상품이 품절되면 세트도 자동으로 품절됩니다. 연결하지 않은 구성품은 운영자가 직접 판매 상태를 관리합니다.</Notice>

      <ComponentList>
        {components.map((component, index) => (
          <SetProductComponentRow
            key={component.key}
            component={component}
            products={products}
            canMoveUp={index > 0}
            canMoveDown={index < components.length - 1}
            canDelete={components.length > 1}
            onChange={(nextComponent) => onChange(index, nextComponent)}
            onMoveUp={() => onMove(index, -1)}
            onMoveDown={() => onMove(index, 1)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </ComponentList>
    </Section>
  );
}

export default SetProductComponentsField;
