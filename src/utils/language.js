export const saveLanguagePreference = (language) => {
  if (language !== null) {
    document.cookie = `language=${language}; path=/`;
  }
};

export const getLanguagePreference = () => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const languageCookie = cookies.find((cookie) =>
    cookie.startsWith("language=")
  );
  if (languageCookie) {
    return languageCookie.split("=")[1];
  }
  return null;
};
