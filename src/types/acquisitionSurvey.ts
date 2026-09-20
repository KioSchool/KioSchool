import { AcquisitionChannel } from '@utils/acquisitionChannel';

export interface AcquisitionChannelStat {
  channel: AcquisitionChannel;
  label: string;
  count: number;
  ratio: number;
}

export interface AcquisitionSchoolStat {
  schoolName: string;
  totalUsers: number;
  answeredCount: number;
  skippedCount: number;
  channels: AcquisitionChannelStat[];
}

export interface AcquisitionSurveySummary {
  totalUsers: number;
  answeredCount: number;
  skippedCount: number;
  notAskedCount: number;
  surveyedRate: number;
  contextCount: number;
  channels: AcquisitionChannelStat[];
  schools: AcquisitionSchoolStat[];
}

export interface AcquisitionSurveyResponse {
  id: number;
  userId: number;
  userEmail: string | null;
  schoolName: string;
  channel: AcquisitionChannel | null;
  channelLabel: string | null;
  channelEtc: string | null;
  context: string | null;
  answeredAt: string | null;
}
