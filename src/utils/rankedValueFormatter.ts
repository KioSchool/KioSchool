const formatNumericPrefix = (value: number) => {
  return Number.isInteger(value) ? value.toLocaleString() : Number(value.toFixed(2)).toLocaleString();
};

export const formatRankedValue = (value: string) => {
  const trimmedValue = value.trim();
  const numberMatch = trimmedValue.match(/^(-?\d+(?:\.\d+)?)(.*)$/);

  if (!numberMatch) return trimmedValue;

  const rawNumber = Number(numberMatch[1]);
  if (Number.isNaN(rawNumber)) return trimmedValue;

  const suffix = numberMatch[2];
  const formattedNumber = formatNumericPrefix(rawNumber);

  return `${formattedNumber}${suffix}`;
};
