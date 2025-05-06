import { Meta, StoryObj } from '@storybook/react';
import LinkLabel from './LinkLabel';

const meta: Meta<typeof LinkLabel> = {
  title: 'Common/Label/LinkLabel',
  component: LinkLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: '링크에 표시될 텍스트',
      control: 'text',
    },
    href: {
      description: '클릭 시 이동할 URL',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkLabel>;

export const Default: Story = {
  args: {
    text: '링크 텍스트',
    href: 'https://kio-school.com',
  },
};

export const LongText: Story = {
  args: {
    text: '이것은 긴 텍스트 링크입니다. 링크 스타일이 어떻게 보이는지 확인하는 예시입니다.',
    href: 'https://kio-school.com',
  },
};

export const ExternalLink: Story = {
  args: {
    text: '외부 사이트로 이동',
    href: 'https://google.com',
  },
};
