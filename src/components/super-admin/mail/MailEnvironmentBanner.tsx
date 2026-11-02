import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const TEST_SERVER_STYLE = { background: Color.KIO_ORANGE_FAINT, color: Color.KIO_ORANGE_DARK };
const TEST_SERVER_DESCRIPTION = '시험용이에요. 허용된 주소로만 메일이 나가요.';

// VITE_ENVIRONMENT는 API 주소와 같은 설정 파일에서 정해져 화면이 붙은 서버와 항상 같다
function getEnvironmentBanner(environment: string) {
  return match(environment)
    .with('production', () => ({
      label: '운영 서버',
      description: '보내면 실제 사장님께 메일이 가요.',
      background: Color.LIGHT_RED,
      color: Color.RED,
    }))
    .with('dev', () => ({ label: '개발 서버', description: TEST_SERVER_DESCRIPTION, ...TEST_SERVER_STYLE }))
    .with('local', () => ({ label: '로컬 서버', description: TEST_SERVER_DESCRIPTION, ...TEST_SERVER_STYLE }))
    .otherwise(() => ({
      label: '서버 확인 안 됨',
      description: '어느 서버인지 확인하지 못했어요. 보내기 전에 주소창을 확인해 주세요.',
      background: Color.LIGHT_GREY,
      color: Color.GREY,
    }));
}

const Banner = styled.div<{ background: string; textColor: string }>`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ background }) => background};
  color: ${({ textColor }) => textColor};
  font-size: 13px;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Label = styled.b`
  font-weight: 700;
`;

function MailEnvironmentBanner() {
  const { label, description, background, color } = getEnvironmentBanner(import.meta.env.VITE_ENVIRONMENT);

  return (
    <Banner role="status" background={background} textColor={color}>
      <Label>{label}</Label>
      <span>{description}</span>
    </Banner>
  );
}

export default MailEnvironmentBanner;
