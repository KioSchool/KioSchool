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

export const Field = styled.label`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

export const FieldHeader = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

export const FieldLabel = styled.span`
  color: #464a4d;
  font-size: 16px;
  font-weight: 700;
`;

export const CharacterCount = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 18px;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  box-sizing: border-box;
  color: #25282b;
  font-family: inherit;
  font-size: 15px;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 52px;
  padding: 0 48px 0 18px;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  box-sizing: border-box;
  appearance: none;
  background-color: ${Color.WHITE};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7684' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 20px;
  color: #25282b;
  font-family: inherit;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 16px 18px;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  box-sizing: border-box;
  color: #25282b;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    border-color: ${Color.KIO_ORANGE};
    outline: none;
  }
`;

export const PrivacyLabel = styled.label`
  padding: 16px;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
  color: #464a4d;
  font-size: 13px;
  line-height: 1.6;
  cursor: pointer;
  gap: 10px;
  ${rowFlex({ align: 'flex-start' })};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  flex-shrink: 0;
  accent-color: ${Color.KIO_ORANGE};
`;

export const ErrorText = styled.p`
  margin: -8px 0 0;
  color: ${Color.RED};
  font-size: 13px;
  line-height: 1.5;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 12px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${Color.KIO_ORANGE_DARK};
  }

  &:disabled {
    background: ${Color.HEAVY_GREY};
    cursor: not-allowed;
  }
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

export const NewInquiryButton = styled.button`
  margin-top: 10px;
  padding: 12px 24px;
  border: 1px solid ${Color.KIO_ORANGE};
  border-radius: 10px;
  background: ${Color.WHITE};
  color: ${Color.KIO_ORANGE};
  font-weight: 700;
  cursor: pointer;
`;
