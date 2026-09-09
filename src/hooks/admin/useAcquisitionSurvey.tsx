import { useAtomValue, useSetAtom } from 'jotai';
import useApi from '@hooks/useApi';
import { adminAcquisitionSurveyAtom, adminUserAtom } from '@jotai/admin/atoms';
import { AcquisitionChannel } from '@utils/acquisitionChannel';
import { readAcquisitionContext } from '@utils/acquisitionContext';

interface AcquisitionSurveyStatusResponse {
  isAnswered: boolean;
}

function useAcquisitionSurvey() {
  const { adminApi } = useApi();
  const user = useAtomValue(adminUserAtom);
  const setSurvey = useSetAtom(adminAcquisitionSurveyAtom);

  // 조회 실패로 홈을 막지 않는다. 못 물어보는 것보다 홈이 안 열리는 쪽이 훨씬 나쁘다.
  const fetchIsAnswered = async (userId: number): Promise<void> => {
    return adminApi
      .get<AcquisitionSurveyStatusResponse>('/user/acquisition')
      .then((res) => setSurvey({ userId, isAnswered: res.data.isAnswered }))
      .catch(() => setSurvey({ userId, isAnswered: true }));
  };

  const saveSurvey = async (channel: AcquisitionChannel | null, channelEtc: string | null): Promise<boolean> => {
    return adminApi
      .post('/user/acquisition', { channel, channelEtc, context: readAcquisitionContext() })
      .then(() => true)
      .catch(() => false);
  };

  const markAnswered = () => setSurvey({ userId: user.id, isAnswered: true });

  return { fetchIsAnswered, saveSurvey, markAnswered };
}

export default useAcquisitionSurvey;
