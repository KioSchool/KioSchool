import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { PrivacyPolicySection } from '@constants/data/privacyPolicy';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import PrivacyPolicyTable from './PrivacyPolicyTable';

const Section = styled.section`
  width: 100%;
  gap: 14px;
  ${colFlex()};
`;

const Title = styled.h2`
  margin: 0;
  color: #191f28;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;

  ${mobileMediaQuery} {
    font-size: 18px;
  }
`;

const Paragraph = styled.p`
  margin: 0;
  color: #4e5968;
  font-size: 15px;
  line-height: 1.75;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #4e5968;
  font-size: 15px;
  line-height: 1.75;

  li + li {
    margin-top: 6px;
  }
`;

interface PrivacyPolicySectionContentProps {
  section: PrivacyPolicySection;
}

function PrivacyPolicySectionContent({ section }: PrivacyPolicySectionContentProps) {
  return (
    <Section>
      <Title>{section.title}</Title>
      {section.blocks.map((block, index) =>
        match(block)
          .with({ type: 'paragraph' }, ({ text }) => <Paragraph key={index}>{text}</Paragraph>)
          .with({ type: 'list' }, ({ items }) => (
            <List key={index}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          ))
          .with({ type: 'table' }, ({ headers, rows }) => <PrivacyPolicyTable key={index} headers={headers} rows={rows} />)
          .exhaustive(),
      )}
    </Section>
  );
}

export default PrivacyPolicySectionContent;
