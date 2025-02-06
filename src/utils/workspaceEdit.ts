export const removeAndPushNull = <T>(array: (T | null)[], index: number): (T | null)[] => {
  const newArray = [...array];
  newArray.splice(index, 1);
  newArray.push(null);
  return newArray;
};
