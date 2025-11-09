// Mapping of cuisine areas to ISO 3166-1 alpha-2 country codes for flag images
export const areaToCountryCode: Record<string, string> = {
  American: "us",
  British: "gb",
  Canadian: "ca",
  Chinese: "cn",
  Croatian: "hr",
  Dutch: "nl",
  Egyptian: "eg",
  Filipino: "ph",
  French: "fr",
  Greek: "gr",
  Indian: "in",
  Irish: "ie",
  Italian: "it",
  Jamaican: "jm",
  Japanese: "jp",
  Kenyan: "ke",
  Malaysian: "my",
  Mexican: "mx",
  Moroccan: "ma",
  Polish: "pl",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Thai: "th",
  Tunisian: "tn",
  Turkish: "tr",
  Ukrainian: "ua",
  Vietnamese: "vn",
};

export const getCountryCode = (area: string): string => {
  return areaToCountryCode[area] || "un"; // UN flag as fallback
};

export const getFlagUrl = (
  area: string,
  size: "w20" | "w40" | "w80" | "w160" = "w40"
): string => {
  const code = getCountryCode(area);
  return `https://flagcdn.com/${size}/${code}.png`;
};
