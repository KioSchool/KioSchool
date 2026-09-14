import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ACQUISITION_CONTEXT_KEYS, ACQUISITION_CONTEXT_KEY_LABEL, parseAcquisitionContext } from '@utils/acquisitionContext';

const TagList = styled.div`
  width: 100%;
  gap: 6px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Tag = styled.span`
  max-width: 100%;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: ${Color.BLACK};
  background: ${Color.LIGHT_GREY};
  word-break: break-all;
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const TagKey = styled.span`
  color: ${Color.GREY};
  flex-shrink: 0;
`;

interface SurveyContextTagsProps {
  context: string;
}

function SurveyContextTags({ context }: SurveyContextTagsProps) {
  const parsed = parseAcquisitionContext(context);
  const entries = ACQUISITION_CONTEXT_KEYS.filter((key) => parsed[key]);

  return (
    <TagList title={context}>
      {entries.map((key) => (
        <Tag key={key}>
          <TagKey>{ACQUISITION_CONTEXT_KEY_LABEL[key]}</TagKey>
          {parsed[key]}
        </Tag>
      ))}
    </TagList>
  );
}

export default SurveyContextTags;
