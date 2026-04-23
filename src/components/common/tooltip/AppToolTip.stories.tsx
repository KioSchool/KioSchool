import type { Meta, StoryObj } from '@storybook/react';
import AppTooltip from './AppToolTip';
import { RiInformation2Line } from '@remixicon/react';

const meta: Meta<typeof AppTooltip> = {
  title: 'Common/Tooltip/AppTooltip',
  component: AppTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 팝업 내부에 표시될 텍스트입니다.',
    },
    children: {
      control: 'text',
      description: '툴팁을 활성화시킬 트리거 요소 (예: 아이콘, 버튼 등)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: '50px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '토스(Toss) 계정 정보 툴팁입니다.',
    children: <RiInformation2Line />,
  },
  parameters: {
    docs: {
      description: {
        story:
          '아이콘(`RiInformationFill` 등)을 `children`으로 전달하는 기본 사용법입니다. Storybook 환경의 의존성 문제를 피하기 위해 Mock 아이콘으로 대체했습니다.',
      },
    },
  },
};

export const OnButton: Story = {
  args: {
    content: '버튼에 대한 도움말입니다.',
    children: (
      <button
        style={{
          padding: '8px 16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
          cursor: 'pointer',
        }}
      >
        여기에 마우스를 올리세요
      </button>
    ),
  },
};

export const LongContentWarning: Story = {
  args: {
    content: '이 텍스트는 매우 길기 때문에, 28px 높이 제한으로 인해 잘릴 수 있습니다.',
    children: <RiInformation2Line />,
  },
  parameters: {
    docs: {
      description: {
        story: '`PopupContainer` 스타일의 `height: 28px` 고정값 때문에 긴 텍스트가 잘리는 것을 보여줍니다.',
      },
    },
  },
};
