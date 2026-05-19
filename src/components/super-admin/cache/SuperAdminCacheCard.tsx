import { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import useSuperAdminCache from '@hooks/super-admin/useSuperAdminCache';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const Card = styled.div`
  width: 100%;
  border: 1px solid #e8eef2;
  border-radius: 12px;
  background: ${Color.WHITE};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const HeaderLeft = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const CacheName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const HeaderActions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e8eef2;
`;

const KeyList = styled.div`
  padding: 8px 0;
  ${colFlex()}
`;

const KeyRow = styled.div`
  padding: 10px 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const KeyText = styled.span`
  font-size: 13px;
  color: ${Color.GREY};
  font-family: monospace;
  word-break: break-all;
`;

const EmptyText = styled.p`
  padding: 16px 20px;
  font-size: 13px;
  color: ${Color.HEAVY_GREY};
  margin: 0;
`;

const LoadingText = styled.p`
  padding: 16px 20px;
  font-size: 13px;
  color: ${Color.GREY};
  margin: 0;
`;

interface SuperAdminCacheCardProps {
  cacheName: string;
  onCacheCleared: () => void;
}

function SuperAdminCacheCard({ cacheName, onCacheCleared }: SuperAdminCacheCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCacheKeys, clearCache, deleteCacheKey } = useSuperAdminCache();

  const loadKeys = () => {
    setIsLoading(true);
    fetchCacheKeys(cacheName).then((res) => {
      setKeys(res.data);
      setIsLoading(false);
    });
  };

  const handleHeaderClick = () => {
    if (!isExpanded) {
      loadKeys();
    }
    setIsExpanded((prev) => !prev);
  };

  const handleClearCache = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearCache(cacheName).then(() => {
      toast.success(`'${cacheName}' 캐시가 삭제되었습니다.`);
      setKeys([]);
      onCacheCleared();
    });
  };

  const handleDeleteKey = (key: string) => {
    deleteCacheKey(cacheName, key).then(() => {
      toast.success(`키가 삭제되었습니다.`);
      setKeys((prev) => prev.filter((k) => k !== key));
    });
  };

  return (
    <Card>
      <CardHeader onClick={handleHeaderClick}>
        <HeaderLeft>
          {isExpanded ? <RiArrowUpSLine size={18} color={Color.GREY} /> : <RiArrowDownSLine size={18} color={Color.GREY} />}
          <CacheName>{cacheName}</CacheName>
        </HeaderLeft>
        <HeaderActions>
          <NewCommonButton size="xs" color="blue_gray" onClick={handleClearCache}>
            캐시 삭제
          </NewCommonButton>
        </HeaderActions>
      </CardHeader>

      {isExpanded && (
        <>
          <Divider />
          <KeyList>
            {isLoading && <LoadingText>키 목록 불러오는 중...</LoadingText>}
            {!isLoading && keys.length === 0 && <EmptyText>저장된 캐시 데이터가 없습니다.</EmptyText>}
            {!isLoading &&
              keys.map((key) => (
                <KeyRow key={key}>
                  <KeyText>{key}</KeyText>
                  <NewCommonButton
                    size="xs"
                    customColors={{
                      background: Color.LIGHT_RED,
                      color: Color.RED,
                      hoverBackground: '#ffd6d6',
                    }}
                    onClick={() => handleDeleteKey(key)}
                  >
                    키 삭제
                  </NewCommonButton>
                </KeyRow>
              ))}
          </KeyList>
        </>
      )}
    </Card>
  );
}

export default SuperAdminCacheCard;
