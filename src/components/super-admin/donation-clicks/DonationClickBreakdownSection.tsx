import styled from '@emotion/styled';
import { CustomerDonationClickStats, DonationClickBucket } from '@@types/donationClick';
import RatioBarList from '@components/super-admin/dashboard/RatioBarList';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { DONATION_CLICK_AXIS_LABEL, DonationClickAxis, resolveDonationClickBucketLabel } from '@utils/donationClickStats';

const NULL_KEY = 'null';

const Section = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`;

const Axis = styled.div`
  gap: 8px;
  min-width: 0;
  ${colFlex()}
`;

const AxisTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

interface DonationClickBreakdownSectionProps {
  stats: CustomerDonationClickStats;
}

function toItems(axis: DonationClickAxis, buckets: DonationClickBucket[]) {
  return buckets.map((bucket) => ({
    key: bucket.key ?? NULL_KEY,
    label: resolveDonationClickBucketLabel(axis, bucket.key),
    count: bucket.clicks,
    ratio: bucket.ratio,
  }));
}

function DonationClickBreakdownSection({ stats }: DonationClickBreakdownSectionProps) {
  const axes: { axis: DonationClickAxis; buckets: DonationClickBucket[] }[] = [
    { axis: 'amount', buckets: stats.byAmount },
    { axis: 'method', buckets: stats.byMethod },
    { axis: 'noteIndex', buckets: stats.byNoteIndex },
    { axis: 'variant', buckets: stats.byVariant },
  ];

  return (
    <Section>
      <SectionTitle>클릭 분해</SectionTitle>
      <Grid>
        {axes.map(({ axis, buckets }) => (
          <Axis key={axis}>
            <AxisTitle>{DONATION_CLICK_AXIS_LABEL[axis]}</AxisTitle>
            <RatioBarList items={toItems(axis, buckets)} unit="회" />
          </Axis>
        ))}
      </Grid>
    </Section>
  );
}

export default DonationClickBreakdownSection;
