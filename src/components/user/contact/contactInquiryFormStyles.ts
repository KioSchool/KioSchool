import styled from '@emotion/styled';
import { RiCheckboxCircleLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

export const Form = styled.form`
  width: 100%;
  padding: 36px;
  border: 1px solid #e5e8eb;
  border-radius: 24px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  gap: 24px;
  ${colFlex()};

  ${mobileMediaQuery} {
    padding: 24px 20px;
    border-radius: 18px;
  }
`;

export const Field = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

export const FieldLabel = styled.label`
  color: #464a4d;
  font-size: 16px;
  font-weight: 700;
`;

export const CharacterCountRow = styled.div`
  width: 100%;
  min-height: 18px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })};
`;

export const CharacterCount = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

export const ErrorText = styled.p`
  margin: -8px 0 0;
  color: ${Color.RED};
  font-size: 13px;
  line-height: 1.5;
`;

export const ButtonRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

export const PrivacyContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
`;

export const SuccessCard = styled.div`
  width: 100%;
  padding: 48px 32px;
  border: 1px solid #d4f1e1;
  border-radius: 24px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  text-align: center;
  gap: 14px;
  ${colFlex({ align: 'center' })};
`;

export const SuccessIcon = styled(RiCheckboxCircleLine)`
  color: ${Color.GREEN};
`;

export const SuccessTitle = styled.h2`
  margin: 0;
  color: #25282b;
  font-size: 24px;
`;

export const SuccessDescription = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 15px;
  line-height: 1.7;
`;
