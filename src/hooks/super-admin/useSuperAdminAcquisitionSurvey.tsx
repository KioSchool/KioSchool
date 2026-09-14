import { useCallback } from 'react';
import { AcquisitionSurveyResponse, AcquisitionSurveySummary } from '@@types/acquisitionSurvey';
import { PaginationResponse } from '@@types/index';
import { AcquisitionChannel } from '@utils/acquisitionChannel';
import useApi from '@hooks/useApi';

function useSuperAdminAcquisitionSurvey() {
  const { superAdminApi } = useApi();

  const fetchSummary = useCallback((): Promise<AcquisitionSurveySummary | null> => {
    return superAdminApi
      .get<AcquisitionSurveySummary>('/users/acquisition-survey')
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }, [superAdminApi]);

  const fetchResponses = useCallback(
    (page: number, size: number, channel: AcquisitionChannel | null): Promise<PaginationResponse<AcquisitionSurveyResponse> | null> => {
      return superAdminApi
        .get<PaginationResponse<AcquisitionSurveyResponse>>('/users/acquisition-survey/responses', { params: { page, size, channel: channel ?? undefined } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  return { fetchSummary, fetchResponses };
}

export default useSuperAdminAcquisitionSurvey;
