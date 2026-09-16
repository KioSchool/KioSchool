import { useState } from 'react';
import { RiDownload2Line } from '@remixicon/react';
import styled from '@emotion/styled';
import { AcquisitionSurveyResponse } from '@@types/acquisitionSurvey';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ACQUISITION_CONTEXT_KEYS, ACQUISITION_CONTEXT_KEY_LABEL, parseAcquisitionContext } from '@utils/acquisitionContext';
import { exportToCsv } from '@utils/csv';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';

const CSV_HEADERS = ['응답일시', '이메일', '학교', '유입 경로', '기타 직접 입력', ...ACQUISITION_CONTEXT_KEYS.map((key) => ACQUISITION_CONTEXT_KEY_LABEL[key])];
const CSV_FILE_NAME = '유입경로_설문응답.csv';
const SKIPPED_LABEL = '건너뜀';

const Button = styled.button`
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${Color.WHITE};
  background: ${Color.KIO_ORANGE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${Color.KIO_ORANGE_DARK};
  }

  &:disabled {
    background: ${Color.HEAVY_GREY};
    cursor: not-allowed;
  }
`;

interface SurveyCsvDownloadButtonProps {
  disabled: boolean;
  fetchAllResponses: () => Promise<AcquisitionSurveyResponse[] | null>;
}

function SurveyCsvDownloadButton({ disabled, fetchAllResponses }: SurveyCsvDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const responses = await fetchAllResponses();
    setIsDownloading(false);
    if (!responses) return;

    const rows = responses.map((response) => {
      const context = parseAcquisitionContext(response.context);
      return [
        formatNullableKoreanDateTime(response.answeredAt),
        response.userEmail,
        response.schoolName,
        response.channelLabel ?? SKIPPED_LABEL,
        response.channelEtc ?? '',
        ...ACQUISITION_CONTEXT_KEYS.map((key) => context[key] ?? ''),
      ];
    });
    exportToCsv(CSV_FILE_NAME, CSV_HEADERS, rows);
  };

  return (
    <Button type="button" onClick={handleDownload} disabled={disabled || isDownloading}>
      <RiDownload2Line size={16} />
      CSV 다운로드
    </Button>
  );
}

export default SurveyCsvDownloadButton;
