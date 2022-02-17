import { useContext } from "react";

import {AppContext} from "./context";
import { Language } from "../../src/language";

export default function useTranslation() {
  const { language } = useContext(AppContext);
  function t(key) {
    if (language === null) {
      let mainLanguage = "en"
      localStorage.setItem("language", "en")
      if (!Language[mainLanguage][key]) {
        console.warn(`No string '${key}' for locale '${language}'`);
        return ""
      }
      return Language[mainLanguage][key]
    } else {
      return Language[language][key];
    }
  }

  return { t, language };
}
