export const isValidPhoneNumber = (number: string) => {
  if (!number) return true
  const cleaned = number.replace(/\D/g, "")
  //The minimum length is 4 for Saint Helena (Format: +290 XXXX) and Niue (Format: +683 XXXX).
  return cleaned.length >= 4
}
