import { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import AppImageInput from '@components/common/input/AppImageInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  gap: 24px;
  ${rowFlex({ align: 'center' })}
`;

const Guide = styled.div`
  gap: 6px;
  ${colFlex()}
`;

const GuideTitle = styled.strong`
  font-size: 15px;
  color: ${Color.TEXT_STRONG};
`;

const GuideDescription = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${Color.TEXT_BODY};
`;

const GuideMeta = styled.span`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

interface ProductImageFieldProps {
  url?: string;
  file?: File | null;
  description: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ProductImageField({ url, file, description, onImageChange }: ProductImageFieldProps) {
  return (
    <Container>
      <AppImageInput title="대표 이미지" url={url} file={file} onImageChange={onImageChange} width={180} height={180} />
      <Guide>
        <GuideTitle>주문 화면에 표시되는 이미지입니다.</GuideTitle>
        <GuideDescription>{description}</GuideDescription>
        <GuideMeta>정사각형 이미지 권장 · JPG, PNG · 최대 5MB</GuideMeta>
      </Guide>
    </Container>
  );
}

export default ProductImageField;
