import { format, isValid, parse } from 'date-fns';
import { RawQueryParamConfig, TypedQueryParamConfig } from '@hooks/common/useQueryParam';
import { getBusinessDate } from '@utils/dashboard';

const DATE_FORMAT = 'yyyy-MM-dd';

export const dateQueryParamConfig: TypedQueryParamConfig<Date> = {
  key: 'date',
  parse: (raw) => {
    if (!raw) return null;

    const parsed = parse(raw, DATE_FORMAT, new Date());
    return isValid(parsed) ? parsed : null;
  },
  serialize: (date) => format(date, DATE_FORMAT),
  getDefault: () => getBusinessDate(),
};

export const tableNoQueryParamConfig: RawQueryParamConfig = {
  key: 'tableNo',
  getDefault: () => '1',
};
