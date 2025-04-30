import NewAppInput from '@components/common/input/NewAppInput';

const meta = {
  title: 'Components/Common/Input/NewAppInput',
  component: NewAppInput,
  argTypes: {
    enterHandler: { control: 'function' },
    width: { control: 'number' },
    height: { control: 'number' },
    label: { control: 'text' },
    buttonProps: {
      control: 'object',
      description: '버튼 속성 (buttonText는 필수)',
    },
    linkProps: {
      control: 'object',
      description: '링크 속성 (linkText, linkUrl 필수)',
    },
  },
};

export default meta;

export const Basic = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithLabel = {
  args: {
    placeholder: '이름을 입력하세요',
    label: '사용자 이름',
    width: 500,
  },
};

export const WithButton = {
  args: {
    placeholder: '검색어를 입력하세요',
    width: 500,
    enterHandler: () => alert('검색 버튼 클릭!'),
    buttonProps: {
      buttonText: '검색',
    },
  },
};

export const WithLink = {
  args: {
    placeholder: '웹사이트 주소를 입력하세요',
    width: 500,
    linkProps: {
      linkText: '예시 링크 보기',
      linkUrl: 'https://kio-school.com/',
    },
  },
};

export const WithLabelAndButton = {
  args: {
    placeholder: '이메일을 입력하세요',
    label: '이메일 주소',
    width: 600,
    enterHandler: () => alert('확인 버튼 클릭!'),
    buttonProps: {
      buttonText: '확인',
    },
  },
};

export const WithLabelAndLink = {
  args: {
    placeholder: 'GitHub 레포지토리 URL 입력',
    label: '소스 코드 URL',
    width: 600,
    linkProps: {
      linkText: 'GitHub 가이드',
      linkUrl: 'https://github.com/KioSchool/KioSchool',
    },
  },
};

export const WithButtonAndLink = {
  args: {
    placeholder: '유튜브 동영상 URL 입력',
    width: 600,
    enterHandler: () => alert('동영상 추가'),
    buttonProps: {
      buttonText: '추가',
    },
    linkProps: {
      linkText: '유효한 URL 형식',
      linkUrl: 'https://kio-school.com/',
    },
  },
};

export const WithAll = {
  args: {
    placeholder: 'API 키를 입력하세요',
    label: 'OpenAI API 키',
    width: 700,
    enterHandler: () => alert('API 키 저장'),
    buttonProps: {
      buttonText: '저장',
    },
    linkProps: {
      linkText: 'API 키 발급 방법',
      linkUrl: 'https://kio-school.com/',
    },
  },
};

export const WithCustomButtonSize = {
  args: {
    placeholder: '커스텀 버튼 사이즈 예시',
    width: 600,
    enterHandler: () => alert('커스텀 사이즈 버튼 클릭!'),
    buttonProps: {
      buttonText: '커스텀 버튼',
      size: { width: 150, height: 35 },
    },
  },
};

export const SmallInput = {
  args: {
    placeholder: '코드 입력',
    width: 200,
    height: 40,
    enterHandler: () => alert('코드 확인'),
    buttonProps: {
      buttonText: '확인',
    },
  },
};

export const LargeInput = {
  args: {
    placeholder: '상세 설명을 입력하세요',
    width: 800,
    height: 60,
    label: '상세 설명',
  },
};

export const PasswordInput = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    label: '비밀번호',
    width: 500,
    enterHandler: () => alert('비밀번호 제출'),
    buttonProps: {
      buttonText: '제출',
    },
  },
};

export const ReadOnlyInput = {
  args: {
    value: '읽기 전용 텍스트입니다',
    readOnly: true,
    width: 500,
    label: '읽기 전용',
  },
};

export const DisabledInput = {
  args: {
    placeholder: '이 필드는 비활성화되어 있습니다',
    disabled: true,
    width: 500,
    label: '비활성화됨',
  },
};

export const ErrorInput = {
  args: {
    placeholder: '이메일을 입력하세요',
    width: 500,
    label: '이메일 주소',
    className: 'error',
    linkProps: {
      linkText: '올바른 이메일 형식이 아닙니다',
      linkUrl: 'https://kio-school.com/',
    },
  },
};
