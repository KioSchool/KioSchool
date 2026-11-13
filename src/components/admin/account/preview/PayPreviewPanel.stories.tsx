import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { STORY_ACCOUNTS } from '@components/admin/account/storyAccounts';
import PayPreviewPanel from './PayPreviewPanel';

const Container = styled.div`
  width: 1000px;
  padding: 40px;
`;

const meta: Meta<typeof PayPreviewPanel> = {
  title: 'admin/account/PayPreviewPanel',
  component: PayPreviewPanel,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Container>
          <Story />
        </Container>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PayPreviewPanel>;

export const AllOn: Story = { args: { account: STORY_ACCOUNTS.ALL_ON } };
export const BothOff: Story = { args: { account: STORY_ACCOUNTS.BOTH_OFF } };
export const NoAccount: Story = { args: { account: null } };
