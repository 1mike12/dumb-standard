import { expect } from "chai"
import { getLanguageFromLocale } from "./getLanguageFromLocale"

describe("getLanguageFromLocale", () => {
  it("should return the language code from a valid locale", () => {
    expect(getLanguageFromLocale("en-US")).to.equal("en")
    expect(getLanguageFromLocale("fr-FR")).to.equal("fr")
    expect(getLanguageFromLocale("de-DE")).to.equal("de")
    expect(getLanguageFromLocale("ja-JP")).to.equal("ja")
  })

  it("should handle locales with underscore notation", () => {
    expect(getLanguageFromLocale("en_US")).to.equal("en")
    expect(getLanguageFromLocale("fr_FR")).to.equal("fr")
    expect(getLanguageFromLocale("pt_BR")).to.equal("pt")
  })

  it("should handle whitespace in the locale string", () => {
    expect(getLanguageFromLocale(" en-US ")).to.equal("en")
    expect(getLanguageFromLocale("\tfr-FR\n")).to.equal("fr")
  })

  it("should return the default locale when given invalid input", () => {
    expect(getLanguageFromLocale("")).to.equal("en")
    expect(getLanguageFromLocale(null as any)).to.equal("en")
    expect(getLanguageFromLocale(undefined as any)).to.equal("en")
    expect(getLanguageFromLocale(123 as any)).to.equal("en")
    expect(getLanguageFromLocale({} as any)).to.equal("en")
  })

  it("should use the provided default locale when fallback is needed", () => {
    expect(getLanguageFromLocale("", "fr")).to.equal("fr")
    expect(getLanguageFromLocale(null as any, "de")).to.equal("de")
    expect(getLanguageFromLocale("###", "es")).to.equal("es")
  })

  it("should handle three-letter language codes and normalize when appropriate", () => {
    // cmn (Mandarin Chinese) is normalized to zh by Intl.Locale
    expect(getLanguageFromLocale("cmn-Hans-CN")).to.equal("zh")
    // yue (Cantonese) may also be normalized depending on implementation
    const yueResult = getLanguageFromLocale("yue-HK")
    // Accept either the normalized or original form
    expect(["yue", "zh"].includes(yueResult)).to.be.true
  })

  it("should fallback to manual extraction when Intl.Locale throws an error", () => {
    // These are invalid formats that would cause Intl.Locale to throw
    // but the fallback regex extraction should still work
    expect(getLanguageFromLocale("en*US")).to.equal("en")
    expect(getLanguageFromLocale("fr@FR")).to.equal("fr")
  })

  it("should handle extended locale tags correctly", () => {
    expect(getLanguageFromLocale("zh-Hans-CN")).to.equal("zh")
    expect(getLanguageFromLocale("zh-Hant-TW")).to.equal("zh")
    expect(getLanguageFromLocale("sr-Cyrl-RS")).to.equal("sr")
  })
})
