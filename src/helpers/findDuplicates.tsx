export const findDuplicates = <T,>(arr: T[]) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);
