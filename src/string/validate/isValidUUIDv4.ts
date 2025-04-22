/**
 * case insensitive
 * @param uuid
 */
export function isValidUUIDv4(uuid: any) {
  if (!uuid || typeof uuid !== "string") return false
  if (uuid.length !== 36) return false
  const pattern = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  return pattern.test(uuid)
}
