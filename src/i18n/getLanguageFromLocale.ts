export function getLanguageFromLocale(
  locale: string,
  defaultLocale: string = "en"
): string {
  if (!locale || typeof locale !== "string") {
    return defaultLocale
  }

  const tag = locale.replace(/_/g, "-").trim()

  try {
    const base = new Intl.Locale(tag).language
    return base || defaultLocale
  } catch {
    // fallback to manual extraction
  }

  // Fallback: first subtag of 2–3 letters
  const m = /^([a-zA-Z]{2,3})/.exec(tag)
  return m ? m[1].toLowerCase() : defaultLocale
}
