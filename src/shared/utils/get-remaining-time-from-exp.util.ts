export function getSecondRemainingTimeFromExp(exp: number) {
  const now = Math.floor(Date.now() / 1000);
  return exp - now;
}

export function getMillisecondRemainingTimeFromExp(exp: number) {
  const now = Date.now();
  return exp * 1000 - now;
}
