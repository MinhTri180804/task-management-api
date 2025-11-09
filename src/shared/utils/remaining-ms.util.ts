export const remainingMS = (createdAt: number, intervalMS: number): number => {
  const elapsedMs = Date.now() - createdAt;
  return intervalMS - elapsedMs;
};
