import styled from '@emotion/styled';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { ManageMenuGroup } from '@constants/data/superAdminMenu';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import ManageMenuCard from './ManageMenuCard';

const Section = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

const GroupTitle = styled.h2`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;

  ${mobileMediaQuery} {
    gap: 8px;
  }
`;

interface ManageMenuGroupSectionProps {
  group: ManageMenuGroup;
}

function ManageMenuGroupSection({ group }: ManageMenuGroupSectionProps) {
  const { navigateWithPage } = useCustomNavigate();
  return (
    <Section>
      <GroupTitle>{group.title}</GroupTitle>
      <Grid>
        {group.items.map((item) => (
          <ManageMenuCard key={item.route} item={item} onClick={() => navigateWithPage(item.route)} />
        ))}
      </Grid>
    </Section>
  );
}

export default ManageMenuGroupSection;
