export function generateCorrelationId() {
  return crypto.randomUUID.toString();
}
