import { useCallback } from 'react';
import { FestivalCalendar } from '@@types/index';
import useApi from '@hooks/useApi';

function useSuperAdminFestivalCalendar() {
  const { superAdminApi } = useApi();

  const fetchFestivalCalendar = useCallback(
    (year: number, month: number): Promise<FestivalCalendar | null> => {
      return superAdminApi
        .get<FestivalCalendar>('/workspaces/festival-calendar', { params: { year, month } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  return { fetchFestivalCalendar };
}

export default useSuperAdminFestivalCalendar;
