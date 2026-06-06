export function getStartOfToday() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function getStartOfMonth() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), 1);
}
