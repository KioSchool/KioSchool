import useApi from '@hooks/useApi';
import { InsightCardResponse } from '@@types/index';
import { PresetOption } from '@components/admin/insight/donation/donationConstants';

type ShareAction = 'share' | 'download';

function useInsightDiscordReport() {
  const { adminApi } = useApi();

  const send = (result: string) => {
    adminApi.post('/discord/popup', { result }).catch((e) => {
      console.warn('discord report failed', e);
    });
  };

  const reportShareClick = (workspaceId: string, workspaceName: string, card: InsightCardResponse) => {
    const metrics = card.topMetrics.map((m) => `#${m.rank} ${m.label}=${m.value}`).join(', ');
    const revenue = card.payload.totalRevenue;
    const revenueText = revenue != null ? ` revenue=${revenue}` : '';
    send(
      `[InsightCard:자랑하기] workspaceId=${workspaceId} name=${workspaceName} | "${card.headline}" (date=${card.referenceDate}, template=${card.template}${revenueText}) | ${metrics}`,
    );
  };

  const reportShareAction = (workspaceId: string, workspaceName: string, action: ShareAction) => {
    const label = action === 'share' ? '공유하기' : '저장하기';
    send(`[InsightCard:${label}] workspaceId=${workspaceId} name=${workspaceName}`);
  };

  const reportDonationAmountClick = (workspaceId: string, workspaceName: string, option: PresetOption) => {
    const amountLabel = option.amount === 0 ? '자유' : `${option.amount}`;
    send(`[InsightCard:도네이션 가격 선택] workspaceId=${workspaceId} name=${workspaceName} amount=${amountLabel} character=${option.character}`);
  };

  return { reportShareClick, reportShareAction, reportDonationAmountClick };
}

export default useInsightDiscordReport;
