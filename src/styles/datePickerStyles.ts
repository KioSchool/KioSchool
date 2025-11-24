import { css } from '@emotion/react';
import { rowFlex } from './flexStyles';

export const datePickerStyles = css`
  /* DatePicker 기본 스타일 */
  .react-datepicker {
    border: none;
    font-family: 'LINE Seed Sans KR', sans-serif;
    width: 100%;
    display: block;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  /* DatePicker 헤더 */
  .react-datepicker__header {
    background: #fff;
    border-bottom: none;
    padding-top: 10px;
  }

  /* 요일 헤더 */
  .react-datepicker__day-names {
    width: 100%;
    margin-top: 10px;
    ${rowFlex()}
  }

  /* 요일 이름 (월, 화, 수...) */
  .react-datepicker__day-name {
    flex: 1;
    color: #d1d5d8;
    line-height: 20px;
    margin: 0;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 400;
    ${rowFlex({ justify: 'center', align: 'center' })}
  }

  .react-datepicker__month {
    margin: 0;
  }

  /* 주 단위 행 */
  .react-datepicker__week {
    display: flex;
    width: 100%;
  }

  /* 날짜 셀 기본 스타일 */
  .react-datepicker__day {
    flex: 1;
    margin: 0;
    height: 36px;
    color: #464a4d;
    font-size: 12px;
    position: relative;
    z-index: 1;
    ${rowFlex({ justify: 'center', align: 'center' })}

    &:hover {
      border-radius: 0;
      background-color: transparent !important;
      color: #fff !important;
    }

    /* 호버 시 원형 배경 */
    &:hover::before {
      content: '';
      position: absolute;
      width: 34px;
      height: 34px;
      background-color: rgb(255, 200, 160);
      border-radius: 50%;
      z-index: -1;
    }
  }

  /* 기본 react-datepicker 배경색 초기화 */
  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--selecting-range-start {
    background-color: transparent !important;
    color: inherit !important;
  }

  /* 범위 내 날짜 텍스트 색상 */
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    color: #464a4d !important;
  }

  /* 선택된 날짜/시작일/종료일 텍스트 색상 */
  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--selecting-range-start {
    color: #fff !important;
  }

  /* 선택 원형 배경 (시작일, 종료일, 단일 선택) */
  .react-datepicker__day--selected::before,
  .react-datepicker__day--range-start::before,
  .react-datepicker__day--range-end::before,
  .react-datepicker__day--selecting-range-start::before {
    content: '';
    position: absolute;
    width: 34px;
    height: 34px;
    background-color: #ff9142;
    border-radius: 50%;
    z-index: -1;
  }

  /* 범위 배경 스트립 (시작일, 종료일, 중간 날짜) */
  .react-datepicker__day--range-start::after,
  .react-datepicker__day--range-end::after,
  .react-datepicker__day--in-range::after,
  .react-datepicker__day--in-selecting-range::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 145, 66, 0.2);
    z-index: -2;
  }

  /* 중간 날짜들의 전체 너비 스트립 */
  .react-datepicker__day--in-range::after,
  .react-datepicker__day--in-selecting-range::after {
    left: 0;
    right: 0;
    width: 100%;
  }

  /* 시작일: 오른쪽 절반만 스트립 채움 */
  .react-datepicker__day--range-start:not(.react-datepicker__day--range-end)::after,
  .react-datepicker__day--selecting-range-start:not(.react-datepicker__day--range-end)::after {
    left: 50%;
    right: 0;
    width: 50%;
  }

  /* 종료일: 왼쪽 절반만 스트립 채움 */
  .react-datepicker__day--range-end:not(.react-datepicker__day--range-start)::after,
  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--selecting-range-start):hover::after {
    left: 0;
    right: 50%;
    width: 50%;
  }

  /* 단일 날짜 범위 (시작일 = 종료일): 스트립 숨김 */
  .react-datepicker__day--range-start.react-datepicker__day--range-end::after {
    display: none;
  }

  /* 다른 월의 날짜 */
  .react-datepicker__day--outside-month {
    color: #d1d5d8 !important;
  }

  /* 다른 월의 범위 내 날짜 텍스트 색상 */
  .react-datepicker__day--outside-month.react-datepicker__day--in-range,
  .react-datepicker__day--outside-month.react-datepicker__day--in-selecting-range {
    color: #464a4d !important;
  }

  /* 다른 월의 선택된 날짜/시작일/종료일 텍스트 색상 */
  .react-datepicker__day--outside-month.react-datepicker__day--selected,
  .react-datepicker__day--outside-month.react-datepicker__day--range-start,
  .react-datepicker__day--outside-month.react-datepicker__day--range-end,
  .react-datepicker__day--outside-month.react-datepicker__day--selecting-range-start {
    color: #fff !important;
  }

  /* 키보드로 선택된 날짜 */
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: #464a4d;
  }
`;
