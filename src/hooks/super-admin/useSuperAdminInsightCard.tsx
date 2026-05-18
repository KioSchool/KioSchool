import useApi from '@hooks/useApi';

function useSuperAdminInsightCard() {
  const { superAdminApi } = useApi();

  const regenerateInsightCard = (date: string) => {
    return superAdminApi.post('/insight-card/regenerate', null, { params: { date } });
  };

  return { regenerateInsightCard };
}

export default useSuperAdminInsightCard;
