import { useSetAtom } from 'jotai';
import useApi from '@hooks/useApi';
import { adminAcquisitionSurveyAnsweredAtom } from '@jotai/admin/atoms';
import { AcquisitionChannel } from '@utils/acquisitionChannel';
import { readAcquisitionContext } from '@utils/acquisitionContext';

interface AcquisitionSurveyStatusResponse {
  isAnswered: boolean;
}

function useAcquisitionSurvey() {
  const { adminApi } = useApi();
  const setIsAnswered = useSetAtom(adminAcquisitionSurveyAnsweredAtom);

  // 조회 실패로 홈을 막지 않는다. 못 물어보는 것보다 홈이 안 열리는 쪽이 훨씬 나쁘다.
  const fetchIsAnswered = async (): Promise<void> => {
    return adminApi
      .get<AcquisitionSurveyStatusResponse>('/user/acquisition')
      .then((res) => setIsAnswered(res.data.isAnswered))
      .catch(() => setIsAnswered(true));
  };

  const saveSurvey = async (channel: AcquisitionChannel | null, channelEtc: string | null): Promise<boolean> => {
    return adminApi
      .post('/user/acquisition', { channel, channelEtc, context: readAcquisitionContext() })
      .then(() => true)
      .catch(() => false);
  };

  const markAnswered = () => setIsAnswered(true);

  return { fetchIsAnswered, saveSurvey, markAnswered };
}

export default useAcquisitionSurvey;
