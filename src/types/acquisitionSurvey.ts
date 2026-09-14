import { AcquisitionChannel } from '@utils/acquisitionChannel';

export interface AcquisitionChannelStat {
  channel: AcquisitionChannel;
  label: string;
  count: number;
  ratio: number;
}

export interface AcquisitionSurveySummary {
  totalUsers: number;
  answeredCount: number;
  skippedCount: number;
  notAskedCount: number;
  responseRate: number;
  contextCount: number;
  channels: AcquisitionChannelStat[];
}

export interface AcquisitionSurveyResponse {
  id: number;
  userId: number;
  userEmail: string;
  channel: AcquisitionChannel | null;
  channelLabel: string | null;
  channelEtc: string | null;
  context: string | null;
  answeredAt: string | null;
}
