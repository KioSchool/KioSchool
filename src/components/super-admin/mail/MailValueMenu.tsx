import styled from '@emotion/styled';
import { MAIL_TEMPLATE_VALUE_GROUPS } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  gap: 10px;
`;

const Group = styled.div`
  min-width: 0;
  gap: 6px;
  ${colFlex()}
`;

const GroupTitle = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
  font-weight: 600;
`;

const Values = styled.div`
  gap: 4px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const ValueButton = styled.button`
  padding: 3px 8px;
  border: none;
  border-radius: 10px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

interface MailValueMenuProps {
  onSelect: (value: string) => void;
}

function MailValueMenu({ onSelect }: MailValueMenuProps) {
  return (
    <Grid>
      {MAIL_TEMPLATE_VALUE_GROUPS.map((group) => (
        <Group key={group.label}>
          <GroupTitle>{group.label}</GroupTitle>
          <Values>
            {group.values.map((value) => (
              <ValueButton key={value} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onSelect(value)}>
                {value}
              </ValueButton>
            ))}
          </Values>
        </Group>
      ))}
    </Grid>
  );
}

export default MailValueMenu;
