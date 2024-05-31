export const bitArrayToNumber = (input: number[]): number => {
  return [...input].reverse()
    .reduce((previousValue, currentValue) => previousValue * 2 + currentValue, 0);
}