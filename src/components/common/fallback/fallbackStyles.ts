import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery, tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

export const FallbackContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 80px 24px;
  box-sizing: border-box;
  background: #faf9f7;
  ${colFlex({ justify: 'center', align: 'center' })};

  ${tabletMediaQuery} {
    padding: 72px 24px;
  }

  ${mobileMediaQuery} {
    padding: 56px 20px;
  }
`;

export const FallbackIconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    width: 64px;
    height: 64px;
  }
`;

export const FallbackTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${Color.BLACK};
  margin-top: 28px;
  text-align: center;

  ${tabletMediaQuery} {
    font-size: 21px;
  }

  ${mobileMediaQuery} {
    font-size: 20px;
    margin-top: 24px;
  }
`;

export const FallbackDescription = styled.p`
  font-size: 15px;
  color: ${Color.GREY};
  margin-top: 12px;
  text-align: center;
  line-height: 1.6;
  word-break: keep-all;

  ${tabletMediaQuery} {
    font-size: 14px;
  }

  ${mobileMediaQuery} {
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const FallbackActionRow = styled.div`
  margin-top: 36px;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    width: 100%;
    max-width: 320px;
    margin-top: 32px;
    flex-wrap: wrap;
  }
`;

export const PrimaryFallbackButton = styled.button`
  padding: 14px 24px;
  gap: 6px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${tabletMediaQuery} {
    padding: 13px 22px;
    font-size: 14px;
  }

  ${mobileMediaQuery} {
    min-width: 132px;
    padding: 12px 18px;
    font-size: 13px;
  }

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }

  &:disabled {
    background: ${Color.HEAVY_GREY};
    cursor: not-allowed;
  }
`;

export const PrimaryFallbackLink = styled(Link)`
  padding: 14px 32px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 15px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s ease;

  ${tabletMediaQuery} {
    padding: 13px 28px;
    font-size: 14px;
  }

  ${mobileMediaQuery} {
    min-width: 132px;
    padding: 12px 18px;
    font-size: 13px;
    text-align: center;
  }

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }
`;

export const SecondaryFallbackButton = styled(PrimaryFallbackButton)`
  background: ${Color.WHITE};
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};

  &:hover {
    background: ${Color.LIGHT_GREY};
    color: ${Color.BLACK};
  }

  &:active {
    background: ${Color.HEAVY_GREY};
  }
`;

export const FallbackContactText = styled.p`
  font-size: 13px;
  color: ${Color.GREY};
  margin-top: 18px;
  text-align: center;

  ${mobileMediaQuery} {
    font-size: 12px;
    margin-top: 16px;
  }
`;

export const FallbackContactLink = styled.a`
  color: ${Color.KIO_ORANGE};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
