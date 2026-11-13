import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { STORY_ACCOUNTS } from '@components/admin/account/storyAccounts';
import AccountCards from './AccountCards';

const Container = styled.div`
  width: 1000px;
  padding: 40px;
`;

const meta: Meta<typeof AccountCards> = {
  title: 'admin/account/AccountCards',
  component: AccountCards,
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
type Story = StoryObj<typeof AccountCards>;

export const AllOn: Story = { args: { account: STORY_ACCOUNTS.ALL_ON } };
export const BothOff: Story = { args: { account: STORY_ACCOUNTS.BOTH_OFF } };
export const OldTossQrOnly: Story = { args: { account: STORY_ACCOUNTS.OLD_TOSS_QR_ONLY } };
export const NoAccount: Story = { args: { account: null } };
