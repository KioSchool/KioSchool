import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import AppContainer from '@components/common/container/AppContainer';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminCacheCard from '@components/super-admin/cache/SuperAdminCacheCard';
import NewCommonButton from '@components/common/button/NewCommonButton';
import useSuperAdminCache from '@hooks/super-admin/useSuperAdminCache';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const CacheList = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

function SuperAdminCache() {
  const { fetchCacheNames, clearAllCaches } = useSuperAdminCache();
  const [cacheNames, setCacheNames] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchCacheNames().then((res) => {
      setCacheNames(res.data);
    });
  }, []);

  const handleClearAll = () => {
    clearAllCaches().then(() => {
      toast.success('전체 캐시가 삭제되었습니다.');
      setRefreshKey((prev) => prev + 1);
    });
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="Redis 캐시 관리"
          description="캐시를 수동으로 삭제하여 최신 데이터를 강제로 갱신합니다."
          actions={
            <NewCommonButton
              size="xs"
              customColors={{
                background: Color.RED,
                color: Color.WHITE,
                hoverBackground: '#ff3d3d',
              }}
              onClick={handleClearAll}
            >
              전체 삭제
            </NewCommonButton>
          }
        />
        <CacheList>
          {cacheNames.map((name) => (
            <SuperAdminCacheCard key={`${name}-${refreshKey}`} cacheName={name} onCacheCleared={() => {}} />
          ))}
        </CacheList>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminCache;
