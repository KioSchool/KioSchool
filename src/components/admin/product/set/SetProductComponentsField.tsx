import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';

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

const AddButton = styled.button`
  align-self: flex-start;
  flex-shrink: 0;
  padding: 8px 12px;
  border: 1px solid ${Color.KIO_ORANGE};
  border-radius: 999px;
  background: ${Color.WHITE};
  font-size: 13px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  cursor: pointer;
  gap: 4px;
  ${rowFlex({ align: 'center' })}

  &:hover {
    background: ${Color.KIO_ORANGE_FAINT};
  }
`;

const Table = styled.div`
  overflow: hidden;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 14px;
  ${colFlex()}
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 112px minmax(0, 1.1fr) 32px;
  gap: 12px;
  padding: 12px 14px;
  background: ${Color.LIGHT_GREY};
  font-size: 11px;
  font-weight: 700;
  color: ${Color.TEXT_SUBTLE};
`;

const ComponentList = styled.div`
  ${colFlex()}
`;

const Notice = styled.div`
  margin: 0 14px 14px;
  padding: 11px 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 12px;
  line-height: 1.5;
  color: ${Color.TEXT_DEFAULT};
`;

interface SetProductComponentsFieldProps {
  components: SetProductComponentFormValue[];
  products: AdminProduct[];
  onAdd: () => void;
  onChange: (index: number, component: SetProductComponentFormValue) => void;
  onDelete: (index: number) => void;
}

function SetProductComponentsField({ components, products, onAdd, onChange, onDelete }: SetProductComponentsFieldProps) {
  return (
    <Section>
      <Header>
        <Heading>
          <Title>제공 구성</Title>
          <Description>실제로 내주는 구성품을 입력하고, 품절 상태를 따라갈 일반 메뉴를 연결해주세요.</Description>
        </Heading>
      </Header>

      <Table>
        <TableHeader>
          <span>구성품</span>
          <span>수량</span>
          <span>연결 메뉴</span>
          <span />
        </TableHeader>
        <ComponentList>
          {components.map((component, index) => (
            <SetProductComponentRow
              key={component.key}
              component={component}
              products={products}
              canDelete={components.length > 1}
              onChange={(nextComponent) => onChange(index, nextComponent)}
              onDelete={() => onDelete(index)}
            />
          ))}
        </ComponentList>
        <Notice>연결 메뉴가 품절되면 세트도 자동으로 품절됩니다. 연결하지 않은 구성품은 세트 판매 상태에 영향을 주지 않습니다.</Notice>
      </Table>

      <AddButton type="button" onClick={onAdd}>
        <RiAddLine size={16} />
        구성 추가
      </AddButton>
    </Section>
  );
}

export default SetProductComponentsField;
