import NewAppTextarea from '@components/common/input/NewAppTextarea';

const meta = {
  title: 'Components/Common/Input/NewAppTextarea',
  component: NewAppTextarea,
  argTypes: {
    enterHandler: { control: 'function' },
    width: { control: 'number' },
    height: { control: 'number' },
    label: { control: 'text' },
    buttonProps: {
      control: 'object',
      description: '버튼 속성 (text는 필수)',
    },
    linkProps: {
      control: 'object',
      description: '링크 속성 (text, url 필수)',
    },
  },
};

export default meta;

export const Basic = {
  args: {
    placeholder: '상세 내용을 입력하세요',
  },
};

export const WithLabel = {
  args: {
    placeholder: '자기소개를 입력하세요',
    label: '자기소개',
    width: 500,
    height: 150,
  },
};

export const WithButton = {
  args: {
    placeholder: '메시지를 입력하세요 (Enter로 전송)',
    width: 500,
    height: 100,
    enterHandler: () => alert('메시지 전송!'),
    buttonProps: {
      text: '전송',
    },
  },
};

export const WithLink = {
  args: {
    placeholder: '참고 문헌을 입력하세요',
    width: 500,
    linkProps: {
      text: '작성 가이드 보기',
      url: 'https://kio-school.com/',
    },
  },
};

export const WithLabelAndButton = {
  args: {
    placeholder: '문의 내용을 상세히 적어주세요',
    label: '1:1 문의',
    width: 600,
    height: 200,
    enterHandler: () => alert('문의 등록 완료!'),
    buttonProps: {
      text: '등록',
    },
  },
};

export const WithAll = {
  args: {
    placeholder: '프롬프트를 입력하세요',
    label: 'AI 프롬프트',
    width: 700,
    height: 180,
    enterHandler: () => alert('프롬프트 실행'),
    buttonProps: {
      text: '실행',
    },
    linkProps: {
      text: '프롬프트 작성 팁',
      url: 'https://kio-school.com/',
    },
  },
};

export const DefaultValue = {
  args: {
    defaultValue: '기존에 작성된 내용이 있습니다.\n여러 줄도\n표시됩니다.',
    width: 600,
    label: '수정 모드',
  },
};

export const ReadOnlyTextarea = {
  args: {
    value: '이 내용은 읽기 전용입니다.\n수정할 수 없습니다.',
    readOnly: true,
    width: 500,
    height: 100,
    label: '공지사항',
  },
};

export const DisabledTextarea = {
  args: {
    placeholder: '입력이 비활성화되었습니다.',
    disabled: true,
    width: 500,
    label: '비활성화',
  },
};
