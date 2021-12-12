export const around = <T>(array: T[], index: number): number => {
  const n = array.length;
  return (index % n + n) % n
}